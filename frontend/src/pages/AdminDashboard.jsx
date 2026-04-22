import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import HeroManager from '../components/HeroManager';
import EventManager from '../components/EventManager';
import StoryManager from '../components/StoryManager';
import GalleryManager from '../components/GalleryManager';
import FeedbackManager from '../components/FeedbackManager';
import VideoManager from '../components/VideoManager';
import { 
  LayoutDashboard, 
  Hotel, 
  Calendar, 
  Image as ImageIcon, 
  Youtube, 
  MessageSquare, 
  BookOpen,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const [tab, setTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings/all');
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/bookings/${id}/status`, { status: newStatus });
      fetchData();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-10 h-10 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
  </div>;

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 transition-all ${
        tab === id 
        ? 'bg-luxury-gold/10 text-luxury-gold border-r-4 border-luxury-gold font-bold' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-gray-100 min-h-screen sticky top-0 hidden lg:block shadow-sm">
        <div className="p-8">
          <h1 className="text-2xl font-serif text-luxury-dark font-bold">Estilo Mansa</h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Management Suite</p>
        </div>
        
        <nav className="mt-4 space-y-1">
          <SidebarItem id="bookings" icon={Hotel} label="Bookings" />
          <SidebarItem id="events" icon={Calendar} label="Events & Offers" />
          <div className="px-8 py-4 text-[10px] uppercase tracking-widest text-gray-300 font-bold">Website Content</div>
          <SidebarItem id="hero" icon={LayoutDashboard} label="Hero Carousel" />
          <SidebarItem id="story" icon={BookOpen} label="Our Story" />
          <SidebarItem id="gallery" icon={ImageIcon} label="Gallery & Highlights" />
          <SidebarItem id="videos" icon={Youtube} label="YouTube Shorts" />
          <SidebarItem id="feedback" icon={MessageSquare} label="Guest Reviews" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header Mobile Support */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 capitalize">{tab.replace('_', ' ')}</h2>
              <p className="text-gray-500 mt-1">Administrative control panel for your homestay.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-gray-800">Administrator</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Master Access</p>
              </div>
              <div className="w-12 h-12 bg-luxury-dark rounded-2xl flex items-center justify-center text-luxury-gold shadow-lg">
                <Settings size={24} />
              </div>
            </div>
          </div>

          {/* Dynamic Tab Content */}
          <div className="animate-fade-in">
            {tab === 'bookings' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50">
                   <h3 className="text-xl font-bold text-gray-800">Reservation Requests</h3>
                   <p className="text-sm text-gray-500">Manage incoming booking requests from your guests.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        <th className="px-8 py-5">Customer Details</th>
                        <th className="px-8 py-5">Room Category</th>
                        <th className="px-8 py-5">Total Price</th>
                        <th className="px-8 py-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(b => (
                        <tr key={b._id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-bold text-gray-800">{b.user?.name || 'Guest'}</div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                              {b.phone}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="inline-block bg-luxury-gold/10 text-luxury-gold text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider">
                              {b.room?.name || 'Standard'}
                            </span>
                          </td>
                          <td className="px-8 py-6 font-bold text-gray-800">
                            ₹{b.totalPrice}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <select 
                              className={`text-xs font-bold py-2 px-4 rounded-xl border-none outline-none cursor-pointer transition-all ${
                                b.status === 'approved' ? 'bg-green-100 text-green-600' : 
                                b.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                              }`} 
                              value={b.status} 
                              onChange={e => handleStatusChange(b._id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'events' && <EventManager />}
            {tab === 'hero' && <HeroManager />}
            {tab === 'story' && <StoryManager />}
            {tab === 'gallery' && <GalleryManager />}
            {tab === 'videos' && <VideoManager />}
            {tab === 'feedback' && <FeedbackManager />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
