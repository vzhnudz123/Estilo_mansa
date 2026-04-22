import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const ScrollReveal = ({ children, delay = 0, className = '', amount = 0.2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount, margin: '-40px 0px -80px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 34 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -18 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHeader = ({ label, title, subtitle, align = 'center' }) => (
  <ScrollReveal>
    <div className={`mb-12 md:mb-16 ${align === 'left' ? 'text-left' : 'text-center'}`}>
      {label && (
        <div className={`mb-4 ${align === 'left' ? '' : 'flex justify-center'}`}>
          <span className="eyebrow-pill">{label}</span>
        </div>
      )}
      <h2 className="premium-h2 text-luxury-cream">{title}</h2>
      <div className={`mt-6 flex items-center gap-3 ${align === 'left' ? 'justify-start' : 'justify-center'}`}>
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-luxury-gold/70" />
        <div className="h-2 w-2 rounded-full bg-luxury-gold/80" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-luxury-gold/70" />
      </div>
      {subtitle && (
        <p className={`mt-6 text-base leading-8 text-luxury-text/68 md:text-lg ${align === 'left' ? 'max-w-2xl' : 'mx-auto max-w-3xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  </ScrollReveal>
);

export const LoadingScreen = ({ label = 'Preparing your stay' }) => (
  <div className="page-shell flex min-h-screen items-center justify-center px-6">
    <div className="panel relative w-full max-w-sm overflow-hidden px-8 py-12 text-center">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent" />
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-luxury-gold/20 bg-white/5">
        <div className="spinner" />
      </div>
      <p className="section-label mb-3 opacity-75">Estilo Mansa</p>
      <h2 className="font-serif text-3xl text-luxury-cream">Loading</h2>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-luxury-text/55">{label}</p>
      <div className="mt-8 space-y-3">
        <div className="skeleton h-3 rounded-full" />
        <div className="skeleton mx-auto h-3 w-4/5 rounded-full" />
      </div>
    </div>
  </div>
);

export const SkeletonBlock = ({ className = '' }) => (
  <div className={`skeleton rounded-[1.25rem] ${className}`} />
);
