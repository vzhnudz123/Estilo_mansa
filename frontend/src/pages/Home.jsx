import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import Hero from '../components/Hero';
import HomeVideo from '../components/HomeVideo';

// Lazy load non-critical sections to reduce initial bundle size
const StorySection = lazy(() => import('../components/StorySection'));
const ImmersiveSection = lazy(() => import('../components/ImmersiveSection'));
const JeepExperience = lazy(() => import('../components/JeepExperience'));
const EventsOffersSection = lazy(() => import('../components/EventsOffersSection'));
const GallerySection = lazy(() => import('../components/GallerySection'));
const VideoSection = lazy(() => import('../components/VideoSection'));
const FeedbackSection = lazy(() => import('../components/FeedbackSection'));
const LoadingScreen = lazy(() => import('../components/LoadingScreen'));

const WHATSAPP_NUMBER = '919037706644';

// Component wrapper to handle visibility tracking
const SectionWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading before it enters the viewport
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[200px]">
      {isVisible ? (
        <Suspense fallback={<div className="h-40 w-full animate-pulse bg-white/5" />}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
};

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
        {isLoading && (
          <Suspense fallback={null}>
            <LoadingScreen onComplete={handleLoadingComplete} />
          </Suspense>
        )}
      </AnimatePresence>

      <div className="bg-luxury-bg text-luxury-text">
        {/* 1. HERO — Critical for LCP, loaded immediately */}
        <Hero />

        {/* 1.1 INTRO VIDEO — Heavy asset, wrapped in observer */}
        <SectionWrapper>
          <HomeVideo />
        </SectionWrapper>

        {/* 2. OUR STORY */}
        <SectionWrapper>
          <StorySection />
        </SectionWrapper>

        {/* 3. IMMERSIVE SCROLL */}
        <SectionWrapper>
          <ImmersiveSection />
        </SectionWrapper>

        {/* 4. JEEP EXPERIENCE */}
        <SectionWrapper>
          <JeepExperience />
        </SectionWrapper>

        {/* 5. EVENTS & OFFERS */}
        <SectionWrapper>
          <EventsOffersSection />
        </SectionWrapper>

        {/* 6. GALLERY PREVIEW */}
        <SectionWrapper>
          <GallerySection limit={9} />
          <div className="flex justify-center pb-16 -mt-8">
            <Link to="/gallery" className="btn-outline group">
              <span>View Full Gallery</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </SectionWrapper>

        {/* 7. YOUTUBE SHORTS */}
        <SectionWrapper>
          <VideoSection />
        </SectionWrapper>

        {/* 8. GUEST REVIEWS */}
        <SectionWrapper>
          <FeedbackSection />
        </SectionWrapper>

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
