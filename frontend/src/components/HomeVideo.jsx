import React, { memo } from 'react';
import { HERO_IMAGE, HERO_VIDEO } from '../assets/index.js';
import { motion } from 'framer-motion';
import LazyVideo from './ui/LazyVideo';

const HomeVideo = () => {
  const videoRef = React.useRef(null);
  const [shouldLoad, setShouldLoad] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={videoRef} className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-luxury-bg">
      {/* Full-width Immersive Video */}
      <div className="absolute inset-0">
        {shouldLoad && (
          <LazyVideo
            src={HERO_VIDEO}
            poster={HERO_IMAGE}
            alt="Scenic homestay in Wayanad video preview"
            buttonLabel="Play immersive view"
            loop
            muted
            className="h-full w-full"
            videoClassName="h-full w-full object-cover"
          />
        )}
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg via-transparent to-luxury-bg" />
      </div>

      {/* Centered Indicator Badge */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="px-8 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-4"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold animate-pulse" />
          <span className="text-xs uppercase tracking-[0.4em] text-white font-medium">Immersive View</span>
        </motion.div>
      </div>

      {/* Poetic Caption at the Bottom */}
      <div className="absolute bottom-12 left-0 w-full text-center z-10 px-6">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif italic text-2xl md:text-4xl text-luxury-cream leading-relaxed drop-shadow-lg"
        >
          Witness the symphony of mist and green.
        </motion.p>
      </div>
    </section>
  );
};

export default memo(HomeVideo);
