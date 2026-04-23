import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import api from '../api/axios';
import { resolveMediaUrl } from '../utils/media';

const DEFAULT_STORY = {
  title: 'Where the Clouds Come to Rest',
  description:
    'Perched at the edge of Lakkidi Pass, Estilo Mansa is more than a homestay — it is a dialogue between architecture and wilderness. Every stone, every timber, every open corridor was designed to frame the forest. We invite you to slow down, breathe in the mist, and rediscover what rest truly means.',
  images: [
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
  ],
};

const StoryImage = ({ src, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y   = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30]);
  const rot = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -2 : 2, index % 2 === 0 ? 2 : -2]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate: rot }}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.08 }}
      className="relative flex-shrink-0 w-64 md:w-80 h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-2xl"
      whileHover={{ scale: 1.03, rotate: 0 }}
    >
      <img src={resolveMediaUrl(src)} alt="" loading="lazy" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </motion.div>
  );
};

const StorySection = () => {
  const [story, setStory] = useState(null);
  const trackRef = useRef(null);

  useEffect(() => {
    api.get('/story/active')
      .then(res => { if (res.data) setStory(res.data); })
      .catch(() => {});
  }, []);

  const data = story || DEFAULT_STORY;

  return (
    <section className="py-28 md:py-40 overflow-hidden bg-luxury-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.p>
        <div className="flex flex-col lg:flex-row lg:items-end gap-8">
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-cream leading-tight flex-1"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            {(data?.title || '').split(' ').slice(0, 4).join(' ')}{' '}
            <em className="font-script text-luxury-gold not-italic">
              {(data?.title || '').split(' ').slice(4).join(' ')}
            </em>
          </motion.h2>
          <motion.p
            className="text-luxury-text/70 text-base leading-8 lg:max-w-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }}
          >
            {data.description}
          </motion.p>
        </div>
      </div>

      {/* Horizontal scroll image strip */}
      <div className="relative" style={{ perspective: '1200px' }}>
        <div className="overflow-x-auto pb-6 cursor-grab active:cursor-grabbing" ref={trackRef}
          style={{ scrollbarWidth: 'none' }}
          onMouseDown={e => {
            const el = trackRef.current;
            const startX = e.pageX - el.offsetLeft;
            const scrollLeft = el.scrollLeft;
            const onMove = ev => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX); };
            const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
          }}
        >
          <div className="flex gap-6 px-6 lg:px-12 w-max">
            {data?.images?.map((src, i) => (
              <StoryImage key={i} src={src} index={i} />
            ))}
          </div>
        </div>
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-luxury-bg to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-luxury-bg to-transparent" />
      </div>
    </section>
  );
};

export default StorySection;
