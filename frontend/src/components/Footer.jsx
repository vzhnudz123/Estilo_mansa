import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '919876543210';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-luxury-gold/10 bg-[#09100d]/90 pt-20 pb-8">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-luxury-gold/8 to-transparent blur-3xl" />
      <div className="page-container relative">
        <div className="panel mb-12 overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_0.75fr_0.95fr]">
            <div>
              <span className="eyebrow-pill mb-5">Highland Escape</span>
              <div className="mb-5 flex flex-col">
                <span className="font-serif text-2xl text-luxury-cream tracking-wide">Estilo</span>
                <span className="font-script text-4xl gold-text -mt-1">Mansa</span>
              </div>
              <p className="max-w-lg text-sm leading-8 text-luxury-text/58">
                A luxury homestay wrapped in mist, forest air, and quiet architecture. Crafted for slow mornings,
                golden hour views, and an effortless retreat in Wayanad.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to book a stay at Estilo Mansa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-[11px]"
                >
                  <MessageCircle size={13} />
                  <span>Book via WhatsApp</span>
                </a>
                <Link to="/contact" className="btn-outline text-[11px]">
                  <span>Contact Concierge</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div>
              <p className="section-label mb-5">Explore</p>
              <div className="space-y-2">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/rooms', label: 'Our Rooms' },
                  { to: '/gallery', label: 'Gallery' },
                  { to: '/contact', label: 'Contact' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center justify-between rounded-[1.1rem] border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-luxury-text/62 transition-all hover:border-luxury-gold/20 hover:text-luxury-cream"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="section-label mb-5">Contact</p>
              <div className="space-y-3">
                <div className="panel-soft px-4 py-4">
                  <div className="mb-2 flex items-center gap-3 text-luxury-gold">
                    <MapPin size={14} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">Location</span>
                  </div>
                  <p className="text-sm leading-7 text-luxury-text/58">Lakkidi, Kunnathidavaka, Wayanad, Kerala 673576</p>
                </div>
                <div className="panel-soft px-4 py-4">
                  <div className="mb-2 flex items-center gap-3 text-luxury-gold">
                    <Phone size={14} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">Phone</span>
                  </div>
                  <a href="tel:+919876543210" className="text-sm text-luxury-text/62 transition-colors hover:text-luxury-cream">+91 98765 43210</a>
                </div>
                <div className="panel-soft px-4 py-4">
                  <div className="mb-2 flex items-center gap-3 text-luxury-gold">
                    <Mail size={14} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">Email</span>
                  </div>
                  <a href="mailto:reservations@estilomansa.com" className="text-sm text-luxury-text/62 transition-colors hover:text-luxury-cream">
                    reservations@estilomansa.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-luxury-gold/10 pt-6 text-center md:flex-row md:text-left">
          <p className="text-xs tracking-[0.24em] text-luxury-text/32">
            © {new Date().getFullYear()} Estilo Mansa. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-luxury-text/35 transition-colors hover:text-luxury-gold">
              <Instagram size={16} />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-luxury-text/35 transition-colors hover:text-luxury-gold">
              <Facebook size={16} />
            </a>
          </div>
          <p className="text-xs text-luxury-text/24">
            Designed for slow stays in Wayanad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
