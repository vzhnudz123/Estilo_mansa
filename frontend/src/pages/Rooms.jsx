import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Images, Play, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { LoadingScreen, ScrollReveal } from '../components/ui';

const fallbackImage = 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=1200';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rooms')
      .then(res => {
        if (Array.isArray(res.data)) {
          setRooms(res.data);
        } else {
          setRooms([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-obsidian pt-28 text-cream">
      <section className="px-6 pb-16 pt-14 md:px-12 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-14 max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label mb-6 block">Rooms</span>
            <h1 className="premium-h2 text-ivory">Room Gallery</h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-cream/60">
              Explore room images, videos, and details added by the Estilo Mansa admin team.
            </p>
          </motion.div>

          {rooms.length === 0 ? (
            <div className="border border-dashed border-white/10 py-24 text-center">
              <p className="font-serif text-2xl text-cream/40">No rooms added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10">
              {rooms.map((room, index) => {
                const images = room.images?.length ? room.images : [fallbackImage];
                const hasVideo = room.videos?.length > 0;

                return (
                  <ScrollReveal key={room._id} delay={index * 90}>
                    <Link
                      to={`/rooms/${room._id}`}
                      className="group grid overflow-hidden rounded-[2px] border border-white/10 bg-forest/40 shadow-[0_40px_120px_rgba(0,0,0,0.35)] transition-colors duration-500 hover:border-gold/35 lg:grid-cols-[1.25fr_0.75fr]"
                    >
                      <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px]">
                        <img
                          src={images[0]}
                          alt={room.name}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-ivory/80">
                          <span className="inline-flex items-center gap-2 rounded-full bg-obsidian/55 px-4 py-2 backdrop-blur-md">
                            <Images size={13} />
                            {room.images?.length || 0} Images
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full bg-obsidian/55 px-4 py-2 backdrop-blur-md">
                            <Video size={13} />
                            {room.videos?.length || 0} Videos
                          </span>
                        </div>
                        {hasVideo && (
                          <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/35 bg-obsidian/60 text-gold backdrop-blur-md">
                            <Play size={18} fill="currentColor" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between p-8 md:p-12">
                        <div>
                          <span className="section-label mb-5 block">Room {String(index + 1).padStart(2, '0')}</span>
                          <h2 className="font-serif text-4xl text-ivory md:text-6xl">{room.name}</h2>
                          <p className="mt-7 line-clamp-5 text-base font-light leading-relaxed text-cream/65 md:text-lg">
                            {room.description}
                          </p>
                        </div>

                        <div className="mt-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold transition-all group-hover:gap-6">
                          View Images & Videos
                          <ArrowRight size={15} />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rooms;
