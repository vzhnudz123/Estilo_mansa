import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ScrollReveal } from '../components/ui';

import img13 from '../assets/Sideview.jpeg';
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

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 px-4 backdrop-blur-xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <button
      className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-luxury-text/70 transition-colors hover:text-luxury-cream"
      onClick={onClose}
    >
      <X size={20} />
    </button>

    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-sm tracking-[0.3em] text-luxury-text/40">
      {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
    </div>

    <button
      className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-luxury-text/60 transition-colors hover:text-luxury-gold md:left-8"
      onClick={e => { e.stopPropagation(); onPrev(); }}
    >
      <ChevronLeft size={20} />
    </button>

    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        className="w-full max-w-6xl px-10"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.28 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="panel overflow-hidden rounded-[2rem] bg-black/80 p-3 sm:p-4">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].label}
            className="max-h-[75vh] w-full rounded-[1.5rem] object-contain"
          />
          <p className="pt-4 text-center text-sm tracking-[0.24em] text-luxury-text/45">
            {images[currentIndex].label}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>

    <button
      className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-luxury-text/60 transition-colors hover:text-luxury-gold md:right-8"
      onClick={e => { e.stopPropagation(); onNext(); }}
    >
      <ChevronRight size={20} />
    </button>
  </motion.div>
);

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = i => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex(i => (i - 1 + allImages.length) % allImages.length);
  const goNext = () => setLightboxIndex(i => (i + 1) % allImages.length);

  const spans = [2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1];

  return (
    <div className="page-shell overflow-hidden">
      <div className="page-hero">
        <motion.div
          className="page-hero-panel text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow-pill mb-5">Visual Journey</span>
            <h1 className="premium-h2 text-luxury-cream">A curated portrait of the retreat</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-luxury-text/58 md:text-lg">
              A visual portrait of life at Estilo Mansa — where mist meets stone, forest meets luxury.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="page-container pb-20 md:pb-28">
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gridAutoRows: '220px' }}
        >
          {allImages.map((img, i) => (
            <ScrollReveal key={i} delay={(i % 3) * 80}>
              <div
                className="group panel card-hover relative cursor-pointer overflow-hidden rounded-[1.75rem]"
                style={{ gridRow: `span ${spans[i] || 1}` }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 py-5">
                  <div>
                    <p className="section-label mb-2">Gallery</p>
                    <span className="text-sm tracking-[0.24em] text-luxury-cream/86">{img.label}</span>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-luxury-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

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
