import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Users, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await api.get(`/rooms/${id}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const formatWhatsAppMessage = (bookingDetails) => {
    const text = `New Booking Request:%0A
Name: ${user.name}%0A
Phone: ${bookingDetails.phone}%0A
Room: ${room.name}%0A
Check-in: ${format(new Date(bookingDetails.checkIn), 'MMM dd, yyyy')}%0A
Check-out: ${format(new Date(bookingDetails.checkOut), 'MMM dd, yyyy')}%0A
Guests: ${bookingDetails.guests}`;
    return `https://wa.me/919876543210?text=${text}`;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    setError('');
    
    try {
      const payload = {
        roomId: room._id,
        phone,
        guests: parseInt(guests),
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString()
      };
      
      await api.post('/bookings', payload);
      setBookingSuccess(true);
      
      // WhatsApp Redirect
      window.open(formatWhatsAppMessage(payload), '_blank');
      
      setTimeout(() => {
        navigate('/my-bookings');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed. Room might be unavailable for these dates.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!room) return <div className="min-h-screen flex items-center justify-center">Room not found</div>;

  return (
    <div className="bg-luxury-bg min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery */}
        <div className="w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden mb-12 shadow-lg">
          <img 
            src={room.images?.[0] || "https://images.unsplash.com/photo-1618773928120-2c15c328de8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"} 
            alt={room.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{room.name}</h1>
            <div className="flex items-center gap-6 mb-8 text-gray-600">
              <span className="flex items-center gap-2"><Users size={20}/> {room.capacity} Guests Max</span>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">About this space</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{room.description}</p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="text-luxury-gold" size={20} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="mb-6 pb-6 border-b border-gray-100">
                <span className="text-3xl font-bold text-luxury-dark">${room.price}</span>
                <span className="text-gray-500"> / night</span>
              </div>

              {bookingSuccess ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-2xl text-center shadow-sm animate-fade-in">
                  <h3 className="font-bold text-xl mb-3">Booking request sent via WhatsApp!</h3>
                  <p className="text-sm">We'll review your request and confirm shortly. Redirecting to your dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input 
                        type="date" 
                        required
                        min={format(new Date(), 'yyyy-MM-dd')}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input 
                        type="date" 
                        required
                        min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 "
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      max={room.capacity}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  
                  {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                  
                  <button type="submit" className="w-full btn-primary mt-4 py-4 text-lg">
                    {user ? 'Request to Book' : 'Login to Book'}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">You won't be charged yet. Host will confirm.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
