import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ScrollReveal, SectionHeader } from '../components/ui';

import img13 from '../assets/IMG_8813.jpeg';
import img14 from '../assets/IMG_8814.jpeg';
import img15 from '../assets/IMG_8815.jpeg';
import img16 from '../assets/IMG_8816.jpeg';
import img17 from '../assets/IMG_8817.jpeg';
import img18 from '../assets/IMG_8818.jpeg';
import img19 from '../assets/IMG_8819.jpeg';
import img20 from '../assets/IMG_8820.jpeg';
import img21 from '../assets/IMG_8821.jpeg';
import img22 from '../assets/IMG_8822.jpeg';
import img23 from '../assets/IMG_8823.jpeg';
import img24 from '../assets/IMG_8824.jpeg';
import img25 from '../assets/IMG_8825.jpeg';

const allImages = [
  { src: img13, label: 'The Estate' },
  { src: img14, label: 'Lakkidi Pass View' },
  { src: img15, label: 'Forest Edge' },
  { src: img16, label: 'Outdoor Terrace' },
  { src: img17, label: 'Mist Morning' },
  { src: img18, label: 'Living Suite' },
  { src: img19, label: 'Master Bedroom' },
  { src: img20, label: 'Dining Area' },
  { src: img21, label: 'Cozy Corner' },
  { src: img22, label: 'Detail Arch' },
  { src: img23, label: 'Valley Vista' },
  { src: img24, label: 'Night View' },
  { src: img25, label: 'Sunrise' },
];

// Lightbox
const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center"
    style={{ background: 'rgba(5,8,7,0.97)', backdropFilter: 'blur(20px)' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    {/* Close */}
    <button
      className="absolute top-6 right-6 text-luxury-text/60 hover:text-luxury-cream transition-colors z-10 p-2"
      onClick={onClose}
    >
      <X size={24} />
    </button>

    {/* Counter */}
    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-luxury-text/40 text-sm tracking-widest">
      {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
    </div>

    {/* Prev */}
    <button
      className="absolute left-4 md:left-10 text-luxury-text/40 hover:text-luxury-gold transition-colors z-10 p-3 rounded-full border border-white/10 hover:border-luxury-gold/40"
      onClick={e => { e.stopPropagation(); onPrev(); }}
    >
      <ChevronLeft size={22} />
    </button>

    {/* Image */}
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        className="max-w-5xl max-h-[80vh] px-20 w-full"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.35 }}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].label}
          className="w-full h-full object-contain rounded-2xl"
          style={{ maxHeight: '75vh' }}
        />
        <p className="text-center text-luxury-text/50 text-sm mt-4 tracking-widest">
          {images[currentIndex].label}
        </p>
      </motion.div>
    </AnimatePresence>

    {/* Next */}
    <button
      className="absolute right-4 md:right-10 text-luxury-text/40 hover:text-luxury-gold transition-colors z-10 p-3 rounded-full border border-white/10 hover:border-luxury-gold/40"
      onClick={e => { e.stopPropagation(); onNext(); }}
    >
      <ChevronRight size={22} />
    </button>
  </motion.div>
);

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = i => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex(i => (i - 1 + allImages.length) % allImages.length);
  const goNext = () => setLightboxIndex(i => (i + 1) % allImages.length);

  // Masonry-style layout (varying row spans)
  const spans = [2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1];

  return (
    <div className="bg-luxury-bg min-h-screen pt-28 pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-4">Visual Journey</p>
          <h1 className="font-serif text-5xl md:text-7xl text-luxury-cream mb-6">The Gallery</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-luxury-gold opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-luxury-gold opacity-60" />
          </div>
          <p className="text-luxury-text/50 max-w-xl mx-auto mt-6 leading-relaxed">
            A visual portrait of life at Estilo Mansa — where mist meets stone, forest meets luxury.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '220px',
          }}
        >
          {allImages.map((img, i) => (
            <ScrollReveal key={i} delay={(i % 3) * 80}>
              <div
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ gridRow: `span ${spans[i] || 1}` }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <ZoomIn size={28} className="text-luxury-gold mb-2" />
                  <span className="text-luxury-cream text-xs tracking-widest uppercase">{img.label}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={allImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
