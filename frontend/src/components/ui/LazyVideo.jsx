import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const LazyVideo = ({
  src,
  poster,
  alt,
  className = '',
  videoClassName = 'h-full w-full object-cover',
  buttonLabel = 'Play video',
  loop = false,
  muted = false,
  controls = false,
  priorityPoster = false,
  children,
}) => {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted || !videoRef.current) return undefined;

    const video = videoRef.current;

    video.play().catch(() => {});

    return () => {
      video.pause();
    };
  }, [hasStarted, src]);

  return (
    <div className={`relative ${className}`}>
      {hasStarted ? (
        <video
          ref={videoRef}
          src={src}
          playsInline
          loop={loop}
          muted={muted}
          controls={controls}
          preload="metadata"
          className={videoClassName}
        />
      ) : (
        <>
          <OptimizedImage
            src={poster}
            alt={alt}
            priority={priorityPoster}
            aspectRatio="unset"
            className="h-full w-full"
          />
          <button
            type="button"
            onClick={() => setHasStarted(true)}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/10 transition-colors hover:bg-black/20"
            aria-label={buttonLabel}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/50 bg-black/45 text-luxury-gold backdrop-blur-md transition-transform duration-300 hover:scale-105">
              <Play size={22} className="ml-1" fill="currentColor" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/88">
              {buttonLabel}
            </span>
          </button>
        </>
      )}
      {children}
    </div>
  );
};

export default LazyVideo;
