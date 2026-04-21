import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Tag, Star, ArrowRight, MapPin, Wind, Coffee, Wifi } from 'lucide-react';
import api from '../api/axios';
import Hero from '../components/Hero';
import { ScrollReveal, SectionHeader } from '../components/ui';

const WHATSAPP_NUMBER = '919876543210';

// ── Parallax section image ───────────────────────────────────────────────────
const ParallaxImage = ({ src, alt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-3xl">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.15 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// ── Marquee strip ───────────────────────────────────────────────────────────
const MarqueeStrip = ({ events }) => {
  const items = [...events, ...events];
  return (
    <div className="relative overflow-hidden py-5 border-y border-luxury-gold/10 bg-luxury-surface">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {items.map((ev, i) => (
            <span key={i} className="inline-flex items-center gap-4 mr-16 text-sm text-luxury-text/60">
              <Tag size={12} className="text-luxury-gold" />
              <span className="font-medium text-luxury-cream">{ev.title}</span>
              {ev.offerPrice && (
                <span className="text-luxury-gold text-xs tracking-widest">₹{ev.offerPrice}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Feature card ────────────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <ScrollReveal delay={delay}>
    <div className="group p-8 rounded-3xl glass-card hover:border-luxury-gold/25 transition-all duration-500 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.15), rgba(200,169,110,0.05))' }}>
        <Icon size={24} className="text-luxury-gold" />
      </div>
      <h3 className="font-serif text-xl text-luxury-cream mb-3">{title}</h3>
      <p className="text-luxury-text/60 text-sm leading-relaxed">{desc}</p>
    </div>
  </ScrollReveal>
);

// ── Testimonial card ────────────────────────────────────────────────────────
const TestimonialCard = ({ text, author, rating = 5, delay }) => (
  <ScrollReveal delay={delay}>
    <div className="p-8 rounded-3xl glass-card h-full flex flex-col">
      <div className="flex gap-1 mb-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} fill="#c8a96e" className="text-luxury-gold" />
        ))}
      </div>
      <p className="text-luxury-text/80 italic leading-relaxed flex-grow text-sm mb-8">
        "{text}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-luxury-green flex items-center justify-center text-luxury-gold font-serif text-sm">
          {author[0]}
        </div>
        <div>
          <p className="text-luxury-cream text-sm font-medium">{author}</p>
          <p className="text-luxury-text/40 text-xs tracking-widest uppercase">Verified Guest</p>
        </div>
      </div>
    </div>
  </ScrollReveal>
);

// ─── MAIN HOME ──────────────────────────────────────────────────────────────
const Home = () => {
  const [events, setEvents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [content, setContent] = useState({});

  useEffect(() => {
    Promise.allSettled([
      api.get('/events/active'),
      api.get('/rooms'),
      api.get('/content/home_features'),
    ]).then(([evRes, rmRes, ctRes]) => {
      if (evRes.status === 'fulfilled') setEvents(evRes.value.data);
      if (rmRes.status === 'fulfilled') setRooms(rmRes.value.data.slice(0, 3));
      if (ctRes.status === 'fulfilled') setContent(ctRes.value.data);
    });
  }, []);

  const features = [
    {
      icon: MapPin,
      title: 'Lakkidi Mist Valley',
      desc: 'Nestled in the clouds at 700m above sea level — mornings here feel like nowhere else on earth.',
      delay: 0,
    },
    {
      icon: Coffee,
      title: 'Authentic Kerala Cuisine',
      desc: 'Farm-to-table meals with locally sourced ingredients, spices from our own garden.',
      delay: 100,
    },
    {
      icon: Wind,
      title: 'Nature Immersion',
      desc: 'Surrounded by 6 acres of forest, spice plantations, and the Wayanad Wildlife Corridor.',
      delay: 200,
    },
    {
      icon: Wifi,
      title: 'Premium Amenities',
      desc: 'High-speed WiFi, private balconies, heated water, concierge service, and more.',
      delay: 300,
    },
  ];

  const testimonials = [
    {
      text: "Absolutely mesmerising. The mist rolled right through our balcony every morning. The staff were extraordinary — warm, attentive, and genuinely passionate.",
      author: 'Priya & Rahul',
      rating: 5,
      delay: 0,
    },
    {
      text: "Estilo Mansa is exactly what Wayanad needed — a place where luxury and nature coexist perfectly. Every detail was thoughtfully curated.",
      author: 'Aakash Menon',
      rating: 5,
      delay: 100,
    },
    {
      text: "Woke up to misty valleys, sipped Kerala coffee on the balcony, and forgot the world. This is what a real getaway feels like.",
      author: 'Sujith & Family',
      rating: 5,
      delay: 200,
    },
  ];

  return (
    <div className="bg-luxury-bg overflow-hidden">
      {/* ── Hero ─────────────────────────── */}
      <Hero />

      {/* ── Events Marquee ───────────────── */}
      {events.length > 0 && <MarqueeStrip events={events} />}

      {/* ── About Section ────────────────── */}
      <section className="py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[520px] lg:h-[680px]">
              <ScrollReveal>
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200"
                  alt="Estilo Mansa Estate"
                />
              </ScrollReveal>
              {/* Floating glass card */}
              <ScrollReveal delay={200}>
                <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl max-w-[180px]">
                  <p className="gold-text font-script text-3xl mb-1">Est.</p>
                  <p className="text-luxury-cream font-serif text-xl">2020</p>
                  <div className="gold-divider" />
                  <p className="text-luxury-text/60 text-xs">Lakkidi, Wayanad</p>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex flex-col justify-center">
              <ScrollReveal>
                <p className="section-label mb-4">Our Story</p>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-cream leading-tight mb-8">
                  Where the Clouds<br />
                  <em className="font-script text-luxury-gold not-italic">Come to Rest</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-luxury-text/70 text-base leading-8 mb-6">
                  Perched at the edge of Lakkidi Pass, Estilo Mansa is more than a homestay — it is a dialogue between architecture and wilderness. Every stone, every timber, every open corridor was designed to frame the forest.
                </p>
                <p className="text-luxury-text/70 text-base leading-8 mb-10">
                  We invite you to slow down, breathe in the mist, and rediscover what rest truly means. No package tours. No rush. Just the valley, the birds, and you.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to inquire about Estilo Mansa.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group"
                  >
                    <MessageCircle size={15} />
                    <span>Reserve Your Stay</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link to="/gallery" className="btn-outline group">
                    <span>View Gallery</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────── */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-luxury-surface" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            label="The Experience"
            title="A Stay Like No Other"
            subtitle="Every detail of Estilo Mansa has been designed to balance natural luxury with the untouched beauty of the Wayanad highlands."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── Rooms Preview ────────────────── */}
      {rooms.length > 0 && (
        <section className="py-24 md:py-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeader
              label="Accommodations"
              title="Our Curated Spaces"
              subtitle="Thoughtfully designed rooms that open onto the forest canopy."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room, i) => (
                <ScrollReveal key={room._id} delay={i * 100}>
                  <Link to={`/rooms/${room._id}`} className="group block">
                    <div className="relative h-72 rounded-3xl overflow-hidden mb-5">
                      <img
                        src={room.images?.[0] || 'https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=800'}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                        <h3 className="font-serif text-xl text-luxury-cream">{room.name}</h3>
                        <span className="glass-card-light px-3 py-1 rounded-full text-luxury-gold text-sm font-medium">
                          ₹{room.price}<span className="text-white/50 text-xs">/night</span>
                        </span>
                      </div>
                    </div>
                    <p className="text-luxury-text/60 text-sm line-clamp-2 leading-relaxed px-1">{room.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-luxury-gold text-xs tracking-widest uppercase px-1 group-hover:gap-3 transition-all">
                      View Details <ArrowRight size={12} />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={300}>
              <div className="text-center mt-14">
                <Link to="/rooms" className="btn-outline group">
                  <span>View All Accommodations</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Divider Quote ─────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1800"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-luxury-dark/80" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="gold-text font-script text-7xl md:text-9xl opacity-10 absolute -top-8 left-1/2 -translate-x-1/2">"</p>
            <blockquote className="font-serif text-2xl md:text-4xl text-luxury-cream leading-relaxed italic">
              "Not all those who wander are lost — some are just checking into Estilo Mansa."
            </blockquote>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-12 bg-luxury-gold opacity-40" />
              <span className="section-label">Guest Diary</span>
              <div className="h-px w-12 bg-luxury-gold opacity-40" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Testimonials ─────────────────── */}
      <section className="py-24 md:py-32 bg-luxury-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            label="Guest Stories"
            title="Voices from the Valley"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => <TestimonialCard key={t.author} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="section-label mb-4">Begin Your Journey</p>
            <h2 className="font-serif text-4xl md:text-6xl text-luxury-cream mb-6 leading-tight">
              Ready to Escape<br />
              <span className="font-script text-luxury-gold">to the Mist?</span>
            </h2>
            <p className="text-luxury-text/60 max-w-xl mx-auto mb-10 leading-relaxed">
              Availability is limited. Message us directly on WhatsApp for instant confirmation and tailored packages.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to book a stay at Estilo Mansa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base group"
            >
              <MessageCircle size={18} />
              <span>Book via WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
