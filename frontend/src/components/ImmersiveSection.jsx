import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../api/axios';

gsap.registerPlugin(ScrollTrigger);

const ImmersiveSection = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const imagesRef = useRef([]);
  const [images, setImages] = useState([]);

  // Priority: Admin images -> Local assets
  const fallbackImages = [
    '/src/assets/IMG_8813.jpeg',
    '/src/assets/IMG_8814.jpeg',
    '/src/assets/IMG_8815.jpeg',
    '/src/assets/IMG_8816.jpeg',
    '/src/assets/IMG_8817.jpeg',
    '/src/assets/IMG_8818.jpeg',
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get('/gallery/featured');
        if (res.data && res.data.length > 0) {
          setImages(res.data.map(img => img.url));
        } else {
          setImages(fallbackImages);
        }
      } catch (err) {
        setImages(fallbackImages);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const ctx = gsap.context(() => {
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      });

      // PHASE 1: Scattered, Rotated, Blurred
      imagesRef.current.forEach((img, i) => {
        gsap.set(img, {
          x: (i % 2 === 0 ? -1 : 1) * (400 + Math.random() * 600),
          y: (Math.random() - 0.5) * 800,
          rotationZ: (Math.random() - 0.5) * 90,
          rotationY: (Math.random() - 0.5) * 45,
          scale: 0.3,
          opacity: 0,
          filter: "blur(40px)",
        });
      });

      // PHASE 2: Align to Grid & Focus
      tl.to(imagesRef.current, {
        x: (i) => (i % 3 - 1) * 400,
        y: (i) => (Math.floor(i / 3) - 0.5) * 550,
        rotationZ: 0,
        rotationY: 0,
        scale: 0.9,
        opacity: 1,
        filter: "blur(0px)",
        stagger: {
          each: 0.05,
          from: "random"
        },
        duration: 2,
        ease: "power3.inOut"
      })

      // PHASE 3: Deep Scroll - Expansion & Parallax
      .to(imagesRef.current, {
        z: (i) => i * 100,
        y: (i) => (Math.floor(i / 3) - 0.5) * 550 - 100, // Parallax shift
        duration: 1.5,
        ease: "none"
      })

      // PHASE 4: Fullscreen Expansion of Lead Image
      .to(imagesRef.current.slice(1), {
        opacity: 0,
        scale: 0.5,
        filter: "blur(20px)",
        duration: 1,
        ease: "power2.in"
      }, "+=0.2")
      .to(imagesRef.current[0], {
        width: "100vw",
        height: "100vh",
        x: 0,
        y: 0,
        scale: 1.2,
        borderRadius: 0,
        duration: 2,
        ease: "expo.inOut"
      }, "<");

    }, triggerRef);

    return () => ctx.revert();
  }, [images]);

  return (
    <div ref={triggerRef} className="relative w-full h-screen bg-luxury-bg overflow-hidden">
      {/* Background Cinematic Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="font-serif text-[20vw] text-luxury-gold/5 uppercase tracking-tighter select-none whitespace-nowrap">
          REFINEMENT
        </h2>
      </div>

      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center" style={{ perspective: "2000px" }}>
        {images.slice(0, 6).map((src, i) => (
          <div
            key={i}
            ref={el => imagesRef.current[i] = el}
            className="absolute w-[350px] h-[500px] md:w-[450px] md:h-[650px] rounded-[40px] overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.8)] border border-white/5 bg-luxury-dark"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img 
              src={src} 
              alt={`Refinement ${i}`} 
              className="w-full h-full object-cover transition-transform duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/5 opacity-60" />
            
            {/* Soft inner glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.05)]" />
          </div>
        ))}
      </div>

      {/* Floating Labels */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-10 pointer-events-none">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-luxury-gold/50 to-transparent" />
        <p className="text-[10px] uppercase tracking-[1em] text-luxury-gold font-bold animate-pulse">
          Scroll for Immersion
        </p>
      </div>
    </div>
  );
};

export default ImmersiveSection;
