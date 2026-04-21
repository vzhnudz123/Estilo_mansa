import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// Reusable scroll reveal wrapper
export const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Section header with gold divider
export const SectionHeader = ({ label, title, subtitle, light = false }) => (
  <ScrollReveal>
    <div className="text-center mb-16 md:mb-20">
      {label && <p className="section-label mb-4 opacity-80">{label}</p>}
      <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 ${
        light ? 'text-luxury-cream' : 'text-luxury-cream'
      }`}>
        {title}
      </h2>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-luxury-gold opacity-60" />
        <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold opacity-80" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-luxury-gold opacity-60" />
      </div>
      {subtitle && (
        <p className="text-luxury-text/60 max-w-2xl mx-auto text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  </ScrollReveal>
);

// Loading screen
export const LoadingScreen = () => (
  <div className="min-h-screen bg-luxury-bg flex flex-col items-center justify-center gap-6">
    <div className="relative">
      <div className="spinner" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="gold-text font-script text-xs">EM</span>
      </div>
    </div>
    <p className="section-label opacity-40 animate-pulse">Loading...</p>
  </div>
);
