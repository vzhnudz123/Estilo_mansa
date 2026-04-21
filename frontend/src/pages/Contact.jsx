import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-luxury-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            We are here to help make your stay absolutely perfect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Contact Info */}
          <div className="p-10 md:p-14 bg-luxury-dark text-white relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute -right-20 -bottom-20 opacity-5 w-64 h-64 rounded-full bg-luxury-gold"></div>
            
            <h2 className="text-3xl font-serif font-bold mb-8 text-luxury-gold">Get In Touch</h2>
            <p className="mb-10 text-gray-300 text-lg">
              Have questions about your upcoming trip to Wayanad? Need assistance with your booking? Reach out to our concierge team.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-luxury-gold mt-1 shrink-0" size={28} />
                <div>
                  <h3 className="font-bold text-xl mb-1">Our Location</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Estilo Mansa<br />
                    Lakkidi, Kunnathidavaka<br />
                    Wayanad, Kerala 673576<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="text-luxury-gold shrink-0" size={28} />
                <div>
                  <h3 className="font-bold text-xl mb-1">Call Us</h3>
                  <p className="text-gray-300">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="text-luxury-gold shrink-0" size={28} />
                <div>
                  <h3 className="font-bold text-xl mb-1">Email</h3>
                  <p className="text-gray-300">reservations@estilomansa.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-14">
              <a 
                href="https://maps.app.goo.gl/ik7G6VygDg6wMmMY8" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block bg-luxury-gold text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-luxury-dark transition-colors duration-300"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Map Embed */}
          <div className="h-[500px] lg:h-auto min-h-full w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.98402506258!2d76.012543!3d11.516104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba66d00752327af%3A0x45014ba64dc99424!2sEstilo!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Estilo Mansa Google Maps"
            ></iframe>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Contact;
