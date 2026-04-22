import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import api from '../api/axios';

const SpecialImagesSection = () => {
  const [images, setImages] = useState([]);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/gallery/featured');
        if (res.data && res.data.length >= 2) {
          setImages(res.data.slice(0, 2));
        } else {
          // Fallback if no featured images in DB
          setImages([
            { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200', caption: 'Lush Greenery' },
            { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200', caption: 'Misty Pass' }
          ]);
        }
      } catch (err) {
        console.error('Error fetching featured images:', err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 bg-luxury-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Large Image 1 */}
          <motion.div 
            style={{ y: y1 }}
            className="relative h-[500px] md:h-[700px] rounded-[40px] overflow-hidden group shadow-2xl"
          >
            <motion.img 
              src={images[0]?.url} 
              alt={images[0]?.caption} 
              style={{ scale }}
              className="w-full h-full object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10">
              <p className="section-label text-white/80 mb-2">Signature View</p>
              <h3 className="font-serif text-3xl text-white">{images[0]?.caption || 'The Infinity Horizon'}</h3>
            </div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="font-serif text-4xl md:text-6xl text-luxury-cream leading-tight mb-8">
                Immersive <br />
                <em className="font-script text-luxury-gold not-italic">Refinement</em>
              </h2>
              <p className="text-luxury-text/70 text-lg leading-relaxed max-w-md">
                We believe in the luxury of space, the elegance of silence, and the profound beauty of untouched nature. Every view at Estilo Mansa is a masterpiece.
              </p>
            </motion.div>

            {/* Large Image 2 */}
            <motion.div 
              style={{ y: y2 }}
              className="relative h-[400px] md:h-[500px] rounded-[40px] overflow-hidden group shadow-2xl border border-luxury-gold/10"
            >
              <motion.img 
                src={images[1]?.url} 
                alt={images[1]?.caption} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="glass-card px-6 py-3 rounded-full text-luxury-gold tracking-widest uppercase text-xs">Explore more</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SpecialImagesSection;
