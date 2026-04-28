import React, { useRef, useEffect, memo } from 'react';
import { IMMERSIVE_IMAGES } from '../assets/index.js';

const details = [
  ['Altitude', 'Mist-led mornings'],
  ['Mood', 'Quiet forest luxury'],
  ['Arrival', 'Private trail access'],
];

const ImmersiveSection = () => {
  const sectionRef = useRef(null);
  const mainImgRef = useRef(null);

  // Light parallax on main image only — CSS transform, no GSAP
  useEffect(() => {
    const img = mainImgRef.current;
    if (!img) return;
    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      img.style.transform = `translateY(${(clamped - 0.5) * -40}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.imm-reveal');
    if (!els?.length) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-obsidian py-28 md:py-44">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_30%,rgba(197,160,89,0.10),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">

          {/* ── Text column ── */}
          <div className="order-2 lg:order-1">
            <div className="imm-reveal fade-up flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-luxury-gold/60" />
              <span className="section-label">The Atmosphere</span>
            </div>

            <h2 className="imm-reveal fade-up font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-cream leading-tight mb-8">
              Luxury that moves with the{' '}
              <em className="font-script text-luxury-gold not-italic">mist</em>
            </h2>

            <p className="imm-reveal fade-up text-luxury-text/65 text-base md:text-lg leading-8 mb-14">
              Layered views, tactile materials, and quiet corners unfold with the calm rhythm of the highlands — every sunrise a private exhibition.
            </p>

            <div className="imm-reveal fade-up grid grid-cols-3 gap-5">
              {details.map(([label, value]) => (
                <div key={label} className="border-l border-luxury-gold/25 pl-5">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-luxury-gold/60 mb-2">{label}</p>
                  <p className="font-serif text-lg text-luxury-cream">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image column ── */}
          <div className="order-1 lg:order-2 relative">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)] border border-white/8 h-[480px] md:h-[600px]">
                <img
                  ref={mainImgRef}
                  src={IMMERSIVE_IMAGES[0]}
                  alt="EstiloMansa homestay in Wayanad atmosphere"
                  className="w-full h-full object-cover will-change-transform"
                  loading="lazy"
                  decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="section-label mb-2">Wayanad</p>
                <p className="font-serif text-2xl text-luxury-cream">Every frame holds the hush of the valley.</p>
              </div>
            </div>

            {/* Floating accent cards */}
            <div className="absolute -left-8 top-10 hidden md:block imm-reveal fade-up">
              <div className="w-40 h-52 rounded-xl overflow-hidden border border-white/8 shadow-2xl">
                <img src={IMMERSIVE_IMAGES[1]} alt="Interior comfort at EstiloMansa Wayanad" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="absolute -right-6 bottom-16 hidden md:block imm-reveal fade-up" style={{ transitionDelay: '0.15s' }}>
              <div className="w-44 h-56 rounded-xl overflow-hidden border border-white/8 shadow-2xl">
                <img src={IMMERSIVE_IMAGES[2]} alt="Scenic room corner at EstiloMansa Wayanad" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(ImmersiveSection);
