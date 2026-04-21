import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [tab, setTab] = useState('bookings');
  
  // Data States
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalBookings: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  // CMS State
  const [cmsKey, setCmsKey] = useState('home_hero');
  const [cmsForm, setCmsForm] = useState({ title: '', description: '' });
  const [currentImage, setCurrentImage] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '', description: '', offerPrice: '', startDate: '', endDate: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, eventsRes] = await Promise.allSettled([
        api.get('/bookings/all'),
        api.get('/events')
      ]);
      
      if (bookingsRes.status === 'fulfilled') {
        const data = bookingsRes.value.data;
        setBookings(data);
        const rev = data.reduce((acc, curr) => acc + curr.totalPrice, 0);
        setStats({ totalBookings: data.length, revenue: rev });
      }
      
      if (eventsRes.status === 'fulfilled') setEvents(eventsRes.value.data);
      
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCmsData = async (key) => {
    setCmsKey(key);
    try {
      const res = await api.get(`/content/${key}`);
      setCmsForm({ 
        title: res.data.title || '', 
        description: res.data.description || '' 
      });
      setCurrentImage(res.data.images?.[0] || null);
    } catch {
      setCmsForm({ title: '', description: '' });
      setCurrentImage(null);
    }
  }

  const handleDeleteCurrentImage = async () => {
    if (!currentImage) return;
    if (!window.confirm("Are you sure you want to delete this image permanently?")) return;

    try {
      // Extract filename from URL (e.g. image-123.jpg)
      const filename = currentImage.split('/').pop();
      
      // Delete physical file
      await api.delete(`/upload/${filename}`);
      
      // Update DB to remove image reference
      await api.put(`/content/${cmsKey}`, {
        ...cmsForm,
        images: []
      });

      setCurrentImage(null);
      alert("Image deleted successfully");
    } catch (err) {
      alert("Failed to delete image");
    }
  };

  const handleCmsUpdate = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = currentImage;

      if (uploadFile) {
        const formData = new FormData();
        formData.append('image', uploadFile);
        const uploadRes = await api.post('/upload', formData);
        imageUrl = uploadRes.data.url;
      }

      const payload = {
        key: cmsKey,
        title: cmsForm.title,
        description: cmsForm.description,
        images: imageUrl ? [imageUrl] : []
      };
      
      await api.put(`/content/${cmsKey}`, payload);
      alert('Content updated successfully!');
      setCurrentImage(imageUrl);
      setUploadFile(null);
    } catch (err) {
      alert('Failed to update content');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/bookings/${id}/status`, { status: newStatus });
      fetchData();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', {
        ...eventForm,
        offerPrice: parseFloat(eventForm.offerPrice) || undefined,
        startDate: new Date(eventForm.startDate).toISOString(),
        endDate: new Date(eventForm.endDate).toISOString(),
      });
      setEventForm({ title: '', description: '', offerPrice: '', startDate: '', endDate: '' });
      fetchData();
    } catch (error) {
      alert('Failed to create event. Check inputs.');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      fetchData();
    } catch(err) {
      alert("Failed to delete event");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-luxury-bg min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-luxury-dark">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-200">
          <button 
            className={`py-3 px-6 font-bold text-lg border-b-4 transition-colors ${tab === 'bookings' ? 'border-luxury-gold text-luxury-dark' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            onClick={() => setTab('bookings')}
          >
            Manage Bookings
          </button>
          <button 
            className={`py-3 px-6 font-bold text-lg border-b-4 transition-colors ${tab === 'events' ? 'border-luxury-gold text-luxury-dark' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            onClick={() => setTab('events')}
          >
            Manage Events
          </button>
          <button 
            className={`py-3 px-6 font-bold text-lg border-b-4 transition-colors ${tab === 'cms' ? 'border-luxury-gold text-luxury-dark' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            onClick={() => { setTab('cms'); fetchCmsData('home_hero'); }}
          >
            CMS (Site Content)
          </button>
        </div>

        {/* Tab contents are identical from earlier, but CMS tab is new */}
        {tab === 'cms' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Website Content Manager</h2>
            
            <div className="flex gap-4 mb-8">
              <button onClick={() => fetchCmsData('home_hero')} className={`px-4 py-2 rounded-full font-medium ${cmsKey === 'home_hero' ? 'bg-luxury-dark text-white' : 'bg-gray-100 text-gray-700'}`}>Hero Section</button>
              <button onClick={() => fetchCmsData('home_features')} className={`px-4 py-2 rounded-full font-medium ${cmsKey === 'home_features' ? 'bg-luxury-dark text-white' : 'bg-gray-100 text-gray-700'}`}>Featured Info</button>
              <button onClick={() => fetchCmsData('home_testimonials')} className={`px-4 py-2 rounded-full font-medium ${cmsKey === 'home_testimonials' ? 'bg-luxury-dark text-white' : 'bg-gray-100 text-gray-700'}`}>Testimonial</button>
            </div>

            <form onSubmit={handleCmsUpdate} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required type="text" value={cmsForm.title} onChange={e => setCmsForm({...cmsForm, title: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description / Text</label>
                <textarea rows="4" value={cmsForm.description} onChange={e => setCmsForm({...cmsForm, description: e.target.value})} className="input-field"></textarea>
              </div>

              {currentImage && (
                <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={currentImage} alt="Current" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={handleDeleteCurrentImage}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-xs"
                  >
                    Delete Image
                  </button>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  {currentImage ? 'Replace Image' : 'Upload Image'}
                </label>
                <input type="file" onChange={e => setUploadFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-luxury-gold/10 file:text-luxury-gold hover:file:bg-luxury-gold/20" />
              </div>
              <button type="submit" className="btn-primary py-3 px-8">Save Changes to Live Site</button>
            </form>
          </div>
        )}

        {/* Existing Tab Contents compressed for constraints */}
        {tab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead><tr className="bg-gray-50"><th className="p-4">Customer</th><th className="p-4">Room</th><th className="p-4">Status</th></tr></thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b._id} className="border-t">
                      <td className="p-4">{b.user?.name} <br/><span className="text-xs text-gray-500">{b.phone}</span></td>
                      <td className="p-4">{b.room?.name}</td>
                      <td className="p-4">
                        <select className="input-field py-1 px-3 text-sm" value={b.status} onChange={e => handleStatusChange(b._id, e.target.value)}>
                          <option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'events' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <form onSubmit={handleCreateEvent} className="mb-10 grid grid-cols-2 gap-4">
                <input required placeholder="Title" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="input-field"/>
                <input required placeholder="Description" value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="input-field"/>
                <input type="datetime-local" value={eventForm.startDate} onChange={e => setEventForm({...eventForm, startDate: e.target.value})} className="input-field"/>
                <input type="datetime-local" value={eventForm.endDate} onChange={e => setEventForm({...eventForm, endDate: e.target.value})} className="input-field"/>
                <button type="submit" className="btn-primary col-span-2 py-3">Create Event</button>
             </form>
             <h3 className="font-bold mb-4">Active Events</h3>
             {events.map(e => (
               <div key={e._id} className="flex justify-between border-b py-2">
                 <span>{e.title} - {e.description}</span>
                 <button onClick={() => handleDeleteEvent(e._id)} className="text-red-500">Delete</button>
               </div>
             ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
