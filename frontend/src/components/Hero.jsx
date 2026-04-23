import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { MessageCircle, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_CAROUSEL_IMAGES } from '../assets/index.js';
import { AnimatePresence, motion } from 'framer-motion';

const WHATSAPP_NUMBER = '919876543210';

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const images = useMemo(() => HERO_CAROUSEL_IMAGES, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-bg">
      {/* ── Background Carousel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full w-full object-cover"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg/90 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content Overlay (Reverted to Script Style) ── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-36 px-8 md:px-20 lg:px-28 z-10">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-luxury-gold opacity-60" />
            <span className="section-label opacity-80">Estilo Mansa · Lakkidi · Wayanad</span>
          </motion.div>

          {/* Main title (Script Font) */}
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-script text-5xl sm:text-7xl md:text-[6.5rem] lg:text-[8rem] leading-none text-luxury-cream mb-5 drop-shadow-2xl"
          >
            Estilo Mansa
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            className="mb-10 max-w-xl text-base md:text-lg font-light leading-relaxed text-luxury-text"
          >
            Where the mist meets the mountains. A sanctuary crafted for those who seek quiet luxury in the heart of Wayanad.
          </motion.p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I want to book a stay at Estilo Mansa')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-10 !py-5"
            >
              <MessageCircle size={16} />
              <span>Book Your Stay</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="btn-outline group !px-10 !py-5"
            >
              <span>Discover More</span>
              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Subtle Controls ── */}
      <div className="absolute bottom-10 left-10 md:left-28 z-20 flex gap-4">
        <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-luxury-gold to-transparent animate-pulse" />
        <span className="section-label rotate-90 origin-center text-[9px]">SCROLL</span>
      </div>
    </section>
  );
};

export default memo(Hero);
