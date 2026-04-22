import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ui';

const WHATSAPP_NUMBER = '919876543210';

const Contact = () => {
  return (
    <div className="page-shell pb-20 md:pb-28">
      <div className="page-hero text-center">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          className="premium-h2 text-luxury-cream"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-luxury-text/54 md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Our concierge team is available to help you plan the perfect escape with clarity, warmth, and quick support.
        </motion.p>
      </div>

      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ScrollReveal>
            <div className="panel flex h-full flex-col justify-between rounded-[2rem] p-6 sm:p-8 lg:p-10">
              <div>
                <h2 className="mb-8 font-serif text-3xl text-luxury-cream">We&apos;d Love to Hear From You</h2>
                <p className="mb-10 leading-8 text-luxury-text/60">
                  Whether it&apos;s a reservation inquiry, a special occasion plan, or just a question about the property, we&apos;re here for you every step of the way.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      title: 'Our Location',
                      body: (
                        <>
                          Estilo Mansa, Lakkidi<br />
                          Kunnathidavaka, Wayanad<br />
                          Kerala 673576, India
                        </>
                      ),
                    },
                    {
                      icon: Phone,
                      title: 'Call Us',
                      body: '+91 98765 43210',
                    },
                    {
                      icon: Mail,
                      title: 'Email',
                      body: 'reservations@estilomansa.com',
                    },
                  ].map(item => (
                    <div key={item.title} className="panel-soft flex items-start gap-4 px-4 py-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-luxury-gold/10 text-luxury-gold">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <h3 className="mb-1 font-medium text-luxury-cream">{item.title}</h3>
                        <p className="text-sm leading-7 text-luxury-text/58">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I would like to inquire about Estilo Mansa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Us</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="https://maps.app.goo.gl/ik7G6VygDg6wMmMY8"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  <span>Get Directions</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="panel overflow-hidden rounded-[2rem] min-h-[480px] border-luxury-gold/10">
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
