import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, Image as ImageIcon, Save, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    offerPrice: '',
    startDate: '',
    endDate: '',
    isActive: true
  });
  const [uploadFile, setUploadFile] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let imageUrl = '';
      if (uploadFile) {
        const formData = new FormData();
        formData.append('images', uploadFile);
        const uploadRes = await api.post('/upload', formData);
        imageUrl = uploadRes.data.url;
      }

      const payload = {
        ...form,
        offerPrice: form.offerPrice ? parseFloat(form.offerPrice) : undefined,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        image: imageUrl || undefined
      };

      await api.post('/events', payload);
      alert('Event created successfully!');
      
      setForm({
        title: '',
        description: '',
        offerPrice: '',
        startDate: '',
        endDate: '',
        isActive: true
      });
      setUploadFile(null);
      fetchEvents();
    } catch (err) {
      console.error('Event submit error:', err);
      const errorMsg = err.response?.data?.error?.[0]?.message || err.response?.data?.error || err.message;
      alert('Failed to create event: ' + errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Event Manager...</div>;

  return (
    <div className="space-y-10 pb-20">
      {/* Create Event Form */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus className="text-luxury-gold" />
          Create New Event/Offer
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-2">Event Title</label>
            <input 
              required 
              type="text" 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
              className="input-field w-full"
              placeholder="e.g. Summer Special Offer"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea 
              required 
              rows="3"
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
              className="input-field w-full"
              placeholder="Tell guests about the event or offer..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Offer Price (Optional)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
              <input 
                type="number" 
                value={form.offerPrice} 
                onChange={e => setForm({...form, offerPrice: e.target.value})} 
                className="input-field w-full pl-8"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Cover Image</label>
            <div className="flex items-center gap-4">
               <label className="flex items-center gap-2 px-4 py-2 bg-luxury-gold/10 text-luxury-gold rounded-full cursor-pointer hover:bg-luxury-gold/20 transition">
                <ImageIcon size={20} />
                <span>{uploadFile ? 'Change Image' : 'Choose Image'}</span>
                <input type="file" onChange={e => setUploadFile(e.target.files[0])} className="hidden" />
              </label>
              {uploadFile && <span className="text-xs text-gray-500 truncate max-w-[150px]">{uploadFile.name}</span>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Start Date</label>
            <input 
              required 
              type="datetime-local" 
              value={form.startDate} 
              onChange={e => setForm({...form, startDate: e.target.value})} 
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">End Date</label>
            <input 
              required 
              type="datetime-local" 
              value={form.endDate} 
              onChange={e => setForm({...form, endDate: e.target.value})} 
              className="input-field w-full"
            />
          </div>
          <div className="col-span-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`btn-primary w-full py-4 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creating...' : 'Create Event'}
              {!isSubmitting && <Save size={20} />}
            </button>
          </div>
        </form>
      </div>

      {/* Active Events List */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="text-luxury-gold" />
          Active & Upcoming Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full group transition hover:shadow-md">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={event.image || 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000'} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => handleDelete(event._id)}
                    className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {event.offerPrice && (
                  <div className="absolute bottom-4 left-4 bg-luxury-gold text-white px-4 py-1 rounded-full font-bold shadow-lg">
                    ₹{event.offerPrice}
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-2 text-luxury-dark">{event.title}</h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{event.description}</p>
                
                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} className="text-luxury-gold" />
                    <span>Starts: {format(new Date(event.startDate), 'MMM dd, yyyy HH:mm')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={14} className="text-luxury-gold" />
                    <span>Ends: {format(new Date(event.endDate), 'MMM dd, yyyy HH:mm')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
              No events found. Start by creating one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventManager;
