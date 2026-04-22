import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Hero from '../components/Hero';
import StorySection from '../components/StorySection';
import ImmersiveSection from '../components/ImmersiveSection';
import JeepExperience from '../components/JeepExperience';
import GallerySection from '../components/GallerySection';
import VideoSection from '../components/VideoSection';
import FeedbackSection from '../components/FeedbackSection';
import { ScrollReveal, SectionHeader } from '../components/ui';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '919876543210';

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    api.get('/rooms')
      .then(res => {
        if (Array.isArray(res.data)) {
          setRooms(res.data.slice(0, 3));
        } else {
          setRooms([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch rooms:', err);
        setRooms([]);
      });
  }, []);

  return (
    <div className="bg-luxury-bg text-luxury-text selection:bg-luxury-gold selection:text-luxury-bg">
      
      {/* 1. HERO SECTION (Impact) */}
      <Hero />

      {/* 2. STORY SECTION (Emotion) */}
      <StorySection />

      {/* 3. IMMERSIVE SECTION (Advanced Scroll) */}
      <ImmersiveSection />

      {/* 4. OFF-ROAD JEEP (Adventure) */}
      <JeepExperience />

      {/* 5. GALLERY & FILMS */}
      <div className="bg-luxury-surface/30 backdrop-blur-3xl">
        <GallerySection />
        <VideoSection />
      </div>

      {/* ── Rooms Preview ────────────────── */}
      {rooms.length > 0 && (
        <section className="py-32 md:py-48 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeader
              label="The Retreat"
              title="Signature Sanctuaries"
              subtitle="Each room is an invitation to witness the valley's changing moods through expansive vistas."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
              {rooms.map((room, i) => (
                <ScrollReveal key={room._id} delay={i * 150}>
                  <Link to={`/rooms/${room._id}`} className="group block relative">
                    <div className="relative h-[500px] rounded-[32px] overflow-hidden mb-8 shadow-2xl transition-transform duration-700 group-hover:-translate-y-4">
                      <img
                        src={room.images?.[0] || 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=800'}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-black/20 to-transparent" />
                      
                      <div className="absolute top-8 right-8">
                        <div className="glass-card-light px-6 py-3 rounded-2xl backdrop-blur-xl border-white/10">
                          <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1 font-bold">Per Night</p>
                          <p className="text-luxury-gold font-serif text-xl">₹{room.price}</p>
                        </div>
                      </div>

                      <div className="absolute bottom-10 left-10 right-10">
                        <h3 className="font-serif text-3xl text-luxury-cream mb-4">{room.name}</h3>
                        <div className="flex items-center gap-4 text-luxury-gold text-[10px] tracking-[0.3em] uppercase font-bold group-hover:gap-6 transition-all">
                          Explore Room <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. FEEDBACK (Social Proof) */}
      <FeedbackSection />

      {/* 7. BOOKING CTA */}
      <section className="py-40 md:py-60 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <p className="section-label mb-8 tracking-[1em] text-luxury-gold-light">YOUR JOURNEY AWAITS</p>
            <h2 className="font-serif text-5xl md:text-[7rem] text-luxury-cream mb-16 leading-tight">
              Escape to the <br />
              <span className="font-script text-luxury-gold italic">Hidden Valley</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I want to book a stay at Estilo Mansa')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-16 !py-8 text-xl group shadow-[0_20px_50px_rgba(200,169,110,0.1)]"
              >
                <MessageCircle size={24} className="mr-4" />
                <span>Secure Your Sanctuary</span>
                <ArrowRight size={22} className="ml-4 group-hover:translate-x-4 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
