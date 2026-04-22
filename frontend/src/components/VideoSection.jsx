import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import api from '../api/axios';

// Default YouTube Shorts provided by client
const DEFAULT_VIDEOS = [
  { _id: '1', url: 'https://youtube.com/shorts/DU9_gJnNOmY', title: 'Estilo Mansa — The Experience' },
  { _id: '2', url: 'https://youtube.com/shorts/7HYFiF1lwKE', title: 'Misty Mornings at Lakkidi' },
];

// Convert any YouTube URL/short to embed URL
const toEmbedUrl = (url) => {
  try {
    const u = new URL(url);
    let id = '';
    if (u.pathname.includes('/shorts/')) {
      id = u.pathname.split('/shorts/')[1].split('/')[0].split('?')[0];
    } else if (u.searchParams.get('v')) {
      id = u.searchParams.get('v');
    } else {
      id = u.pathname.split('/').pop();
    }
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
  } catch {
    return '';
  }
};

const VideoCard = ({ video, index }) => {
  const [active, setActive] = useState(false);
  const embedUrl = toEmbedUrl(video.url);

  return (
    <motion.div
      className="flex-shrink-0 w-[260px] md:w-[300px]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* 9:16 aspect ratio card */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-luxury-gold/10"
        style={{ aspectRatio: '9/16' }}
      >
        {active ? (
          <iframe
            src={`${embedUrl}&autoplay=1&mute=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          />
        ) : (
          <>
            {/* Thumbnail via YouTube */}
            <img
              src={`https://img.youtube.com/vi/${embedUrl.split('/embed/')[1]?.split('?')[0]}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            {/* Play button */}
            <button
              onClick={() => setActive(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 group"
              aria-label="Play video"
            >
              <div className="w-16 h-16 rounded-full border-2 border-luxury-gold/70 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:border-luxury-gold group-hover:bg-luxury-gold/20 transition-all duration-300 group-hover:scale-110">
                <Play size={24} fill="#c8a96e" className="text-luxury-gold ml-1" />
              </div>
              <span className="text-white/80 text-xs tracking-widest uppercase font-medium">Watch</span>
            </button>
          </>
        )}
      </div>

      {video.title && (
        <p className="text-luxury-text/60 text-sm text-center mt-4 leading-relaxed">{video.title}</p>
      )}
    </motion.div>
  );
};

const VideoSection = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get('/videos/active')
      .then(res => {
        if (res.data?.length > 0) setVideos(res.data);
        else setVideos(DEFAULT_VIDEOS);
      })
      .catch(() => setVideos(DEFAULT_VIDEOS));
  }, []);

  return (
    <section className="py-24 md:py-36 bg-luxury-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-4">Estilo Mansa Reels</p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream leading-tight">
            Feel It{' '}
            <em className="font-script text-luxury-gold not-italic">Before You Arrive</em>
          </h2>
          <p className="text-luxury-text/60 mt-4 max-w-lg mx-auto leading-relaxed">
            A glimpse into the mornings, the mist, and the magic that awaits.
          </p>
        </motion.div>

        {/* Horizontal scrolling video cards — centred when few */}
        <div className="flex gap-8 justify-center flex-wrap md:flex-nowrap md:overflow-x-auto md:pb-4 md:justify-start">
          {videos.map((v, i) => (
            <VideoCard key={v._id || i} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
