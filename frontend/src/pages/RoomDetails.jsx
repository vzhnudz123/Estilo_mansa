import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Images, Play, Video } from 'lucide-react';
import { LoadingScreen } from '../components/ui';
import { resolveMediaUrl } from '../utils/media';
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
    <div className="panel overflow-hidden rounded-[1.75rem] bg-black/80">
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
          <video src={resolveMediaUrl(url)} controls playsInline preload="metadata" className="h-full w-full object-cover" />
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
    room?.images?.length ? room.images.map(resolveMediaUrl) : [fallbackImage]
  ), [room]);

  if (loading) return null;
  if (!room) return (
    <div className="page-shell flex min-h-screen items-center justify-center">
      <div className="panel px-8 py-10 text-center">
        <p className="font-serif text-2xl text-cream/50">Room not found</p>
      </div>
    </div>
  );

  return (
    <div className="page-shell text-cream">
      <main className="page-container pt-28 pb-20 md:pt-32 md:pb-28">
        <button
          onClick={() => navigate('/rooms')}
          className="group mb-8 inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.025] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.36em] text-cream/45 transition-colors hover:border-gold/18 hover:text-gold"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
          Back to Rooms
        </button>

        <section className="page-hero-panel mb-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-4xl">
              <span className="eyebrow-pill mb-5">Room Gallery</span>
              <h1 className="premium-h2 text-ivory">{room.name}</h1>
              <p className="mt-8 text-lg font-light leading-relaxed text-cream/68 md:text-xl">
                {room.description}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <span className="status-pill justify-center px-4 py-3">
                <Images size={13} />
                {room.images?.length || 0} Images
              </span>
              <span className="status-pill justify-center px-4 py-3">
                <Video size={13} />
                {room.videos?.length || 0} Videos
              </span>
            </div>
          </div>
        </section>

        <section className="mb-20">
          {images.length > 1 ? (
            <Swiper
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              className="panel h-[50vh] overflow-hidden rounded-[2rem] md:h-[76vh]"
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
            <div className="panel h-[50vh] overflow-hidden rounded-[2rem] md:h-[76vh]">
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
