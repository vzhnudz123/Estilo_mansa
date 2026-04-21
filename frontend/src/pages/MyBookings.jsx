import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { format } from 'date-fns';
import { Calendar, CheckCircle2 } from 'lucide-react';

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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-luxury-bg min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">You haven't made any reservations.</p>
            <a href="/rooms" className="btn-primary inline-block">Browse Rooms</a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                  <img 
                    src={booking.room?.images?.[0] || 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?ixlib=rb-4.0.3&w=400&q=80'} 
                    alt="Room" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{booking.room?.name || 'Room Unavailable'}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle2 size={12} /> {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-900">Check-in</p>
                      <p>{format(new Date(booking.checkIn), 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Check-out</p>
                      <p>{format(new Date(booking.checkOut), 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Total Paid</p>
                      <p>${booking.totalPrice}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Booking Ref</p>
                      <p className="font-mono">{booking._id.slice(-6).toUpperCase()}</p>
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
