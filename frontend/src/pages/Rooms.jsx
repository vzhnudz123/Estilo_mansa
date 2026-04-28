import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import LazyVideo from '../components/ui/LazyVideo';
import { createBreadcrumbSchema, createLodgingSchema } from '../seo/site';
import { ROUTES } from '../utils/routes';

import estiloRoomVideo from '../assets/estiloroom.mp4';
import roomWideViewVideo from '../assets/roomwideview.mp4';
import roomImage from '../assets/room.webp';
import washroomImage from '../assets/whashroom.webp';

const rooms = [
  {
    id: 1,
    title: "Room View",
    description: "A comfortable room experience for travelers searching for a homestay in Wayanad with scenic valley calm.",
    src: estiloRoomVideo,
    poster: roomImage,
    isVideo: true
  },
  {
    id: 2,
    title: "Wide Horizon",
    description: "Panoramic Wayanad views and easy Wayanad rooms booking for couples, families, and budget stay Kerala plans.",
    src: roomWideViewVideo,
    poster: washroomImage,
    isVideo: true
  },
  {
    id: 3,
    title: "Interior Sanctuary",
    description: "Elegant, organic spaces designed for ultimate comfort and aesthetic harmony with nature.",
    src: roomImage,
    isVideo: false
  },
  {
    id: 4,
    title: "Luxe Bath",
    description: "Premium spa-inspired amenities and natural light for a refreshing, restorative escape.",
    src: washroomImage,
    isVideo: false
  }
];

const Rooms = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % rooms.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  return (
    <>
      <SEO
        title="Rooms in Wayanad | EstiloMansa Homestay"
        description="Explore comfortable and budget-friendly rooms in Wayanad at EstiloMansa."
        path={ROUTES.rooms}
        image={roomImage}
        imageAlt="Budget-friendly room at EstiloMansa homestay in Wayanad"
        structuredData={[
          createLodgingSchema({
            url: ROUTES.rooms,
            image: roomImage,
            description: 'Explore comfortable and budget-friendly rooms in Wayanad at EstiloMansa.',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: ROUTES.home },
            { name: 'Rooms in Wayanad', url: ROUTES.rooms },
          ]),
        ]}
      />
      <div className="relative h-screen w-full bg-black overflow-hidden select-none">
      {/* ── Background Media (Full Screen) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={rooms[activeIndex].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {rooms[activeIndex].isVideo ? (
            <LazyVideo
              src={rooms[activeIndex].src}
              poster={rooms[activeIndex].poster}
              alt={`${rooms[activeIndex].title} at EstiloMansa homestay in Wayanad`}
              buttonLabel="Play room video"
              loop
              muted
              className="h-full w-full"
              videoClassName="h-full w-full object-cover"
            />
          ) : (
            <img 
              src={rooms[activeIndex].src}
              alt={`${rooms[activeIndex].title} at EstiloMansa homestay in Wayanad`}
              className="w-full h-full object-cover"
              loading={activeIndex === 2 ? 'eager' : 'lazy'}
              decoding="async"
            />
          )}
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-black/10 backdrop-brightness-[0.85]" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content Overlay ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <motion.div
          key={`content-${rooms[activeIndex].id}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl"
        >
          <p className="section-label mb-4 text-luxury-gold tracking-[0.6em] text-[10px] md:text-sm">
            SANCTUARY {activeIndex + 1} / {rooms.length}
          </p>
          
          <h1 className="font-serif text-5xl md:text-[10rem] leading-none text-white mb-6 drop-shadow-2xl">
            {rooms[activeIndex].title.split(' ')[0]} <br className="md:hidden" />
            <em className="font-script text-luxury-gold not-italic block md:inline text-4xl md:text-[8rem]">
              {rooms[activeIndex].title.split(' ')[1]}
            </em>
            <span className="sr-only">Rooms in Wayanad</span>
          </h1>

          <p className="text-white/70 text-sm md:text-lg font-light max-w-xl mx-auto leading-relaxed md:px-0 px-4">
            {rooms[activeIndex].description}
          </p>
        </motion.div>
      </div>

      {/* ── Navigation Arrows (< >) ── */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-20">
        <button 
          onClick={handlePrev}
          className="group h-12 w-12 md:h-20 md:w-20 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-all hover:bg-[#c8a96e] hover:border-[#c8a96e] hover:text-black"
        >
          <ChevronLeft size={24} className="md:w-10 md:h-10" />
        </button>

        {/* Desktop Down Scroll Indicator */}
        <div className="hidden md:flex flex-col items-center gap-3 opacity-30">
          <span className="text-[10px] tracking-[0.5em] text-white">NEXT SPACE</span>
          <div className="h-10 w-px bg-white animate-bounce" />
        </div>

        <button 
          onClick={handleNext}
          className="group h-12 w-12 md:h-20 md:w-20 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-all hover:bg-[#c8a96e] hover:border-[#c8a96e] hover:text-black"
        >
          <ChevronRight size={24} className="md:w-10 md:h-10" />
        </button>
      </div>

      {/* ── Side Indicators (Dots) ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {rooms.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              i === activeIndex ? 'bg-luxury-gold h-6 scale-x-125' : 'bg-white/20'
            }`} 
          />
        ))}
      </div>

      {/* ── Footer Branding ── */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:block vertical-text opacity-10">
        <span className="text-[9px] tracking-[1em] text-white uppercase">THE PRIVATE RETREAT · WAYANAD</span>
      </div>
      </div>
    </>
  );
};

export default Rooms;
