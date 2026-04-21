import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-luxury-dark text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4 text-white">Estilo<span className="text-luxury-gold">Mansa</span></h2>
            <p className="text-gray-300">Experience true luxury and tranquility at our premium guest house.</p>
          </div>
          <div>
            <h3 className="text-xl font-serif mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-luxury-gold transition">Home</a></li>
              <li><a href="/rooms" className="hover:text-luxury-gold transition">Our Rooms</a></li>
              <li><a href="/contact" className="hover:text-luxury-gold transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif mb-4 text-white">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📍 Estilo, Lakkidi, Kunnathidavaka, Kerala 673576</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ reservations@estilomansa.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Estilo Mansa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
