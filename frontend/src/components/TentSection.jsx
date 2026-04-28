import React, { useEffect, useRef } from 'react';
import { Tent, ArrowRight } from 'lucide-react';
import { TENT_IMAGES } from '../assets';

const TentSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden relative" id="tents">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/snow.png')]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-black" />
              <span className="text-[10px] tracking-[0.4em] text-black font-black uppercase">Mountain Sanctuary</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-black mb-4 leading-tight">
              The <em className="font-script text-luxury-gold not-italic">Tent</em> Experience
            </h2>
            <p className="text-black/60 leading-relaxed text-base md:text-lg max-w-2xl font-light">
              Refined glamping under the Wayanad sky, blending wilderness with Estilo Mansa's signature luxury.
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-2">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-black/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              <span className="text-[9px] text-black font-bold uppercase tracking-widest">Now Available</span>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="opacity-0 translate-y-10 transition-all duration-1000 [&.revealed]:opacity-100 [&.revealed]:translate-y-0">
          {/* Main Large Card - Always full width */}
          <div className="relative group rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[16/8] shadow-xl mb-4">
            <img 
              src={TENT_IMAGES[0]} 
              alt="Luxury Tent Setup" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-white/10 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold border border-white/20 inline-block mb-3">
                Premium Glamping
              </span>
              <h3 className="text-xl md:text-3xl font-serif text-white mb-1">Wilderness Suite</h3>
              <p className="text-white/60 text-xs max-w-md">Experience the morning mist through canvas walls.</p>
            </div>
          </div>

          {/* Supporting Cards - Horizontal on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 pb-4 md:pb-0 hide-scrollbar snap-x snap-mandatory">
            <div className="min-w-[85%] md:min-w-0 snap-center relative group rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
               <img 
                  src={TENT_IMAGES[2]} 
                  alt="Tent Detail" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5" />
            </div>

            <div className="min-w-[85%] md:min-w-0 snap-center relative group rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
               <img 
                  src={TENT_IMAGES[4]} 
                  alt="Tent View" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 md:p-8">
                  <div className="text-left">
                    <h4 className="text-white text-lg md:text-xl font-serif mb-2">Nature Unplugged</h4>
                    <button className="flex items-center gap-2 text-luxury-gold text-[9px] uppercase tracking-[0.2em] font-black group">
                      <span>View Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentSection;
