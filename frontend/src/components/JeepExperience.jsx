import React, { useRef, useEffect, memo } from 'react';
import { JEEP_VIDEO, SIDEVIEW } from '../assets/index.js';

const JeepExperience = () => {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);

  // Parallax for the video layer
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

  // Ensure video plays (handles browser autoplay policy edge cases)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked — video stays on poster frame, which is fine
      });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
    }

    return () => video.removeEventListener('canplay', tryPlay);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-0 sm:min-h-[58vh] md:min-h-[72vh] lg:min-h-[78vh] w-full overflow-hidden flex items-start md:items-center py-10 sm:py-16 md:py-24 lg:py-28"
    >
      {/* ── Video background ── */}
      <div
        ref={mediaRef}
        className="absolute inset-0 overflow-hidden will-change-transform"
        style={{ top: '-60px', bottom: '-60px' }} // extra room for parallax travel
      >
        <video
          ref={videoRef}
          src={JEEP_VIDEO}
          poster={SIDEVIEW}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Jeep approach to EstiloMansa homestay in Wayanad"
          className="h-full w-full object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg/80 via-transparent to-luxury-bg/55" />
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="jeep-reveal fade-up flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-10 h-px bg-luxury-gold/60" />
            <span className="section-label">Your Adventure</span>
          </div>

          <h2 className="jeep-reveal fade-up font-serif text-[2.7rem] sm:text-5xl md:text-7xl lg:text-8xl text-luxury-cream leading-[0.92] mb-6 md:mb-8 drop-shadow-2xl">
            Your Journey
            <br />
            <em className="font-script text-luxury-gold not-italic">
              Begins Now
            </em>
          </h2>

          <p className="jeep-reveal fade-up text-base sm:text-lg md:text-xl text-luxury-text/85 max-w-lg leading-relaxed font-light">
            The road to Estilo Mansa is an experience in itself. Our custom
            off-road jeep will carry you through the misty highlands to your
            sanctuary.
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(JeepExperience);
