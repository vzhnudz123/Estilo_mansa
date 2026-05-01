import React, { useRef, useEffect, useState, memo } from 'react';
import { Play, X } from 'lucide-react';
import { JEEP_VIDEO, SIDEVIEW } from '../assets/index.js';

const JeepExperience = () => {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parallax for the poster layer
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      media.style.transform = `translateY(${(clamped - 0.5) * -50}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.jeep-reveal');
    if (!els?.length) return;

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[70vh] md:min-h-screen w-full overflow-hidden flex items-center py-20 md:py-32"
      >
        {/* ── Poster background ── */}
        <div
          ref={mediaRef}
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={{ top: '-60px', bottom: '-60px' }}
        >
          <img
            src={SIDEVIEW}
            alt="Jeep approach to EstiloMansa homestay in Wayanad"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg/90 via-transparent to-luxury-bg/90" />
        </div>

        {/* ── Content ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="jeep-reveal fade-up flex items-center gap-4 mb-8">
              <div className="w-10 h-px bg-luxury-gold/60" />
              <span className="section-label">Your Adventure</span>
            </div>

            <h2 className="jeep-reveal fade-up font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-cream leading-[0.92] mb-8 drop-shadow-2xl">
              Your Journey
              <br />
              <em className="font-script text-luxury-gold not-italic">
                Begins Now
              </em>
            </h2>

            <p className="jeep-reveal fade-up text-lg md:text-xl text-luxury-text/85 max-w-lg leading-relaxed font-light mb-10">
              The road to Estilo Mansa is an experience in itself. Our custom
              off-road jeep will carry you through the misty highlands to your
              sanctuary.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="jeep-reveal fade-up inline-flex items-center gap-4 rounded-full border border-luxury-gold/40 bg-black/35 px-6 py-4 text-luxury-cream backdrop-blur-md transition-all duration-300 hover:border-luxury-gold hover:bg-black/55"
              aria-label="Play arrival video"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-luxury-gold/50 bg-luxury-gold/15 text-luxury-gold">
                <Play size={22} className="ml-1" fill="currentColor" />
              </span>
              <span className="text-left">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.34em] text-white/72">
                  Play Arrival
                </span>
                <span className="block font-serif text-xl text-luxury-cream">
                  Watch the jeep ride
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4 md:p-8">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close video"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0"
            aria-hidden="true"
            tabIndex={-1}
          />

          <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
            <video
              src={JEEP_VIDEO}
              poster={SIDEVIEW}
              autoPlay
              controls
              playsInline
              preload="auto"
              className="max-h-[85vh] w-full bg-black object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default memo(JeepExperience);
