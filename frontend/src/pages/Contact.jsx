import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../assets/index.js';

const WHATSAPP_NUMBER = '919876543210';

const contactItems = [
  {
    icon: MapPin,
    title: 'Our Location',
    body: 'Estilo Mansa, Lakkidi\nKunnathidavaka, Wayanad\nKerala 673576, India',
    link: 'https://maps.app.goo.gl/ik7G6VygDg6wMmMY8',
    linkLabel: 'Get Directions',
  },
  {
    icon: Phone,
    title: 'Call Us',
    body: '+91 98765 43210',
    link: 'tel:+919876543210',
    linkLabel: 'Call Now',
  },
  {
    icon: Mail,
    title: 'Email',
    body: 'reservations@estilomansa.com',
    link: 'mailto:reservations@estilomansa.com',
    linkLabel: 'Send Email',
  },
  {
    icon: Clock,
    title: 'Check-in / Check-out',
    body: 'Check-in: 2:00 PM\nCheck-out: 11:00 AM',
  },
];

const Contact = () => {
  const revealRef = useRef(null);

  useEffect(() => {
    const els = revealRef.current?.querySelectorAll('.contact-reveal');
    if (!els?.length) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-shell pb-20 md:pb-32" ref={revealRef}>
      {/* ── Hero ── */}
      <div className="page-hero text-center">
        <motion.div
          className="page-hero-panel max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-pill mb-6">Get in Touch</span>
          <h1 className="premium-h2 text-luxury-cream mb-5">
            Let's Plan Your Escape
          </h1>
          <p className="text-luxury-text/55 max-w-lg mx-auto text-base md:text-lg leading-8">
            Our concierge team is ready to help you craft the perfect stay — with warmth, clarity, and personal attention.
          </p>
        </motion.div>
      </div>

      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">

          {/* ── Left: Contact info + WhatsApp ── */}
          <div className="space-y-6">
            {/* Hero image strip */}
            <div className="contact-reveal fade-up relative h-56 md:h-72 rounded-2xl overflow-hidden border border-white/6">
              <img
                src={HERO_IMAGE}
                alt="Estilo Mansa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <p className="section-label mb-2">Estilo Mansa</p>
                <p className="font-serif text-2xl text-luxury-cream">Wayanad, Kerala</p>
              </div>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactItems.map((item, i) => (
                <div
                  key={item.title}
                  className="contact-reveal fade-up panel p-6 rounded-2xl group hover:border-luxury-gold/20 transition-all duration-400"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold flex-shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-luxury-cream font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-luxury-text/55 text-sm leading-6 whitespace-pre-line">{item.body}</p>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-luxury-gold text-[10px] uppercase tracking-[0.25em] font-semibold mt-3 group-hover:gap-2.5 transition-all duration-300"
                        >
                          {item.linkLabel} <ArrowRight size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="contact-reveal fade-up">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to inquire about Estilo Mansa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full !py-5 group justify-center text-sm"
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* ── Right: Map ── */}
          <div className="contact-reveal fade-up">
            <div className="panel overflow-hidden rounded-2xl min-h-[500px] lg:min-h-full border-luxury-gold/8 relative">
              {/* Map label */}
              <div className="absolute top-5 left-5 z-10">
                <div className="glass-card-light px-4 py-2.5 rounded-xl">
                  <p className="text-[9px] uppercase tracking-widest text-luxury-gold/70 mb-0.5">Location</p>
                  <p className="text-luxury-cream text-sm font-medium">Lakkidi, Wayanad</p>
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.98402506258!2d76.012543!3d11.516104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba66d00752327af%3A0x45014ba64dc99424!2sEstilo!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="absolute inset-0"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) hue-rotate(175deg) saturate(0.55)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Estilo Mansa Google Maps"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
