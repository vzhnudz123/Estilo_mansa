import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import Hero from '../components/Hero';
import HomeVideo from '../components/HomeVideo';
import StorySection from '../components/StorySection';
import ImmersiveSection from '../components/ImmersiveSection';
import JeepExperience from '../components/JeepExperience';
import EventsOffersSection from '../components/EventsOffersSection';
import GallerySection from '../components/GallerySection';
import VideoSection from '../components/VideoSection';
import FeedbackSection from '../components/FeedbackSection';
import LoadingScreen from '../components/LoadingScreen';

const WHATSAPP_NUMBER = '919876543210';

// CTA divider strip
const GoldDivider = () => (
  <div className="w-full flex items-center justify-center py-12 md:py-20">
    <div className="flex items-center gap-6 opacity-30">
      <div className="h-px w-24 bg-luxury-gold" />
      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
      <div className="h-px w-24 bg-luxury-gold" />
    </div>
  </div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('home_loaded');
  });
  const ctaRef = useRef(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('home_loaded', 'true');
  };

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <div className="bg-luxury-bg text-luxury-text">

      {/* 1. HERO — fullscreen carousel */}
      <Hero />

      {/* 1.1 INTRO VIDEO */}
      <HomeVideo />

      {/* 2. OUR STORY */}
      <StorySection />

      {/* 3. IMMERSIVE SCROLL */}
      <ImmersiveSection />

      {/* 4. JEEP EXPERIENCE */}
      <JeepExperience />

      {/* 5. EVENTS & OFFERS — highlighted cards from admin */}
      <EventsOffersSection />

      {/* 6. GALLERY PREVIEW */}
      <GallerySection limit={9} />

      {/* View all gallery CTA */}
      <div className="flex justify-center pb-16 -mt-8">
        <Link to="/gallery" className="btn-outline group">
          <span>View Full Gallery</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 7. YOUTUBE SHORTS */}
      <VideoSection />

      {/* 8. GUEST REVIEWS */}
      <FeedbackSection />

      {/* 9. FINAL CTA */}
      <section className="py-32 md:py-52 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_60%,rgba(200,169,110,0.07),transparent_55%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div ref={ctaRef} className="fade-up">
            <p className="section-label mb-8 tracking-[0.8em] text-luxury-gold/80">YOUR JOURNEY AWAITS</p>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-cream mb-6 leading-tight">
              Escape to the<br />
              <em className="font-script text-luxury-gold not-italic">Hidden Valley</em>
            </h2>
            <p className="text-luxury-text/55 text-base md:text-lg mb-12 max-w-xl mx-auto leading-8">
              A few rooms. Fewer guests. Infinite moments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I want to book a stay at Estilo Mansa')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-12 !py-5 group"
              >
                <MessageCircle size={18} />
                <span>Secure Your Sanctuary</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/rooms" className="btn-outline !px-12 !py-5 group">
                <span>Explore Rooms</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
};

export default Home;
