import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../api/axios';

gsap.registerPlugin(ScrollTrigger);

const JeepExperience = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [video, setVideo] = useState(null);

  // High-quality fallback off-road journey
  const fallbackVideo = {
    url: "https://player.vimeo.com/external/494163967.sd.mp4?s=63148118021c25146c1979929853f6562d470126&profile_id=164&oauth2_token_id=57447761",
    isYouTube: false
  };

  useEffect(() => {
    api.get('/videos/active')
      .then(res => {
        const list = Array.isArray(res.data) ? res.data : [];
        const jeepVid = list.find(v => v.title?.toLowerCase().includes('jeep')) || list[0];
        
        if (jeepVid) {
          const isYouTube = jeepVid.url.includes('youtube.com') || jeepVid.url.includes('youtu.be');
          let finalUrl = jeepVid.url;
          
          if (isYouTube) {
            const id = jeepVid.url.split('/').pop().split('?')[0].split('v=')[1]?.split('&')[0] || jeepVid.url.split('/').pop();
            finalUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`;
          }
          
          setVideo({ url: finalUrl, isYouTube });
        } else {
          setVideo(fallbackVideo);
        }
      })
      .catch(() => setVideo(fallbackVideo));
  }, []);

  useEffect(() => {
    if (!video) return;
    const ctx = gsap.context(() => {
      gsap.to(videoContainerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        ease: "none"
      });

      const lines = contentRef.current.querySelectorAll('.reveal-line');
      gsap.from(lines, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 1.5,
        ease: "power4.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [video]);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex items-center overflow-hidden py-32 md:py-48"
    >
      <div className="absolute inset-0 z-0">
        <div ref={videoContainerRef} className="absolute inset-0 h-[120%] -top-[10%] w-full">
          {video && (
            video.isYouTube ? (
              <iframe
                src={video.url}
                className="w-full h-full object-cover scale-[1.5]"
                allow="autoplay; fullscreen"
                frameBorder="0"
              />
            ) : (
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
                src={video.url}
              />
            )
          )}
        </div>
        {/* CINEMATIC OVERLAYS (No blur for clear look) */}
        <div className="absolute inset-0 bg-black/40" /> 
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg via-transparent to-luxury-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg via-transparent to-transparent opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div ref={contentRef} className="max-w-3xl">
          <div className="reveal-line">
            <p className="section-label mb-8 tracking-[0.8em] text-luxury-gold drop-shadow-md">ADVENTURE AWAITS</p>
            <h2 className="font-serif text-6xl md:text-[8rem] text-luxury-cream leading-[0.9] mb-12 drop-shadow-2xl">
              Your Journey <br />
              <span className="font-script text-luxury-gold italic">Begins Now</span>
            </h2>
          </div>
          
          <div className="reveal-line space-y-8">
            <p className="text-xl md:text-2xl text-luxury-text/90 max-w-xl leading-relaxed font-light">
              We pick you up in our custom off-road jeep. Experience the misty mountains of Wayanad like never before.
            </p>
            
            <div className="flex items-center gap-8 pt-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-2">Transport</span>
                <span className="text-luxury-cream font-serif text-xl">4x4 Off-Road Pickup</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-gold font-bold mb-2">Experience</span>
                <span className="text-luxury-cream font-serif text-xl">Misty Trails</span>
              </div>
            </div>

            <div className="pt-12">
              <button className="btn-primary group !px-12 !py-6">
                <span>Discover the Route</span>
                <div className="w-8 h-px bg-luxury-dark ml-4 group-hover:w-16 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-12 right-12 text-luxury-gold/20 font-serif text-9xl select-none pointer-events-none">
        03
      </div>
    </section>
  );
};

export default JeepExperience;
