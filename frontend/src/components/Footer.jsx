import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '919876543210';

const Footer = () => {
  return (
    <footer className="bg-luxury-surface border-t border-luxury-gold/8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex flex-col mb-6">
              <span className="font-serif text-xl text-luxury-cream tracking-wide">Estilo</span>
              <span className="font-script text-3xl gold-text -mt-1">Mansa</span>
            </div>
            <p className="text-luxury-text/50 text-sm leading-relaxed max-w-xs mb-8">
              A luxury homestay nestled in the misty highlands of Lakkidi, Wayanad. Where nature meets refinement.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to book a stay at Estilo Mansa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-3 px-6 inline-flex"
            >
              <MessageCircle size={13} />
              <span>Book via WhatsApp</span>
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="section-label mb-6">Explore</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/rooms', label: 'Our Rooms' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-luxury-text/50 hover:text-luxury-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="section-label mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-luxury-text/50 text-sm">
                <MapPin size={14} className="text-luxury-gold mt-0.5 flex-shrink-0" />
                <span>Lakkidi, Kunnathidavaka, Wayanad, Kerala 673576</span>
              </li>
              <li className="flex items-center gap-3 text-luxury-text/50 text-sm">
                <Phone size={14} className="text-luxury-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-luxury-gold transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3 text-luxury-text/50 text-sm">
                <Mail size={14} className="text-luxury-gold flex-shrink-0" />
                <a href="mailto:reservations@estilomansa.com" className="hover:text-luxury-gold transition-colors">
                  reservations@estilomansa.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-luxury-gold/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-luxury-text/30 text-xs tracking-widest">
            © {new Date().getFullYear()} Estilo Mansa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-luxury-text/30 hover:text-luxury-gold transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" className="text-luxury-text/30 hover:text-luxury-gold transition-colors">
              <Facebook size={16} />
            </a>
          </div>
          <p className="text-luxury-text/20 text-xs">
            Designed with ♥ for Wayanad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
