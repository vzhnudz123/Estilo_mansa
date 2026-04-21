import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const WHATSAPP_NUMBER = '919876543210';

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    api.get('/hero/active')
      .then(res => {
        if (res.data?.length > 0) setSlides(res.data);
        else throw new Error('no slides');
      })
      .catch(() => {
        setSlides([{
          title: 'Welcome to Estilo Mansa',
          subtitle: 'Your Luxury Sanctuary in the Mists of Lakkidi, Wayanad',
          images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070'],
          ctaTextPrimary: 'Book Now',
          ctaTextSecondary: 'Explore Rooms',
        }]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="h-screen w-full bg-luxury-bg flex items-center justify-center">
      <div className="spinner" />
    </div>
  );

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-bg">
      <Swiper
        effect="fade"
        speed={1800}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        onSlideChange={s => setActiveIndex(s.activeIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide._id || index}>
            {({ isActive }) => (
              <div className="relative h-full w-full overflow-hidden">
                {/* Zoom BG */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.12 }}
                  animate={isActive ? { scale: 1 } : { scale: 1.12 }}
                  transition={{ duration: 7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <img
                    src={slide.images?.[0]}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </motion.div>

                {/* Layered Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg/60 via-transparent to-transparent" />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-8 md:px-20 lg:px-28 z-10">
                  <motion.div className="max-w-3xl">
                    {/* Label */}
                    <motion.div
                      className="flex items-center gap-3 mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isActive ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="w-12 h-px bg-luxury-gold opacity-60" />
                      <span className="section-label opacity-80">Estilo Mansa · Wayanad</span>
                    </motion.div>

                    {/* Handwriting Title */}
                    <div className="overflow-hidden mb-4">
                      <motion.h1
                        className="font-script text-6xl md:text-8xl lg:text-9xl text-luxury-cream leading-none"
                        style={{ textShadow: '0 0 60px rgba(200,169,110,0.2)' }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={isActive ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        {slide.title}
                      </motion.h1>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                      className="text-luxury-text/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.9, delay: 0.8 }}
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.9, delay: 1.1 }}
                    >
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to book a stay at Estilo Mansa, Lakkidi.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary group"
                      >
                        <MessageCircle size={16} />
                        <span>{slide.ctaTextPrimary || 'Book Now'}</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </a>
                      <Link to="/rooms" className="btn-outline group">
                        <span>{slide.ctaTextSecondary || 'Explore Rooms'}</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Slide Counter */}
                <motion.div
                  className="absolute bottom-8 right-8 md:right-20 z-10 text-right"
                  initial={{ opacity: 0 }}
                  animate={isActive ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-luxury-gold font-serif text-2xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-luxury-text/30 text-sm"> / {String(slides.length).padStart(2, '0')}</span>
                </motion.div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      <div className="hero-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 hover:border-luxury-gold/60 hover:text-luxury-gold cursor-pointer transition-all duration-300 backdrop-blur-sm">
        <ChevronLeft size={20} />
      </div>
      <div className="hero-next absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 hover:border-luxury-gold/60 hover:text-luxury-gold cursor-pointer transition-all duration-300 backdrop-blur-sm">
        <ChevronRight size={20} />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-bg to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
