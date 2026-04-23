import React, { useEffect, useState, useRef } from 'react';
import { Play } from 'lucide-react';
import api from '../api/axios';

const DEFAULT_VIDEOS = [
  { _id: '1', url: 'https://youtube.com/shorts/DU9_gJnNOmY', title: 'Estilo Mansa — The Experience' },
  { _id: '2', url: 'https://youtube.com/shorts/7HYFiF1lwKE', title: 'Misty Mornings at Lakkidi' },
];

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
  const ref = useRef(null);
  const embedUrl = toEmbedUrl(video.url);
  const thumbId = embedUrl.split('/embed/')[1]?.split('?')[0];

  // Scroll reveal
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="fade-up flex-shrink-0 w-[250px] md:w-[280px]"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-luxury-gold/10 group"
        style={{ aspectRatio: '9/16' }}
      >
        {active ? (
          <iframe
            src={`${embedUrl}&autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${thumbId}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            <button
              onClick={() => setActive(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              aria-label="Play video"
            >
              <div className="w-16 h-16 rounded-full border-2 border-luxury-gold/60 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:border-luxury-gold group-hover:bg-luxury-gold/20 transition-all duration-400 group-hover:scale-110">
                <Play size={22} fill="#c8a96e" className="text-luxury-gold ml-1" />
              </div>
              <span className="text-white/70 text-[10px] tracking-[0.3em] uppercase">Watch</span>
            </button>
          </>
        )}
      </div>
      {video.title && (
        <p className="text-luxury-text/55 text-xs text-center mt-4 leading-relaxed px-2">{video.title}</p>
      )}
    </div>
  );
};

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    api.get('/videos/active')
      .then(res => {
        const fetched = Array.isArray(res.data) && res.data.length > 0 ? res.data : DEFAULT_VIDEOS;
        const filtered = fetched.filter(v => {
          const isYT = v.url.includes('youtube.com') || v.url.includes('youtu.be');
          const isJeep = v.title?.toLowerCase().includes('jeep');
          return isYT && !isJeep;
        });
        setVideos(filtered.length > 0 ? filtered : DEFAULT_VIDEOS);
      })
      .catch(() => setVideos(DEFAULT_VIDEOS));
  }, []);

  // Reveal section header
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-36 bg-luxury-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={sectionRef} className="text-center mb-16 fade-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-luxury-gold/40" />
            <span className="section-label">Estilo Mansa Reels</span>
            <div className="w-12 h-px bg-luxury-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream leading-tight">
            Feel It{' '}
            <em className="font-script text-luxury-gold not-italic">Before You Arrive</em>
          </h2>
          <p className="text-luxury-text/55 mt-4 max-w-md mx-auto leading-relaxed text-sm">
            A glimpse into the mornings, the mist, and the magic that awaits.
          </p>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar justify-center md:justify-start">
          {videos.map((v, i) => (
            <VideoCard key={v._id || i} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
