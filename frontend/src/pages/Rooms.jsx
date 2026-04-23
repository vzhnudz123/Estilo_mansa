import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { ROOM_IMAGES } from '../assets/index.js';

// Fallback images from assets if no room images from DB
const getFallback = (index) => ROOM_IMAGES[index % ROOM_IMAGES.length];

const RoomCard = ({ room, index }) => {
  const ref = useRef(null);
  const imgSrc = room.images?.[0] || getFallback(index);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="fade-up"
      style={{ transitionDelay: `${(index % 2) * 0.1}s` }}
    >
      <Link to={`/rooms/${room._id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/6 mb-6 transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          {/* Room image */}
          <div className="relative h-[340px] md:h-[440px] overflow-hidden">
            <img
              src={imgSrc}
              alt={room.name}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg/90 via-black/20 to-transparent" />

            {/* Room number badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-obsidian/60 backdrop-blur-md px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75">
                Room {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Price */}
            {room.price && (
              <div className="absolute top-5 right-5">
                <div className="glass-card-light px-4 py-2 rounded-xl">
                  <p className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">Per Night</p>
                  <p className="text-luxury-gold font-serif text-lg leading-none">₹{room.price}</p>
                </div>
              </div>
            )}

            {/* Bottom text on image */}
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="font-serif text-2xl md:text-3xl text-luxury-cream mb-2">{room.name}</h2>
            </div>
          </div>

          {/* Description strip */}
          <div className="px-6 py-5 bg-luxury-surface/40 backdrop-blur-sm flex items-center justify-between gap-4">
            <p className="text-luxury-text/60 text-sm leading-7 line-clamp-2 flex-1">
              {room.description || 'A serene sanctuary designed with the finest details for an unforgettable stay.'}
            </p>
            <div className="flex items-center gap-3 text-luxury-gold text-[10px] uppercase tracking-[0.28em] font-bold flex-shrink-0 group-hover:gap-5 transition-all duration-300">
              View <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/rooms')
      .then(res => { if (Array.isArray(res.data)) setRooms(res.data); })
      .catch(() => {});
  }, []);

  return (
    <div className="page-shell pb-24 md:pb-36">
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <motion.div
          className="page-hero-panel max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-pill mb-6">Our Rooms</span>
          <h1 className="premium-h2 text-luxury-cream mb-5">
            Signature Sanctuaries
          </h1>
          <p className="text-luxury-text/55 max-w-xl mx-auto text-base md:text-lg leading-8">
            Each room is an invitation to witness the valley's changing moods through expansive vistas and quiet luxury.
          </p>
        </motion.div>
      </div>

      {/* ── Rooms Grid ── */}
      <div className="page-container">
        {rooms.length === 0 ? (
          <div className="panel flex min-h-[300px] items-center justify-center border-dashed text-center">
            <p className="font-serif text-2xl text-luxury-text/30">No rooms added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {rooms.map((room, i) => (
              <RoomCard key={room._id} room={room} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
