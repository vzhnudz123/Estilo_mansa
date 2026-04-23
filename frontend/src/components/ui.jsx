import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// ── ScrollReveal — now uses IntersectionObserver + CSS .fade-up class ─────────
export const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-up ${className}`}
      style={delay ? { transitionDelay: `${delay / 1000}s` } : undefined}
    >
      {children}
    </div>
  );
};

// ── PageTransition — subtle fade+slide between routes ─────────────────────────
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -14 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// ── SectionHeader — reusable section title block ──────────────────────────────
export const SectionHeader = ({ label, title, subtitle, align = 'center' }) => (
  <ScrollReveal>
    <div className={`mb-12 md:mb-16 ${align === 'left' ? 'text-left' : 'text-center'}`}>
      {label && (
        <div className={`mb-5 ${align === 'left' ? '' : 'flex justify-center'}`}>
          <span className="eyebrow-pill">{label}</span>
        </div>
      )}
      <h2 className="premium-h2 text-luxury-cream">{title}</h2>
      <div className={`mt-5 flex items-center gap-3 ${align === 'left' ? 'justify-start' : 'justify-center'}`}>
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-luxury-gold/60" />
        <div className="h-1.5 w-1.5 rounded-full bg-luxury-gold/70" />
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-luxury-gold/60" />
      </div>
      {subtitle && (
        <p className={`mt-6 text-base leading-8 text-luxury-text/65 md:text-lg ${align === 'left' ? 'max-w-2xl' : 'mx-auto max-w-3xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  </ScrollReveal>
);

// ── LoadingScreen — kept as null (no loaders per spec) ────────────────────────
// Exported for backwards compatibility with any remaining imports
export const LoadingScreen = () => null;

// ── SkeletonBlock ─────────────────────────────────────────────────────────────
export const SkeletonBlock = ({ className = '' }) => (
  <div className={`skeleton rounded-[1.25rem] ${className}`} />
);
