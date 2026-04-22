import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Images, Play, Video } from 'lucide-react';
import { LoadingScreen } from '../components/ui';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fallbackImage = 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=1600';

const isYouTube = (url) => url.includes('youtube.com') || url.includes('youtu.be');

const toYouTubeEmbed = (url) => {
  try {
    const parsed = new URL(url);
    let id = '';
    if (parsed.hostname.includes('youtu.be')) id = parsed.pathname.replace('/', '');
    else if (parsed.pathname.includes('/shorts/')) id = parsed.pathname.split('/shorts/')[1].split('/')[0];
    else if (parsed.searchParams.get('v')) id = parsed.searchParams.get('v');
    else if (parsed.pathname.includes('/embed/')) id = parsed.pathname.split('/embed/')[1].split('/')[0];
    return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1` : '';
  } catch {
    return '';
  }
};

const RoomVideo = ({ url, title }) => {
  const embed = isYouTube(url) ? toYouTubeEmbed(url) : '';

  return (
    <div className="overflow-hidden rounded-[2px] border border-white/10 bg-black shadow-2xl">
      <div className="aspect-video">
        {embed ? (
          <iframe
            src={embed}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <video src={url} controls playsInline preload="metadata" className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  );
};

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/rooms/${id}`)
      .then(res => setRoom(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const images = useMemo(() => (
    room?.images?.length ? room.images : [fallbackImage]
  ), [room]);

  if (loading) return <LoadingScreen />;
  if (!room) return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian">
      <p className="font-serif text-2xl text-cream/50">Room not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-obsidian pt-28 text-cream">
      <main className="mx-auto max-w-7xl px-6 pb-28 md:px-12">
        <button
          onClick={() => navigate('/rooms')}
          className="group mb-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.36em] text-cream/45 transition-colors hover:text-gold"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
          Back to Rooms
        </button>

        <section className="mb-14 max-w-4xl">
          <span className="section-label mb-6 block">Room Gallery</span>
          <h1 className="premium-h2 text-ivory">{room.name}</h1>
          <p className="mt-8 text-lg font-light leading-relaxed text-cream/68 md:text-xl">
            {room.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-gold/80">
            <span className="inline-flex items-center gap-2 border border-gold/20 px-4 py-2">
              <Images size={13} />
              {room.images?.length || 0} Images
            </span>
            <span className="inline-flex items-center gap-2 border border-gold/20 px-4 py-2">
              <Video size={13} />
              {room.videos?.length || 0} Videos
            </span>
          </div>
        </section>

        <section className="mb-20">
          {images.length > 1 ? (
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="h-[60vh] overflow-hidden rounded-[2px] border border-white/10 shadow-[0_50px_130px_rgba(0,0,0,0.48)] md:h-[76vh]"
            >
              {images.map((img, index) => (
                <SwiperSlide key={img + index}>
                  <img
                    src={img}
                    alt={`${room.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="h-[60vh] overflow-hidden rounded-[2px] border border-white/10 shadow-[0_50px_130px_rgba(0,0,0,0.48)] md:h-[76vh]">
              <img src={images[0]} alt={room.name} className="h-full w-full object-cover" />
            </div>
          )}
        </section>

        {room.videos?.length > 0 && (
          <section>
            <div className="mb-8 flex items-center gap-3">
              <Play size={18} className="text-gold" fill="currentColor" />
              <h2 className="font-serif text-3xl text-ivory">Room Videos</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {room.videos.map((url, index) => (
                <RoomVideo key={url + index} url={url} title={`${room.name} video ${index + 1}`} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default RoomDetails;
