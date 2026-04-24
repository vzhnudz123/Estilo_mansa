import React from 'react';
import { motion } from 'framer-motion';

import estiloRoomVideo from '../assets/estiloroom.mp4';
import roomWideViewVideo from '../assets/roomwideview.mp4';
import roomImage from '../assets/room.jpeg';
import washroomImage from '../assets/whashroom.jpeg';

const Rooms = () => {
  return (
    <div className="relative bg-obsidian w-full min-h-[100dvh] pt-32 md:pt-40 pb-24 px-6 lg:px-12 flex items-center justify-center overflow-hidden">
      
      {/* Container with grid to handle 4 cards elegantly */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4 lg:gap-10 mt-10">
        
        {/* ── Card 1: Room View (Video) ── */}
        <section className="relative w-full aspect-[9/16] rounded-3xl md:rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-luxury-gold/20 flex items-center justify-center bg-obsidian shrink-0">
          <video 
            src={estiloRoomVideo}
            autoPlay loop muted playsInline 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12 px-6 z-10 pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-script text-3xl md:text-5xl text-luxury-cream drop-shadow-2xl mb-1 md:mb-3"
            >
              Room View
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-white/60 text-[10px] md:text-sm font-light max-w-xs mx-auto"
            >
              A sanctuary crafted for slow mornings and quiet luxury.
            </motion.p>
          </div>
        </section>

        {/* ── Card 2: Wide View (Video) ── */}
        <section className="relative w-full aspect-[9/16] rounded-3xl md:rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-luxury-gold/20 flex items-center justify-center bg-obsidian shrink-0">
          <video 
            src={roomWideViewVideo}
            autoPlay loop muted playsInline 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12 px-6 z-10 pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-script text-3xl md:text-5xl text-luxury-gold drop-shadow-2xl mb-1 md:mb-3"
            >
              Wide View
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-white/60 text-[10px] md:text-sm font-light max-w-xs mx-auto"
            >
              Immerse yourself in the tranquility of Wayanad.
            </motion.p>
          </div>
        </section>

        {/* ── Card 3: Room Detail (Image) ── */}
        <section className="relative w-full aspect-[9/16] rounded-3xl md:rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-luxury-gold/20 flex items-center justify-center bg-obsidian shrink-0">
          <img 
            src={roomImage}
            alt="Room Detail"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12 px-6 z-10 pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-script text-3xl md:text-5xl text-luxury-cream drop-shadow-2xl mb-1 md:mb-3"
            >
              Interior
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white/60 text-[10px] md:text-sm font-light max-w-xs mx-auto"
            >
              Elegant spaces designed for ultimate comfort.
            </motion.p>
          </div>
        </section>

        {/* ── Card 4: Washroom (Image) ── */}
        <section className="relative w-full aspect-[9/16] rounded-3xl md:rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-luxury-gold/20 flex items-center justify-center bg-obsidian shrink-0">
          <img 
            src={washroomImage}
            alt="Washroom Detail"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12 px-6 z-10 pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="font-script text-3xl md:text-5xl text-luxury-gold drop-shadow-2xl mb-1 md:mb-3"
            >
              Washroom
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="text-white/60 text-[10px] md:text-sm font-light max-w-xs mx-auto"
            >
              Premium amenities for a refreshing escape.
            </motion.p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Rooms;
