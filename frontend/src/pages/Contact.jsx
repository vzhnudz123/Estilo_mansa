import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ui';

const WHATSAPP_NUMBER = '919876543210';

const Contact = () => {
  return (
    <div className="bg-luxury-bg min-h-screen pt-28 pb-28">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 text-center">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          className="font-serif text-5xl md:text-7xl text-luxury-cream mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Contact Us
        </motion.h1>
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-luxury-gold opacity-60" />
          <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-luxury-gold opacity-60" />
        </motion.div>
        <motion.p
          className="text-luxury-text/50 max-w-xl mx-auto mt-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Our concierge team is available to help you plan the perfect escape.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info Panel */}
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-3xl text-luxury-cream mb-8">We'd Love to Hear From You</h2>
                <p className="text-luxury-text/60 leading-relaxed mb-10">
                  Whether it's a reservation inquiry, a special occasion plan, or just a question about the property — we're here for you, every step of the way.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(200,169,110,0.1)' }}>
                      <MapPin size={18} className="text-luxury-gold" />
                    </div>
                    <div>
                      <h3 className="text-luxury-cream font-medium mb-1">Our Location</h3>
                      <p className="text-luxury-text/60 text-sm leading-relaxed">
                        Estilo Mansa, Lakkidi<br />
                        Kunnathidavaka, Wayanad<br />
                        Kerala 673576, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(200,169,110,0.1)' }}>
                      <Phone size={18} className="text-luxury-gold" />
                    </div>
                    <div>
                      <h3 className="text-luxury-cream font-medium mb-1">Call Us</h3>
                      <p className="text-luxury-text/60 text-sm">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(200,169,110,0.1)' }}>
                      <Mail size={18} className="text-luxury-gold" />
                    </div>
                    <div>
                      <h3 className="text-luxury-cream font-medium mb-1">Email</h3>
                      <p className="text-luxury-text/60 text-sm">reservations@estilomansa.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to inquire about Estilo Mansa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Us</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://maps.app.goo.gl/ik7G6VygDg6wMmMY8"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline group"
                >
                  <span>Get Directions</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Map */}
          <ScrollReveal delay={100}>
            <div className="rounded-3xl overflow-hidden h-full min-h-[480px] border border-luxury-gold/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.98402506258!2d76.012543!3d11.516104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba66d00752327af%3A0x45014ba64dc99424!2sEstilo!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) invert(90%) hue-rotate(170deg) saturate(0.7)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Estilo Mansa Google Maps"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
