import React, { useEffect, useState, useRef } from 'react';
import { Play, Instagram, Youtube } from 'lucide-react';
import api from '../api/axios';
import YouTubeEmbed from './YouTubeEmbed';
import InstagramEmbed from './InstagramEmbed';

const DEFAULT_VIDEOS = [
  { _id: '1', url: 'https://youtube.com/shorts/DU9_gJnNOmY', title: 'Estilo Mansa — The Experience', type: 'youtube' },
  { _id: '2', url: 'https://youtube.com/shorts/7HYFiF1lwKE', title: 'Misty Mornings at Lakkidi', type: 'youtube' },
];

const SkeletonLoader = () => (
  <div className="w-full h-full bg-white/5 animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 rounded-full bg-white/10" />
  </div>
);

const VideoCard = ({ video, index }) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  // Fallback for older videos without type field
  const videoType = video.type || (video.url?.includes('youtube') || video.url?.includes('youtu.be') ? 'youtube' : 'instagram');
  const isInstagram = videoType === 'instagram';

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

  useEffect(() => {
    // Simulating a small delay for skeleton
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getYTThumb = (url) => {
    try {
      const u = new URL(url);
      let id = '';
      if (u.pathname.includes('/shorts/')) id = u.pathname.split('/shorts/')[1].split('/')[0].split('?')[0];
      else if (u.searchParams.get('v')) id = u.searchParams.get('v');
      else id = u.pathname.split('/').pop();
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    } catch { return null; }
  };

  const getInstaThumb = (url) => {
    try {
      const clean = url.split('?')[0].replace(/\/$/, '');
      return `${clean}/media/?size=l`;
    } catch { return null; }
  };

  const thumbUrl = !isInstagram ? getYTThumb(video.url) : getInstaThumb(video.url);

  return (
    <div
      ref={ref}
      className="fade-up flex-shrink-0 w-[280px] md:w-[320px]"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-luxury-gold/10 group bg-black"
        style={{ aspectRatio: '9/16' }}
      >
        {loading ? (
          <SkeletonLoader />
        ) : isInstagram ? (
          <InstagramEmbed url={video.url} />
        ) : active ? (
          <YouTubeEmbed url={video.url} title={video.title} />
        ) : (
          <>
            <div className="w-full h-full relative">
              <img
                src={thumbUrl}
                alt={video.title}
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full flex-col items-center justify-center bg-gradient-to-br from-black/40 to-black/80 gap-4">
                <Youtube size={48} className="text-red-600/30" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest">
                  YouTube Video
                </span>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <button
              onClick={() => setActive(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
              aria-label="Play video"
            >
              <div className="w-16 h-16 rounded-full border-2 border-luxury-gold/60 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:border-luxury-gold group-hover:bg-luxury-gold/20 transition-all duration-400 group-hover:scale-110">
                <Youtube size={26} className="text-luxury-gold" />
              </div>
              <span className="text-white/70 text-[10px] tracking-[0.3em] uppercase">
                Watch Short
              </span>
            </button>
          </>
        )}
      </div>
      {video.title && (
        <p className="text-luxury-text/55 text-xs text-center mt-4 leading-relaxed px-2 font-medium tracking-wide">
          {video.title}
        </p>
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
        if (Array.isArray(res.data) && res.data.length > 0) {
          // Safety: ensure each video has a valid type and title
          const fetched = res.data.map(v => ({
            ...v,
            title: v.title || '',
            type: v.type || (v.url?.includes('youtube') || v.url?.includes('youtu.be') ? 'youtube' : 'instagram')
          }));
          
          // Filter out jeep experience videos (handled in JeepExperience component)
          const filtered = fetched.filter(v => !v.title.toLowerCase().includes('jeep'));
          
          // If we have videos in the DB, show them. Otherwise fallback to defaults.
          setVideos(filtered.length > 0 ? filtered : DEFAULT_VIDEOS);
        } else {
          setVideos(DEFAULT_VIDEOS);
        }
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
        setVideos(DEFAULT_VIDEOS);
      });
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
    <section className="py-24 md:py-36 bg-luxury-surface overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={sectionRef} className="text-center mb-16 fade-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-luxury-gold/40" />
            <span className="section-label">Estilo Mansa Stories</span>
            <div className="w-12 h-px bg-luxury-gold/40" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream leading-tight">
            Feel It{' '}
            <em className="font-script text-luxury-gold not-italic">Before You Arrive</em>
          </h2>
          <p className="text-luxury-text/55 mt-4 max-w-md mx-auto leading-relaxed text-sm">
            Explore our curated collection of moments, misty mornings, and cinematic stories from the heart of Wayanad.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 px-4 hide-scrollbar justify-center md:justify-start">
          {videos.map((v, i) => (
            <VideoCard key={v._id || i} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
