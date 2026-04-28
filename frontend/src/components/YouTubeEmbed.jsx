import React from 'react';

const YouTubeEmbed = ({ url, title }) => {
  const getYouTubeId = (url) => {
    try {
      const u = new URL(url);
      if (u.pathname.includes('/shorts/')) return u.pathname.split('/shorts/')[1].split('/')[0].split('?')[0];
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      return u.pathname.split('/').pop();
    } catch { return null; }
  };

  const videoId = getYouTubeId(url);

  if (!videoId) return null;

  return (
    <div className="w-full h-full relative group">
      <iframe
        className="w-full h-full absolute inset-0"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
        title={title || "YouTube video player"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
      {/* Overlay to catch clicks and prevent navigation if needed, or just for styling */}
      <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:bg-black/10 transition-colors duration-500" />
    </div>
  );
};

export default YouTubeEmbed;
