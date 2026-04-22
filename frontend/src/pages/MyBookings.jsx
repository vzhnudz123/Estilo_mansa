import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { format } from 'date-fns';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoadingScreen } from '../components/ui';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/my-bookings');
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p className="section-label mb-5">Guest Dashboard</p>
          <h1 className="font-serif text-5xl md:text-7xl text-ivory mb-5">My Bookings</h1>
          <p className="text-cream/55 max-w-xl leading-relaxed">
            Your upcoming Estilo Mansa stays, confirmations, and booking references in one calm place.
          </p>
        </div>
        
        {bookings.length === 0 ? (
          <div className="glass-panel rounded-md p-10 md:p-14 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-gold/10 text-gold">
              <Calendar size={28} />
            </div>
            <h3 className="font-serif text-3xl text-ivory mb-3">No bookings yet</h3>
            <p className="text-cream/50 mb-8">Choose a sanctuary and send your request to the concierge.</p>
            <Link to="/rooms" className="btn-primary inline-flex">
              <span>Browse Rooms</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking._id} className="glass-panel rounded-md p-5 md:p-6 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-52 h-40 rounded-[2px] overflow-hidden shrink-0">
                  <img 
                    src={booking.room?.images?.[0] || 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?ixlib=rb-4.0.3&w=400&q=80'} 
                    alt="Room" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <h3 className="font-serif text-3xl text-ivory">{booking.room?.name || 'Room Unavailable'}</h3>
                    <span className="bg-emerald-400/10 text-emerald-200 text-xs px-3 py-1 rounded-[2px] border border-emerald-300/15 font-medium flex items-center gap-1 w-fit">
                      <CheckCircle2 size={12} /> {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm text-cream/60">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50 font-bold mb-1">Check-in</p>
                      <p>{format(new Date(booking.checkIn), 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50 font-bold mb-1">Check-out</p>
                      <p>{format(new Date(booking.checkOut), 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50 font-bold mb-1">Total</p>
                      <p>₹{booking.totalPrice}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold/50 font-bold mb-1">Reference</p>
                      <p className="font-mono text-cream/80">{booking._id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
