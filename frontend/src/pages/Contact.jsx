import React, { useRef, useEffect, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../assets/index.js';

const WHATSAPP_NUMBER = '919037706644';

const Contact = () => {
  const revealRef = useRef(null);

  const contactItems = useMemo(() => [
    {
      icon: MapPin,
      title: 'Sanctuary Address',
      body: 'Estilo Mansa, Lakkidi, Wayanad,\nKerala 673576, India',
      link: 'https://maps.app.goo.gl/ik7G6VygDg6wMmMY8',
      linkLabel: 'Find Us on Maps',
    },
    {
      icon: Phone,
      title: 'Concierge Line',
      body: '+91 9037706644',
      link: 'tel:+919037706644',
      linkLabel: 'Connect via Voice',
    },
    {
      icon: Mail,
      title: 'Digital Inquiries',
      body: 'estilomansa@gmail.com',
      link: 'mailto:estilomansa@gmail.com',
      linkLabel: 'Email Our Team',
    },
  ], []);

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
    <div className="page-shell pb-24 md:pb-40" ref={revealRef}>
      {/* ── Curated Hero Header ── */}
      <div className="text-center pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-pill tracking-[0.4em]">Get in Touch</span>
        </motion.div>
      </div>

      <div className="page-container max-w-6xl">
        {/* ── WhatsApp Highlight Section ── */}
        <div className="contact-reveal fade-up max-w-2xl mx-auto mb-16">
          <div className="panel-soft p-10 md:p-12 rounded-[2.5rem] text-center border-luxury-gold/10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
             <p className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold mb-6 font-bold">Instant Concierge</p>
             <h4 className="text-luxury-cream text-2xl md:text-3xl font-serif mb-8 italic-serif">Reach us on WhatsApp for personal assistance</h4>
             <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to inquire about Estilo Mansa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-16 !py-6 group text-xs tracking-[0.2em]"
            >
              <MessageCircle size={18} />
              <span>Open Chat</span>
            </a>
          </div>
        </div>

        {/* ── Contact Grid — Curated Panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-24 max-w-5xl mx-auto">
          {contactItems.map((item, i) => (
            <div
              key={item.title}
              className="contact-reveal fade-up panel p-8 rounded-[2rem] flex flex-col items-start group hover:border-luxury-gold/30 transition-all duration-700"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-luxury-gold/5 flex items-center justify-center text-luxury-gold mb-8 group-hover:bg-luxury-gold group-hover:text-obsidian transition-all duration-500">
                <item.icon size={20} />
              </div>
              <h3 className="text-luxury-cream font-medium text-xs uppercase tracking-[0.25em] mb-4">{item.title}</h3>
              <p className="text-luxury-text/50 text-sm leading-7 mb-6 flex-1 whitespace-pre-line font-light">{item.body}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-bold group-hover:gap-4 transition-all duration-500"
                >
                  {item.linkLabel} <ArrowRight size={12} />
                </a>
              )}
            </div>
          ))}
        </div>



        {/* ── Map — Cinematic Frame ── */}
        <div className="contact-reveal fade-up">
          <div className="panel overflow-hidden rounded-[3rem] h-[400px] md:h-[600px] border-luxury-gold/5 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.98402506258!2d76.012543!3d11.516104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba66d00752327af%3A0x45014ba64dc99424!2sEstilo!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="absolute inset-0 grayscale contrast-[1.2] opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) saturate(0.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Estilo Mansa Google Maps"
            />
            {/* Map Cover Overlay for Aesthetics */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);
