import React, { useEffect, useRef, useState } from 'react';
import api from '../api/axios';
import { STORY_BG } from '../assets/index.js';

import storyImg1 from '../assets/WhatsApp Image 2026-04-22 at 07.37.14.jpeg';
import storyImg2 from '../assets/WhatsApp Image 2026-04-22 at 07.37.09.jpeg';
import storyImg3 from '../assets/WhatsApp Image 2026-04-22 at 07.36.53.jpeg';
import storyImg4 from '../assets/WhatsApp Image 2026-04-22 at 07.36.26 (2).jpeg';

const DEFAULT_STORY = {
  title: 'Where the Clouds Come to Rest',
  description:
    'Perched at the edge of Lakkidi Pass, Estilo Mansa is more than a homestay — it is a dialogue between architecture and wilderness. Every stone, every timber, every open corridor was designed to frame the forest. We invite you to slow down, breathe in the mist, and rediscover what rest truly means.',
};

const StorySection = () => {
  const [story, setStory] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    api.get('/story/active')
      .then(res => { if (res.data) setStory(res.data); })
      .catch(() => {});
  }, []);

  // IntersectionObserver for scroll reveal — no GSAP, no heavy JS
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.story-reveal');
    if (!els?.length) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const data = story || DEFAULT_STORY;
  const words = (data.title || '').split(' ');
  const titleMain = words.slice(0, 4).join(' ');
  const titleScript = words.slice(4).join(' ');

  return (
    <section ref={sectionRef} className="relative py-28 md:py-44 overflow-hidden">
      {/* Soft background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={STORY_BG}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg via-luxury-bg/90 to-luxury-bg/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-luxury-bg/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="story-reveal fade-up flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-luxury-gold/60" />
            <span className="section-label">Our Story</span>
          </div>

          {/* Title */}
          <h2 className="story-reveal fade-up font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-luxury-cream leading-tight mb-8">
            {titleMain}{' '}
            <em className="font-script text-luxury-gold not-italic">
              {titleScript}
            </em>
          </h2>

          {/* Divider */}
          <div className="story-reveal fade-up w-16 h-px bg-luxury-gold/30 mb-8" />

          {/* Description */}
          <p className="story-reveal fade-up text-luxury-text/75 text-base md:text-lg leading-8 md:leading-9">
            {data.description}
          </p>
        </div>

        {/* Story Images Grid (Moved right after description) */}
        <div className="story-reveal fade-up grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
          {[storyImg1, storyImg2, storyImg3, storyImg4].map((src, idx) => (
            <div key={idx} className="relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-luxury-gold/10">
              <img 
                src={src} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                alt="Estilo Mansa Story" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
            </div>
          ))}
        </div>

        <div className="max-w-2xl">
          {/* Stats (Moved below images) */}
          <div className="story-reveal fade-up grid grid-cols-2 gap-8 mt-16 md:mt-24 pt-10 border-t border-white/8">
            {[
              { label: 'Est.', value: '2025' },
              { label: 'Rooms', value: '3' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-serif text-2xl md:text-3xl text-luxury-gold mb-1">{value}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-text/40">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
