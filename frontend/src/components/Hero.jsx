import React, { useEffect, useRef, memo } from 'react';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { HERO_IMAGE } from '../assets/index.js';

const WHATSAPP_NUMBER = '919876543210';

const Hero = () => {
  const imgRef = useRef(null);

  // Subtle CSS-based parallax on scroll — no GSAP, no framer, no flicker
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const onScroll = () => {
      const y = window.scrollY;
      img.style.transform = `scale(1.08) translateY(${y * 0.22}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-bg">
      {/* ── Background image with subtle parallax ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={HERO_IMAGE}
          alt="Estilo Mansa — Wayanad Luxury Homestay"
          className="h-full w-full object-cover transform scale-[1.08] will-change-transform"
          style={{ transformOrigin: 'center center' }}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      </div>

      {/* ── Layered gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-black/35 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg/70 via-transparent to-transparent" />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-36 px-8 md:px-20 lg:px-28 z-10">
        <div className="max-w-4xl hero-content">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6 hero-label">
            <div className="w-12 h-px bg-luxury-gold opacity-60" />
            <span className="section-label opacity-80">Estilo Mansa · Lakkidi · Wayanad</span>
          </div>

          {/* Main title */}
          <h1
            className="font-script text-5xl sm:text-7xl md:text-[6.5rem] lg:text-[8rem] leading-none text-luxury-cream hero-title mb-5"
            style={{ textShadow: '0 0 60px rgba(200,169,110,0.12)' }}
          >
            Estilo Mansa
          </h1>

          {/* Tagline */}
          <p className="hero-sub mb-10 max-w-xl text-base md:text-lg font-light leading-relaxed text-luxury-text/75">
            Where the mist meets the mountains. A sanctuary crafted for those who seek quiet luxury in the heart of Wayanad.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I want to book a stay at Estilo Mansa')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group !px-10 !py-5"
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

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-luxury-gold to-transparent animate-pulse" />
        <span className="section-label rotate-90 origin-center text-[9px]">SCROLL</span>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-luxury-bg to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default memo(Hero);
