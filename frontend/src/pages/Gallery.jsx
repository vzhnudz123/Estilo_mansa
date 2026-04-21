import React from 'react';

// Explicitly importing images
import img13 from '../assets/IMG_8813.jpeg';
import img14 from '../assets/IMG_8814.jpeg';
import img15 from '../assets/IMG_8815.jpeg';
import img16 from '../assets/IMG_8816.jpeg';
import img17 from '../assets/IMG_8817.jpeg';
import img18 from '../assets/IMG_8818.jpeg';
import img19 from '../assets/IMG_8819.jpeg';
import img20 from '../assets/IMG_8820.jpeg';
import img21 from '../assets/IMG_8821.jpeg';
import img22 from '../assets/IMG_8822.jpeg';
import img23 from '../assets/IMG_8823.jpeg';
import img24 from '../assets/IMG_8824.jpeg';
import img25 from '../assets/IMG_8825.jpeg';

const Gallery = () => {
  // Organizing the extracted images into structured sections
  const gallerySections = [
    {
      title: "The Property & Outdoors",
      description: "Explore the exterior elegance and the lush green surroundings of Lakkidi.",
      images: [img13, img14, img15, img16, img17]
    },
    {
      title: "Living Spaces & Comfort",
      description: "Step inside our carefully curated interiors designed for absolute relaxation.",
      images: [img18, img19, img20, img21]
    },
    {
      title: "Details & Views",
      description: "The little things that make your stay at Estilo Mansa unforgettable.",
      images: [img22, img23, img24, img25]
    }
  ];

  return (
    <div className="bg-luxury-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-luxury-dark">Our Gallery</h1>
          <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            A visual journey through Estilo Mansa, showcasing the perfect blend of modern luxury and Wayanad's untamed natural beauty.
          </p>
        </div>

        {/* Dynamic Sections Loop */}
        <div className="space-y-24">
          {gallerySections.map((section, idx) => (
            <div key={idx} className="scroll-mt-24">
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-bold text-luxury-dark mb-3">{section.title}</h2>
                <p className="text-gray-600 text-lg">{section.description}</p>
              </div>

              {/* Masonry or Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.images.map((src, imgIdx) => (
                  <div 
                    key={imgIdx} 
                    className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-gray-200
                      ${imgIdx === 0 && section.images.length % 2 !== 0 ? 'md:col-span-2 lg:col-span-2 h-96' : 'h-72'}
                    `}
                  >
                    <img 
                      src={src} 
                      alt={`${section.title} - ${imgIdx + 1}`} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Gallery;
