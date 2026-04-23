import React, { useRef, useEffect, memo } from 'react';
import { JEEP_VIDEO } from '../assets/index.js';

const JeepExperience = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Parallax for the video layer
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      vid.style.transform = `translateY(${(clamped - 0.5) * -50}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.jeep-reveal');
    if (!els?.length) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden flex items-center py-28 md:py-40">
      {/* ── Video background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-[115%] -mt-[7%] object-cover will-change-transform"
          src={JEEP_VIDEO}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg/80 via-transparent to-luxury-bg/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg/80 via-black/20 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 w-full">
        <div className="max-w-2xl">

          <div className="jeep-reveal fade-up flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-luxury-gold/60" />
            <span className="section-label">Adventure Awaits</span>
          </div>

          <h2 className="jeep-reveal fade-up font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-cream leading-[0.92] mb-8 drop-shadow-2xl">
            Your Journey<br />
            <em className="font-script text-luxury-gold not-italic">Begins Now</em>
          </h2>

          <p className="jeep-reveal fade-up text-lg md:text-xl text-luxury-text/85 max-w-lg leading-relaxed font-light mb-10">
            Pickup in our custom off-road jeep — the experience begins before arrival. Feel the misty trails of Wayanad unfold.
          </p>

          <div className="jeep-reveal fade-up flex items-center gap-10 py-8 border-t border-b border-white/10">
            {[
              { label: 'Transport', value: '4×4 Off-Road Jeep' },
              { label: 'Terrain', value: 'Misty Mountain Trails' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-[0.35em] text-luxury-gold/70 mb-1">{label}</p>
                <p className="font-serif text-lg text-luxury-cream">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative number */}
      <div className="absolute bottom-12 right-14 text-luxury-gold/8 font-serif text-[10rem] select-none pointer-events-none hidden lg:block leading-none">
        03
      </div>
    </section>
  );
};

export default memo(JeepExperience);
