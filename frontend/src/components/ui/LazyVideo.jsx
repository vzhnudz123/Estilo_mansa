import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
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
  posterObjectFit = 'cover',
  showButtonLabel = true,
  showCenterPlaybackButton = false,
  children,
}) => {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (!hasStarted || !videoRef.current) return undefined;

    const video = videoRef.current;

    video.play().catch(() => {
      setIsPlaying(false);
    });

    return () => {
      video.pause();
    };
  }, [hasStarted, src]);

  const handleStart = () => {
    setHasStarted(true);
    setHasEnded(false);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (hasEnded) {
      video.currentTime = 0;
      setHasEnded(false);
      video.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    if (video.paused) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    video.pause();
  };

  const centerButtonLabel = hasEnded ? 'Replay video' : isPlaying ? 'Pause video' : buttonLabel;

  return (
    <div className={`relative ${className}`}>
      {hasStarted ? (
        <>
          <video
            ref={videoRef}
            src={src}
            playsInline
            loop={loop}
            muted={muted}
            controls={showCenterPlaybackButton ? false : controls}
            preload="metadata"
            className={videoClassName}
            onPlay={() => {
              setIsPlaying(true);
              setHasEnded(false);
            }}
            onPause={() => {
              if (!videoRef.current?.ended) {
                setIsPlaying(false);
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              setHasEnded(true);
            }}
          />
          {showCenterPlaybackButton ? (
            <button
              type="button"
              onClick={togglePlayback}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/0"
              aria-label={centerButtonLabel}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/50 bg-black/45 text-luxury-gold backdrop-blur-md transition-transform duration-300 hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
                {isPlaying && !hasEnded ? (
                  <Pause size={22} fill="currentColor" />
                ) : (
                  <Play size={22} className="ml-1" fill="currentColor" />
                )}
              </span>
            </button>
          ) : null}
        </>
      ) : (
        <>
          <OptimizedImage
            src={poster}
            alt={alt}
            priority={priorityPoster}
            aspectRatio="unset"
            className="h-full w-full"
            objectFit={posterObjectFit}
          />
          <button
            type="button"
            onClick={handleStart}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/10 transition-colors hover:bg-black/20"
            aria-label={buttonLabel}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/50 bg-black/45 text-luxury-gold backdrop-blur-md transition-transform duration-300 hover:scale-105">
              <Play size={22} className="ml-1" fill="currentColor" />
            </span>
            {showButtonLabel ? (
              <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/88">
                {buttonLabel}
              </span>
            ) : null}
          </button>
        </>
      )}
      {children}
    </div>
  );
};

export default LazyVideo;
