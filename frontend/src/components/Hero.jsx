import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import { resolveMediaUrl } from '../utils/media';
import Sideview from '../assets/Sideview.jpeg';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const WHATSAPP_NUMBER = '919876543210';
const FALLBACK_HERO_IMAGE = Sideview;

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await api.get('/hero/active');
        if (res.data?.length > 0) {
          setSlides(res.data);
        } else {
          // Fallback to general content if no hero slides are found
          const contentRes = await api.get('/content/home_hero');
          if (contentRes.data && contentRes.data.images?.length > 0) {
            setSlides([{
              title: contentRes.data.title || 'Welcome to Estilo Mansa',
              subtitle: contentRes.data.description || 'Your Luxury Sanctuary',
              images: contentRes.data.images,
              ctaTextPrimary: 'Book Now',
              ctaTextSecondary: 'Explore Rooms',
            }]);
          } else {
            setSlides([]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch hero data:', err);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  if (loading) return (
    <div className="h-screen w-full bg-luxury-bg flex items-center justify-center">
      <div className="spinner" />
    </div>
  );

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-bg">
      {slides.length > 0 ? (
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
                      src={resolveMediaUrl(slide.images?.[0]) || FALLBACK_HERO_IMAGE}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      onError={(event) => {
                        if (event.currentTarget.src !== FALLBACK_HERO_IMAGE) {
                          event.currentTarget.src = FALLBACK_HERO_IMAGE;
                        }
                      }}
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
                      <div className="mb-5 overflow-hidden">
                        <motion.h1
                          className="font-script text-5xl leading-none text-luxury-cream sm:text-6xl md:text-8xl lg:text-9xl"
                          style={{ textShadow: '0 0 60px rgba(200,169,110,0.2)' }}
                          initial={{ y: 100, opacity: 0 }}
                          animate={isActive ? { y: 0, opacity: 1 } : {}}
                          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          {slide?.title || 'Welcome'}
                        </motion.h1>
                      </div>

                      {/* Subtitle */}
                      <motion.p
                        className="mb-10 max-w-2xl text-base font-light leading-8 text-luxury-text/80 sm:text-lg md:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.8 }}
                      >
                        {slide?.subtitle}
                      </motion.p>

                      {/* CTAs */}
                      <motion.div
                        className="flex flex-col gap-4 sm:flex-row"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, delay: 1.1 }}
                      >
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I want to book a stay at Estilo Mansa')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary group"
                        >
                          <MessageCircle size={16} />
                          <span>{slide?.ctaTextPrimary || 'Book Now'}</span>
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </a>
                        <button 
                          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                          className="btn-outline group"
                        >
                          <span>{slide?.ctaTextSecondary || 'Explore'}</span>
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </button>
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
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-luxury-bg">
          <div className="text-center">
            <h2 className="font-serif text-4xl text-luxury-cream">Welcome to Estilo Mansa</h2>
            <p className="text-luxury-text/60 mt-4">Waiting for your beautiful content...</p>
          </div>
        </div>
      )}

      {slides.length > 1 && (
        <>
          {/* Navigation */}
          <div className="hero-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 hover:border-luxury-gold/60 hover:text-luxury-gold cursor-pointer transition-all duration-300 backdrop-blur-sm">
            <ChevronLeft size={20} />
          </div>
          <div className="hero-next absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 hover:border-luxury-gold/60 hover:text-luxury-gold cursor-pointer transition-all duration-300 backdrop-blur-sm">
            <ChevronRight size={20} />
          </div>
        </>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-bg to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
