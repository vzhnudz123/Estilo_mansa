import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Wifi, Coffee, Wind, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { ScrollReveal, SectionHeader, LoadingScreen } from '../components/ui';

const amenityIcons = { Wifi, Coffee, 'Air conditioning': Wind };

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rooms')
      .then(res => setRooms(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-luxury-bg min-h-screen pt-28">
      {/* Page Header */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1800"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg/50 to-luxury-bg" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Accommodations
          </motion.p>
          <motion.h1
            className="font-serif text-5xl md:text-7xl text-luxury-cream mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Curated Spaces
          </motion.h1>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-luxury-gold opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-luxury-gold opacity-60" />
          </motion.div>
          <motion.p
            className="text-luxury-text/60 max-w-xl mx-auto mt-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Every room is a window into Wayanad. Wake to mist-covered valleys, fall asleep to forest sounds.
          </motion.p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-28">
        {rooms.length === 0 ? (
          <div className="text-center py-20 text-luxury-text/40">
            <p className="font-serif text-2xl mb-2">No rooms available</p>
            <p className="text-sm">Please check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {rooms.map((room, i) => (
              <ScrollReveal key={room._id} delay={i * 80}>
                <div className="group relative rounded-3xl overflow-hidden glass-card hover:border-luxury-gold/20 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={room.images?.[0] || 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=800'}
                      alt={room.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      style={{ transition: 'transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-card/90 via-transparent to-transparent" />

                    {/* Price badge */}
                    <div className="absolute top-5 right-5 glass-card-light px-4 py-2 rounded-full">
                      <span className="text-luxury-gold font-medium">₹{room.price}</span>
                      <span className="text-white/50 text-xs"> / night</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-serif text-2xl text-luxury-cream">{room.name}</h3>
                      <div className="flex items-center gap-2 text-luxury-text/50 text-sm">
                        <Users size={14} />
                        <span>Up to {room.capacity}</span>
                      </div>
                    </div>

                    <p className="text-luxury-text/60 text-sm leading-relaxed line-clamp-2 mb-6">
                      {room.description}
                    </p>

                    {/* Amenities */}
                    {room.amenities?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {room.amenities.slice(0, 4).map((a, idx) => (
                          <span key={idx} className="text-xs px-3 py-1 rounded-full border border-luxury-gold/20 text-luxury-text/60">
                            {a}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Link
                        to={`/rooms/${room._id}`}
                        className="btn-primary flex-1 py-3 text-xs group"
                      >
                        <span>View & Book</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello! I'm interested in the ${room.name} at Estilo Mansa.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-full border border-luxury-gold/25 text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
                      >
                        <MessageCircle size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
