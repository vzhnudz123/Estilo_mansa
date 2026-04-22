import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, ArrowRight, MessageCircle } from 'lucide-react';
import api from '../api/axios';
import Hero from '../components/Hero';
import { ScrollReveal, SectionHeader } from '../components/ui';
import StorySection from '../components/StorySection';
import GallerySection from '../components/GallerySection';
import VideoSection from '../components/VideoSection';
import FeedbackSection from '../components/FeedbackSection';
import SpecialImagesSection from '../components/SpecialImagesSection';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '919876543210';

// ── Marquee strip ───────────────────────────────────────────────────────────
const MarqueeStrip = ({ events }) => {
  const items = [...events, ...events];
  return (
    <div className="relative overflow-hidden py-5 border-y border-luxury-gold/10 bg-luxury-surface">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {items.map((ev, i) => (
            <span key={i} className="inline-flex items-center gap-4 mr-16 text-sm text-luxury-text/60">
              <Tag size={12} className="text-luxury-gold" />
              <span className="font-medium text-luxury-cream">{ev.title}</span>
              {ev.offerPrice && (
                <span className="text-luxury-gold text-xs tracking-widest">₹{ev.offerPrice}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [events, setEvents] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    Promise.allSettled([
      api.get('/events/active'),
      api.get('/rooms'),
    ]).then(([evRes, rmRes]) => {
      if (evRes.status === 'fulfilled') setEvents(evRes.value.data);
      if (rmRes.status === 'fulfilled') setRooms(rmRes.value.data.slice(0, 3));
    });
  }, []);

  return (
    <div className="bg-luxury-bg overflow-hidden">
      {/* 1. HERO SECTION (Dynamic Carousel) */}
      <Hero />

      {/* Events Marquee Strip */}
      {events.length > 0 && <MarqueeStrip events={events} />}

      {/* 2. OUR STORY (Dynamic Content + 3D Parallax) */}
      <StorySection />

      {/* 6. SPECIAL IMAGES SECTION (Highlight Premium Images) */}
      <SpecialImagesSection />

      {/* 3. STORY IMAGE GALLERY (Premium Masonry) */}
      <GallerySection />

      {/* 4. YOUTUBE VIDEO SECTION (SHORTS) */}
      <VideoSection />

      {/* ── Rooms Preview ────────────────── */}
      {rooms.length > 0 && (
        <section className="py-24 md:py-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeader
              label="Accommodations"
              title="Our Curated Spaces"
              subtitle="Thoughtfully designed rooms that open onto the forest canopy."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room, i) => (
                <ScrollReveal key={room._id} delay={i * 100}>
                  <Link to={`/rooms/${room._id}`} className="group block">
                    <div className="relative h-72 rounded-3xl overflow-hidden mb-5">
                      <img
                        src={room.images?.[0] || 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=800'}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                        <h3 className="font-serif text-xl text-luxury-cream">{room.name}</h3>
                        <span className="glass-card-light px-3 py-1 rounded-full text-luxury-gold text-sm font-medium">
                          ₹{room.price}<span className="text-white/50 text-xs">/night</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-luxury-text/60 text-sm line-clamp-2 leading-relaxed px-1">{room.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-luxury-gold text-xs tracking-widest uppercase px-1 group-hover:gap-3 transition-all">
                      View Details <ArrowRight size={12} />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. FEEDBACK SYSTEM (Dynamic Slider + Submission Form) */}
      <FeedbackSection />

      {/* ── CTA Banner ────────────────────── */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-luxury-dark/30 backdrop-blur-3xl" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <p className="section-label mb-4">Begin Your Journey</p>
            <h2 className="font-serif text-4xl md:text-6xl text-luxury-cream mb-6 leading-tight">
              Ready to Escape<br />
              <span className="font-script text-luxury-gold">to the Mist?</span>
            </h2>
            <p className="text-luxury-text/60 max-w-xl mx-auto mb-10 leading-relaxed">
              Availability is limited. Message us directly on WhatsApp for instant confirmation and tailored packages.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I want to book a stay at Estilo Mansa')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base group"
            >
              <MessageCircle size={18} />
              <span>Book via WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
