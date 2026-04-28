import React from 'react';

const InstagramEmbed = ({ url }) => {
  // Extract ID and build embed URL
  const getEmbedUrl = (url) => {
    try {
      const u = new URL(url);
      const cleanPath = u.pathname.split('?')[0].replace(/\/$/, '');
      // Ensure it ends with /embed
      return `https://www.instagram.com${cleanPath}/embed/`;
    } catch {
      return url;
    }
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="w-full h-full bg-white relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-8 h-8 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
      </div>
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allowTransparency="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        frameBorder="0"
        scrolling="no"
        title="Instagram Reel"
        loading="lazy"
        onLoad={(e) => {
          e.target.style.opacity = '1';
        }}
        style={{ opacity: 0, transition: 'opacity 0.3s' }}
      />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="pointer-events-auto bg-black/60 backdrop-blur-md text-white/80 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-all"
        >
          Open in Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramEmbed;
