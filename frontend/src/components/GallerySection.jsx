import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ALL_GALLERY_IMAGES } from '../assets/index.js';

// ── Lightbox ────────────────────────────────────────────────────────────────────
const Lightbox = ({ images, activeIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const h = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-luxury-gold hover:border-luxury-gold/40 transition-all z-10">
        <X size={18} />
      </button>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-luxury-text/40">
        {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-luxury-gold hover:border-luxury-gold/40 transition-all z-10">
        <ChevronLeft size={20} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.28 }}
          className="max-w-5xl max-h-[88vh] px-16"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].label || ''}
            className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl"
          />
          {images[activeIndex].label && (
            <p className="text-center text-luxury-text/50 text-xs mt-4 tracking-widest">{images[activeIndex].label}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-luxury-gold hover:border-luxury-gold/40 transition-all z-10">
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
};

// ── Gallery Item ────────────────────────────────────────────────────────────────
const GalleryItem = ({ item, index, onClick }) => {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="fade-up group relative overflow-hidden rounded-2xl cursor-pointer mb-4 break-inside-avoid"
      onClick={() => onClick(index)}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
    >
      <img
        src={item.src}
        alt={item.label || `Gallery ${index + 1}`}
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 flex items-center justify-center">
        <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
      </div>
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-luxury-gold/30 transition-all duration-500 pointer-events-none" />
    </div>
  );
};

// ── Gallery Section ──────────────────────────────────────────────────────────────
const GallerySection = ({ limit = 12 }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = ALL_GALLERY_IMAGES.slice(0, limit);

  const openLightbox  = useCallback(i => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => (i + 1) % images.length), [images.length]);

  // 3-column masonry
  const cols = [[], [], []];
  images.forEach((img, i) => cols[i % 3].push({ ...img, _origIndex: i }));

  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) { 
          el.classList.add('revealed'); 
          obs.unobserve(el); 
        } 
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <>
      <section className="py-24 md:py-36 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div ref={sectionRef} className="text-center mb-16 fade-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-luxury-gold/40" />
              <span className="section-label">Visual Journey</span>
              <div className="w-12 h-px bg-luxury-gold/40" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream leading-tight">
              Through the{' '}
              <em className="font-script text-luxury-gold not-italic">Lens</em>
            </h2>
            <p className="text-luxury-text/55 mt-4 max-w-md mx-auto leading-relaxed text-sm md:text-base">
              Every corner of Estilo Mansa tells a story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cols.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-4">
                {col.map(item => (
                  <GalleryItem
                    key={item._origIndex}
                    item={item}
                    index={item._origIndex}
                    onClick={openLightbox}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(GallerySection);
