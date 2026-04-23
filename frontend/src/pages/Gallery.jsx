import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ALL_GALLERY_IMAGES } from '../assets/index.js';
import GallerySection from '../components/GallerySection';

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl px-4"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <button className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-luxury-text/70 hover:text-luxury-cream transition-colors" onClick={onClose}>
      <X size={18} />
    </button>

    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-luxury-text/35">
      {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
    </div>

    <button className="absolute left-4 md:left-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-luxury-text/60 hover:text-luxury-gold transition-colors" onClick={e => { e.stopPropagation(); onPrev(); }}>
      <ChevronLeft size={20} />
    </button>

    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        className="w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="panel overflow-hidden rounded-2xl p-3">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].label}
            className="max-h-[78vh] w-full rounded-xl object-contain"
          />
          <p className="pt-4 text-center text-xs tracking-[0.24em] text-luxury-text/40">
            {images[currentIndex].label}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>

    <button className="absolute right-4 md:right-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-luxury-text/60 hover:text-luxury-gold transition-colors" onClick={e => { e.stopPropagation(); onNext(); }}>
      <ChevronRight size={20} />
    </button>
  </motion.div>
);

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = ALL_GALLERY_IMAGES;

  const openLightbox  = useCallback(i => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setLightboxIndex(i => (i + 1) % images.length), [images.length]);

  // 3-column masonry — all images
  const cols = [[], [], []];
  images.forEach((img, i) => cols[i % 3].push({ ...img, _origIndex: i }));

  return (
    <div className="page-shell overflow-hidden pb-20 md:pb-28">
      {/* ── Hero ── */}
      <div className="page-hero">
        <motion.div
          className="page-hero-panel text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow-pill mb-6">Visual Journey</span>
          <h1 className="premium-h2 text-luxury-cream mb-5">
            A Portrait of the Retreat
          </h1>
          <p className="text-luxury-text/55 max-w-lg mx-auto text-base leading-8 md:text-lg">
            Where mist meets stone, forest meets luxury — every frame a memory waiting to be made.
          </p>
        </motion.div>
      </div>

      {/* ── Full gallery masonry ── */}
      <div className="page-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map(item => {
                const i = item._origIndex;
                return (
                  <div
                    key={i}
                    className="gallery-item-full group relative cursor-pointer overflow-hidden rounded-2xl"
                    onClick={() => openLightbox(i)}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                      <ZoomIn size={24} className="text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-luxury-gold/25 transition-all duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <p className="text-xs tracking-[0.2em] text-luxury-cream/80">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} currentIndex={lightboxIndex} onClose={closeLightbox} onPrev={goPrev} onNext={goNext} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
