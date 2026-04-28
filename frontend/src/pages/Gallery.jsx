import React, { useState, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import SEO from '../components/SEO';
import { ALL_GALLERY_IMAGES } from '../assets';
import { ScrollReveal } from '../components/ui';
import { createBreadcrumbSchema, createLodgingSchema } from '../seo/site';
import { ROUTES } from '../utils/routes';

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl px-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <button className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-luxury-text/70 hover:text-luxury-cream transition-colors" onClick={onClose}>
      <X size={18} />
    </button>

    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-luxury-text/35">
      {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
    </div>

    <button className="absolute left-4 md:left-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-luxury-text/60 hover:text-luxury-gold transition-colors" onClick={(event) => { event.stopPropagation(); onPrev(); }}>
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
        onClick={(event) => event.stopPropagation()}
      >
        <div className="panel overflow-hidden rounded-2xl p-3">
          <img
            src={images[currentIndex].src}
            alt={`${images[currentIndex].label} at EstiloMansa homestay in Wayanad`}
            className="max-h-[78vh] w-full rounded-xl object-contain"
          />
          {images[currentIndex].label && (
            <p className="pt-4 text-center text-xs tracking-[0.24em] text-luxury-text/40">
              {images[currentIndex].label}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>

    <button className="absolute right-4 md:right-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-luxury-text/60 hover:text-luxury-gold transition-colors" onClick={(event) => { event.stopPropagation(); onNext(); }}>
      <ChevronRight size={20} />
    </button>
  </motion.div>
);

const GalleryItem = memo(({ item, index, onClick }) => (
  <ScrollReveal delay={index % 3 * 100}>
    <div
      className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] bg-luxury-surface/20"
      onClick={() => onClick(index)}
    >
      <div className="absolute inset-0 z-10 border border-white/5 group-hover:border-luxury-gold/30 transition-colors duration-700 pointer-events-none rounded-[1.5rem]" />

      <img
        src={item.src}
        alt={item.label ? `${item.label} at EstiloMansa homestay in Wayanad` : 'EstiloMansa homestay in Wayanad gallery image'}
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 bg-luxury-gold/5"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-700" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
          <ZoomIn size={20} className="text-white" />
        </div>
      </div>

      {item.label && (
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold font-bold">{item.label}</p>
        </div>
      )}
    </div>
  </ScrollReveal>
));

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = useMemo(() => ALL_GALLERY_IMAGES, []);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((index) => (index - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setLightboxIndex((index) => (index + 1) % images.length), [images.length]);

  return (
    <div className="page-shell pb-20 md:pb-28">
      <SEO
        title="Gallery | EstiloMansa Homestay in Wayanad"
        description="Explore photos of EstiloMansa, a scenic homestay in Wayanad with comfortable rooms and peaceful Kerala valley views."
        path={ROUTES.gallery}
        image={images[0]?.src}
        imageAlt="Gallery view of EstiloMansa homestay in Wayanad"
        structuredData={[
          createLodgingSchema({
            url: ROUTES.gallery,
            image: images[0]?.src,
            description: 'Explore photos of EstiloMansa, a scenic homestay in Wayanad with comfortable rooms and peaceful Kerala valley views.',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: ROUTES.home },
            { name: 'Gallery', url: ROUTES.gallery },
          ]),
        ]}
      />
      <h1 className="sr-only">EstiloMansa Homestay in Wayanad Gallery</h1>

      <div className="page-hero">
        <div className="page-hero-panel text-center max-w-3xl mx-auto py-10 md:py-16">
          <ScrollReveal>
            <span className="eyebrow-pill">Visual Journey</span>
          </ScrollReveal>
        </div>
      </div>

      <div className="page-container mt-12 md:mt-20">
        <div className="columns-2 md:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6">
          {images.map((item, index) => (
            <div key={index} className="break-inside-avoid">
              <GalleryItem item={item} index={index} onClick={openLightbox} />
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
