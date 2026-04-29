import React, { useEffect, useState, useRef } from 'react';
import { Instagram, Youtube } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  const videoType = video.type || (
    video.url?.includes('youtube') || video.url?.includes('youtu.be') ? 'youtube' : 'instagram'
  );
  const isInstagram = videoType === 'instagram';

  // Scroll reveal
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Skeleton delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
          <div className="w-full h-full overflow-y-auto">
            <InstagramEmbed url={video.url} />
          </div>
        ) : (
          <YouTubeEmbed url={video.url} title={video.title} />
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
          const fetched = res.data.map(v => ({
            ...v,
            title: v.title || '',
            type: v.type || (
              v.url?.includes('youtube') || v.url?.includes('youtu.be') ? 'youtube' : 'instagram'
            ),
          }));

          const filtered = fetched.filter(v =>
            !v.title.toLowerCase().includes('jeep')
          );

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

  // Section header reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          obs.unobserve(el);
        }
      },
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