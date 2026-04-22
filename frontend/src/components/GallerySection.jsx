import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import api from '../api/axios';

// Fallback images using Unsplash
const FALLBACK = [
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1596436809001-7b67f52de55d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1551882547-ff40c4a49f41?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=800',
];

const GalleryItem = ({ item, index, onClick }) => (
  <motion.div
    className="group relative overflow-hidden rounded-2xl cursor-pointer mb-4 break-inside-avoid"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    onClick={() => onClick(index)}
  >
    <img
      src={item.url || item}
      alt={item.caption || `Gallery ${index + 1}`}
      loading="lazy"
      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
      <ZoomIn
        size={28}
        className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
      />
    </div>
    {/* Gold border on hover */}
    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-luxury-gold/40 transition-all duration-500 pointer-events-none" />
  </motion.div>
);

const Lightbox = ({ images, activeIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  const item = images[activeIndex];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all z-10"
      >
        <X size={20} />
      </button>

      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="max-w-4xl max-h-[85vh] px-16"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={item.url || item}
          alt={item.caption || ''}
          className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
        />
        {(item.caption) && (
          <p className="text-center text-luxury-text/60 text-sm mt-4">{item.caption}</p>
        )}
        <p className="text-center text-luxury-text/40 text-xs mt-2 tracking-widest">
          {activeIndex + 1} / {images.length}
        </p>
      </motion.div>

      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all z-10"
      >
        <ChevronRight size={24} />
      </button>
    </motion.div>
  );
};

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    api.get('/gallery/active')
      .then(res => {
        if (res.data?.length > 0) setImages(res.data);
        else setImages(FALLBACK.map(url => ({ url })));
      })
      .catch(() => setImages(FALLBACK.map(url => ({ url }))));
  }, []);

  const openLightbox  = useCallback(i => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i - 1 + images.length) % images.length), [images.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => (i + 1) % images.length), [images.length]);

  // Split into 3 columns for masonry
  const cols = [[], [], []];
  images.forEach((img, i) => cols[i % 3].push({ ...img, _origIndex: i }));

  return (
    <>
      <section className="py-24 md:py-36 bg-luxury-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-4">Visual Journey</p>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream leading-tight">
              Through the{' '}
              <em className="font-script text-luxury-gold not-italic">Lens</em>
            </h2>
            <p className="text-luxury-text/60 mt-4 max-w-xl mx-auto leading-relaxed">
              Every corner of Estilo Mansa tells a story. Click any image to explore.
            </p>
          </motion.div>

          {/* Masonry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cols.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-4">
                {col.map((item) => (
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

export default GallerySection;
