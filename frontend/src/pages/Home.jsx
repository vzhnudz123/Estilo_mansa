import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Tag } from 'lucide-react';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [content, setContent] = useState({
    home_hero: null,
    home_features: null,
    home_testimonials: null
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [eventsRes, heroRes, featuresRes, testRes] = await Promise.allSettled([
          api.get('/events/active'),
          api.get('/content/home_hero'),
          api.get('/content/home_features'),
          api.get('/content/home_testimonials')
        ]);

        if (eventsRes.status === 'fulfilled') setEvents(eventsRes.value.data);
        
        setContent({
          home_hero: heroRes.status === 'fulfilled' ? heroRes.value.data : null,
          home_features: featuresRes.status === 'fulfilled' ? featuresRes.value.data : null,
          home_testimonials: testRes.status === 'fulfilled' ? testRes.value.data : null,
        });
      } catch (err) {
        console.error("Failed to fetch dynamic content", err);
      }
    };
    fetchHomeData();
  }, []);

  const heroImage = content.home_hero?.images?.[0] || "";

  return (
    <div>
      {/* Dynamic Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-luxury-dark">
        <div className="absolute inset-0 w-full h-full">
          {heroImage && (
            <img 
              src={heroImage} 
              alt={content.home_hero?.title || "Estilo Mansa"} 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl text-white font-bold mb-6 drop-shadow-md">
            {content.home_hero?.title || <>Estilo <span className="text-luxury-gold italic">Mansa</span></>}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-4 font-light max-w-2xl mx-auto whitespace-pre-line">
            {content.home_hero?.description || "Your Luxury Sanctuary in Lakkidi, Wayanad"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link to="/rooms" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">Explore Rooms</Link>
            <Link to="/gallery" className="btn-outline bg-white/10 border-white text-white w-full sm:w-auto text-lg px-8 py-4 hover:bg-white hover:text-luxury-dark">View Gallery</Link>
          </div>
        </div>
      </section>

      {/* Dynamic Offers/Events Banner Loop */}
      {events.length > 0 && (
        <section className="bg-luxury-gold text-white overflow-hidden py-4 shadow-xl relative z-20">
          <div className="flex animate-[pulse_4s_ease-in-out_infinite]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag size={24} className="animate-bounce" />
                <h3 className="text-xl font-bold uppercase tracking-wider">{events[0].title}</h3>
              </div>
              <p className="text-md font-medium">{events[0].description}</p>
              {events[0].offerPrice && (
                <div className="bg-white text-luxury-gold px-4 py-1 rounded-full font-bold">
                  Special: ${events[0].offerPrice}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Featured Section */}
      <section className="py-24 bg-luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{content.home_features?.title || "A Stay Like No Other"}</h2>
            <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg whitespace-pre-line">
              {content.home_features?.description || "Indulge in spacious, beautifully designed accommodations in the heart of Wayanad's mist-covered hills."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Dynamic content rendering implies iterating through metadata or hardcoding layout for missing structure. Using default fallback for architecture safety. */}
            <div className="text-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-20 h-20 mx-auto bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center text-3xl mb-6">🛏️</div>
              <h3 className="text-2xl font-bold mb-3">{content.home_features?.metadata?.feat1_title || "Premium Comfort"}</h3>
              <p className="text-gray-600">{content.home_features?.metadata?.feat1_desc || "Sink into plush, high-thread-count linens and custom mattresses."}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-20 h-20 mx-auto bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center text-3xl mb-6">🌿</div>
              <h3 className="text-2xl font-bold mb-3">{content.home_features?.metadata?.feat2_title || "Wayanad Nature"}</h3>
              <p className="text-gray-600">{content.home_features?.metadata?.feat2_desc || "Surrounded by the lush greenery of Lakkidi, offering a quiet sanctuary."}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition">
              <div className="w-20 h-20 mx-auto bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center text-3xl mb-6">☕</div>
              <h3 className="text-2xl font-bold mb-3">{content.home_features?.metadata?.feat3_title || "Local Cuisines"}</h3>
              <p className="text-gray-600">{content.home_features?.metadata?.feat3_desc || "Savor exquisite authentic Kerala meals prepared locally."}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-luxury-dark">{content.home_testimonials?.title || "Guest Experiences"}</h2>
          <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full mb-16"></div>
          
          <div className="bg-luxury-bg p-10 rounded-3xl relative">
            <span className="absolute -top-6 left-10 text-6xl text-luxury-gold opacity-50">"</span>
            <p className="text-2xl italic text-gray-700 mb-8 relative z-10 leading-relaxed whitespace-pre-line">
              {content.home_testimonials?.description || "Absolutely mesmerizing property in Lakkidi. The mist rolls right into the balcony, and the hospitality is top-notch. Highly recommended for couples looking for a peaceful luxury retreat in Wayanad!"}
            </p>
            <div>
              <h4 className="font-bold text-lg text-luxury-dark">{content.home_testimonials?.metadata?.author || "Arjun Nair"}</h4>
              <p className="text-luxury-gold text-sm font-medium">Verified Guest</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
