import React, { useEffect, useState, useRef, memo, useMemo } from 'react';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { format, isAfter, parseISO } from 'date-fns';
import api from '../api/axios';
import { motion } from 'framer-motion';

const EventOfferCard = memo(({ event, index }) => {
  const ref = useRef(null);
  const isOffer = !!event.offerPrice;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="fade-up group relative rounded-3xl overflow-hidden bg-luxury-surface/40 backdrop-blur-sm border border-white/5 transition-all duration-700 hover:border-luxury-gold/30 hover:-translate-y-2 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />

      {/* Header Area */}
      <div className="p-8 pb-0 flex flex-col sm:flex-row justify-between items-start gap-3">
        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap ${
          isOffer
            ? 'bg-luxury-gold text-obsidian'
            : 'bg-white/5 text-luxury-cream border border-white/10'
        }`}>
          {isOffer ? <Tag size={12} /> : <Calendar size={12} />}
          {isOffer ? 'Special Offer' : 'Upcoming Event'}
        </span>

        {isOffer && (
          <div className="text-left sm:text-right">
            <p className="text-luxury-gold font-serif text-3xl leading-none">₹{event.offerPrice}</p>
            <p className="text-luxury-text/40 text-[9px] uppercase tracking-widest mt-1">per stay</p>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-8 pt-8">
        <h3 className="font-serif text-2xl md:text-4xl text-luxury-cream mb-4 group-hover:text-luxury-gold transition-colors duration-500 leading-tight">
          {event.title}
        </h3>
        <p className="text-luxury-text/50 text-sm md:text-base leading-relaxed mb-8 line-clamp-2 font-light">
          {event.description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 text-xs tracking-widest text-luxury-text/40 uppercase">
            <Calendar size={14} className="text-luxury-gold/40" />
            <span>
              {event.startDate ? format(parseISO(event.startDate), 'MMM dd') : '—'}
              {' — '}
              {event.endDate ? format(parseISO(event.endDate), 'MMM dd, yyyy') : '—'}
            </span>
          </div>
          
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-obsidian transition-all duration-500">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
});

const EventsOffersSection = () => {
  const [events, setEvents] = useState([]);
  const headerRef = useRef(null);

  useEffect(() => {
    api.get('/events')
      .then(res => {
        if (Array.isArray(res.data)) {
          const now = new Date();
          const active = res.data.filter(e => {
            try { return isAfter(parseISO(e.endDate), now); } catch { return true; }
          });
          setEvents(active.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#080d0a] relative overflow-hidden">
      {/* Immersive background texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-luxury-gold/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-luxury-gold/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div ref={headerRef} className="text-center mb-8 fade-up">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-px bg-luxury-gold/40" />
            <span className="section-label !text-[8px] tracking-[0.6em]">Exclusive Access</span>
            <div className="w-8 h-px bg-luxury-gold/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-cream leading-tight">
            Special <em className="font-script text-luxury-gold not-italic">Offers</em>
          </h2>
        </div>

        {/* Wider Cards & Improved Centering */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center ${
          events.length === 1 ? 'max-w-4xl mx-auto' : 
          events.length === 2 ? 'max-w-6xl mx-auto' : 'w-full'
        }`}>
          {events.map((event, i) => (
            <div key={event._id} className="w-full max-w-3xl">
              <EventOfferCard event={event} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(EventsOffersSection);
