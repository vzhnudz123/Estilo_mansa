import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { format, isAfter, parseISO } from 'date-fns';
import api from '../api/axios';

const EventOfferCard = ({ event, index }) => {
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
      className="fade-up group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.25em] ${
          isOffer
            ? 'bg-luxury-gold text-obsidian'
            : 'bg-luxury-green/80 text-luxury-cream border border-luxury-gold/20'
        }`}>
          {isOffer ? <Tag size={10} /> : <Calendar size={10} />}
          {isOffer ? 'Offer' : 'Event'}
        </span>
      </div>

      {/* Price badge */}
      {isOffer && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-obsidian/80 backdrop-blur-md px-4 py-2 rounded-xl border border-luxury-gold/20">
            <p className="text-luxury-gold font-serif text-lg leading-none">₹{event.offerPrice}</p>
            <p className="text-luxury-text/40 text-[9px] tracking-widest mt-0.5">per stay</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-7 pt-14">
        <h3 className="font-serif text-xl text-luxury-cream mb-3 group-hover:text-luxury-gold transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-luxury-text/65 text-sm leading-7 mb-5 line-clamp-2">{event.description}</p>

        <div className="flex flex-col gap-2 pt-4 border-t border-white/6">
          <div className="flex items-center gap-2 text-[11px] text-luxury-text/40">
            <Calendar size={12} className="text-luxury-gold/60" />
            <span>
              {event.startDate ? format(parseISO(event.startDate), 'MMM dd') : '—'}
              {' — '}
              {event.endDate ? format(parseISO(event.endDate), 'MMM dd, yyyy') : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
};

const EventsOffersSection = () => {
  const [events, setEvents] = useState([]);
  const headerRef = useRef(null);

  useEffect(() => {
    api.get('/events')
      .then(res => {
        if (Array.isArray(res.data)) {
          // Show active/upcoming only
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
    <section className="py-24 md:py-36 bg-luxury-surface relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-luxury-gold/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 fade-up">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-luxury-gold/60" />
              <span className="section-label">Events & Offers</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream leading-tight">
              Exclusive{' '}
              <em className="font-script text-luxury-gold not-italic">Experiences</em>
            </h2>
          </div>
          <p className="text-luxury-text/55 max-w-xs text-sm leading-7">
            Limited-time offers and special events curated for our guests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <EventOfferCard key={event._id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsOffersSection;
