import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { Users, CheckCircle2, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import { ScrollReveal, LoadingScreen } from '../components/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WHATSAPP_NUMBER = '919876543210';

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
    api.get(`/rooms/${id}`)
      .then(res => setRoom(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const buildWaMsg = (details) => {
    const text = `*New Booking Request — Estilo Mansa*%0A%0A👤 Name: ${user.name}%0A📞 Phone: ${details.phone}%0A🛏️ Room: ${room.name}%0A📅 Check-in: ${format(new Date(details.checkIn), 'MMM dd, yyyy')}%0A📅 Check-out: ${format(new Date(details.checkOut), 'MMM dd, yyyy')}%0A👥 Guests: ${details.guests}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setError('');
    try {
      const payload = {
        roomId: room._id,
        phone,
        guests: parseInt(guests),
        checkIn: new Date(checkIn).toISOString(),
        checkOut: new Date(checkOut).toISOString(),
      };
      await api.post('/bookings', payload);
      setBookingSuccess(true);
      window.open(buildWaMsg(payload), '_blank');
      setTimeout(() => navigate('/my-bookings'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed. Please try different dates.');
    }
  };

  if (loading) return <LoadingScreen />;
  if (!room) return (
    <div className="min-h-screen bg-luxury-bg flex items-center justify-center">
      <p className="text-luxury-text/60 font-serif text-2xl">Room not found</p>
    </div>
  );

  return (
    <div className="bg-luxury-bg min-h-screen pt-24">
      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <button
          onClick={() => navigate('/rooms')}
          className="flex items-center gap-2 text-luxury-text/50 hover:text-luxury-gold transition-colors text-sm tracking-widest uppercase mb-6"
        >
          <ArrowLeft size={14} /> Back to Rooms
        </button>

        {room.images?.length > 1 ? (
          <Swiper
            navigation modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            className="rounded-3xl overflow-hidden h-[55vh]"
          >
            {room.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt={`${room.name} ${i + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="rounded-3xl overflow-hidden h-[55vh]">
            <img
              src={room.images?.[0] || 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=1600'}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Info */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <p className="section-label mb-3">Room Details</p>
              <h1 className="font-serif text-4xl md:text-6xl text-luxury-cream mb-4">{room.name}</h1>
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px w-10 bg-luxury-gold opacity-50" />
                <div className="flex items-center gap-2 text-luxury-text/50 text-sm">
                  <Users size={14} />
                  <span>Up to {room.capacity} guests</span>
                </div>
                <div className="h-px flex-1 bg-luxury-gold/10" />
                <span className="text-luxury-gold font-medium text-lg">₹{room.price}<span className="text-luxury-text/40 text-sm">/night</span></span>
              </div>

              <div className="mb-10">
                <h2 className="font-serif text-2xl text-luxury-cream mb-4">About this Space</h2>
                <p className="text-luxury-text/70 leading-relaxed whitespace-pre-line text-base">{room.description}</p>
              </div>

              {room.amenities?.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-luxury-cream mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-luxury-text/70 text-sm">
                        <CheckCircle2 size={16} className="text-luxury-gold flex-shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>

          {/* Booking Widget */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={150}>
              <div className="sticky top-28 glass-card rounded-3xl p-7">
                <p className="section-label mb-2">Reserve This Room</p>
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-luxury-gold/10">
                  <span className="font-serif text-3xl text-luxury-cream">₹{room.price}</span>
                  <span className="text-luxury-text/40 text-sm">/ night</span>
                </div>

                {bookingSuccess ? (
                  <motion.div
                    className="text-center py-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} className="text-green-400" />
                    </div>
                    <h3 className="font-serif text-xl text-luxury-cream mb-2">Request Sent!</h3>
                    <p className="text-luxury-text/60 text-sm">WhatsApp is opening with your details. We'll confirm shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-luxury-text/50 mb-1.5 tracking-widest uppercase">Check-in</label>
                        <input
                          type="date"
                          required
                          min={format(new Date(), 'yyyy-MM-dd')}
                          value={checkIn}
                          onChange={e => setCheckIn(e.target.value)}
                          className="input-field text-sm py-3"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-luxury-text/50 mb-1.5 tracking-widest uppercase">Check-out</label>
                        <input
                          type="date"
                          required
                          min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                          value={checkOut}
                          onChange={e => setCheckOut(e.target.value)}
                          className="input-field text-sm py-3"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-luxury-text/50 mb-1.5 tracking-widest uppercase">Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 ..."
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="input-field text-sm py-3"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-luxury-text/50 mb-1.5 tracking-widest uppercase">Guests</label>
                      <input
                        type="number"
                        required
                        min="1"
                        max={room.capacity}
                        value={guests}
                        onChange={e => setGuests(e.target.value)}
                        className="input-field text-sm py-3"
                      />
                    </div>

                    {error && (
                      <p className="text-red-400 text-xs bg-red-500/10 px-4 py-2 rounded-lg">{error}</p>
                    )}

                    <button type="submit" className="btn-primary w-full py-4 group">
                      <MessageCircle size={15} />
                      <span>{user ? 'Request to Book' : 'Login to Book'}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-center text-xs text-luxury-text/30 mt-3">
                      No charges yet — host will confirm first.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
