import React, { useEffect } from 'react';

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    // Check if script is already in document
    let script = document.getElementById('instagram-embed-script');
    
    if (!script) {
      script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = "https://www.instagram.com/embed.js";
      script.id = "instagram-embed-script";
      document.body.appendChild(script);
    }

    // Process embeds
    const process = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    process();
    // Also try after a short delay to ensure DOM is ready
    const timer = setTimeout(process, 500);
    return () => clearTimeout(timer);
  }, [url]);

  // Handle various instagram URL formats
  const getEmbedUrl = (url) => {
    try {
      const u = new URL(url);
      const cleanPath = u.pathname.split('?')[0].replace(/\/$/, '');
      return `https://www.instagram.com${cleanPath}/`;
    } catch {
      return url;
    }
  };

  const finalUrl = getEmbedUrl(url);

  return (
    <div className="w-full h-full flex flex-col items-start justify-start bg-white overflow-y-auto hide-scrollbar">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={finalUrl}
        data-instgrm-version="14"
        style={{ 
          width: '100%',
          margin: '0',
          padding: '0',
          border: 'none',
          minWidth: '100%'
        }}
      >
        <div className="p-4 flex flex-col items-center justify-center min-h-[400px]">
          <a
            href={finalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#3897f0] text-sm font-semibold"
          >
            View on Instagram
          </a>
        </div>
      </blockquote>
    </div>
  );
};

export default InstagramEmbed;
