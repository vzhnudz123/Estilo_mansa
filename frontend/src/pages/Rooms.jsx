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

  if (loading) return null;

  return (
    <div className="page-shell text-cream">
      <section className="page-hero">
        <motion.div
          className="page-hero-panel max-w-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="eyebrow-pill mb-5">Rooms</span>
              <h1 className="premium-h2 text-ivory">Room gallery crafted around the view</h1>
              <p className="mt-6 max-w-2xl text-base font-light leading-8 text-cream/62 md:text-lg">
                Explore the full visual story of each room, from quiet morning light to the media-rich details curated by the Estilo Mansa team.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="panel-soft px-4 py-4">
                <p className="section-label mb-2">What you see</p>
                <p className="text-sm leading-7 text-cream/56">Every card blends gallery images, video previews, and descriptive room highlights.</p>
              </div>
              <div className="panel-soft px-4 py-4">
                <p className="section-label mb-2">Best experience</p>
                <p className="text-sm leading-7 text-cream/56">Browse on mobile or desktop without layout jumps, crop issues, or overflow.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="page-container pb-16 md:pb-24">
        {rooms.length === 0 ? (
          <div className="panel flex min-h-[340px] items-center justify-center border-dashed text-center">
            <p className="font-serif text-2xl text-cream/40">No rooms added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:gap-10">
            {rooms.map((room, index) => {
              const images = room.images?.length ? room.images : [fallbackImage];
              const hasVideo = room.videos?.length > 0;

              return (
                <ScrollReveal key={room._id} delay={index * 90}>
                  <Link
                    to={`/rooms/${room._id}`}
                    className="group panel card-hover grid overflow-hidden lg:grid-cols-[1.18fr_0.82fr]"
                  >
                    <div className="relative min-h-[320px] overflow-hidden sm:min-h-[400px] md:min-h-[520px]">
                      <img
                        src={images[0]}
                        alt={room.name}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-black/10 to-transparent" />
                      <div className="absolute left-5 right-5 top-5 flex flex-wrap justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
                        <span className="status-pill">
                          Room {String(index + 1).padStart(2, '0')}
                        </span>
                        {hasVideo && (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-obsidian/60 text-gold backdrop-blur-md">
                            <Play size={18} fill="currentColor" />
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-5 left-5 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-ivory/80 sm:bottom-6 sm:left-6">
                        <span className="inline-flex items-center gap-2 rounded-full bg-obsidian/55 px-4 py-2 backdrop-blur-md">
                          <Images size={13} />
                          {room.images?.length || 0} Images
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-obsidian/55 px-4 py-2 backdrop-blur-md">
                          <Video size={13} />
                          {room.videos?.length || 0} Videos
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12">
                      <div>
                        <span className="section-label mb-4 block">Signature Stay</span>
                        <h2 className="font-serif text-3xl text-ivory sm:text-4xl md:text-5xl xl:text-6xl">{room.name}</h2>
                        <p className="mt-6 line-clamp-5 text-base font-light leading-8 text-cream/65 md:text-lg">
                          {room.description}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold transition-all group-hover:gap-6 md:mt-10">
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
      </section>
    </div>
  );
};

export default Rooms;
