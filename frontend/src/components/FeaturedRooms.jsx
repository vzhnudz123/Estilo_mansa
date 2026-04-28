import React from 'react';
import { FEATURED_ROOMS } from '../assets';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedRooms = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="featured-rooms">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/snow.png')]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-black" />
              <span className="text-[10px] tracking-[0.4em] text-black font-bold uppercase">The Collection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-black mb-6">
              Featured <em className="font-script text-luxury-gold not-italic">Sanctuaries</em>
            </h2>
            <p className="text-black/60 leading-relaxed text-lg">
              Each room at Estilo Mansa is a unique masterpiece, designed to provide the ultimate 
              blend of heritage charm and modern comfort.
            </p>
          </div>
          <Link to="/rooms" className="flex items-center gap-3 text-black text-[10px] uppercase tracking-[0.2em] font-black group px-6 py-3 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all">
            <span>Explore All Rooms</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 md:pb-0 hide-scrollbar snap-x snap-mandatory">
          {FEATURED_ROOMS.slice(0, 3).map((room, idx) => (
            <div key={idx} className="min-w-[85%] md:min-w-0 snap-center group relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={room.src} 
                  alt={room.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-serif text-white mb-2">{room.name}</h3>
                <p className="text-white/60 text-sm mb-6 line-clamp-2">Experience luxury in the heart of nature with panoramic views and premium amenities.</p>
                <Link to="/rooms" className="flex items-center gap-2 text-luxury-gold text-[10px] uppercase tracking-widest font-bold group/btn">
                  View Room Details <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
