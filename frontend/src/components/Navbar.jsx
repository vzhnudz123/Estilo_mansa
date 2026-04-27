import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import KasaLogo from '../assets/image.png';

const navLinks = [
  { to: '/',        label: 'Home' },
  { to: '/rooms',   label: 'Rooms' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <motion.nav
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'py-4 sm:py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="page-container max-w-4xl px-4">
          <div className={`relative flex items-center justify-between rounded-full border border-[#c8a96e]/30 bg-gradient-to-r from-[#050706] via-[#0a1128] to-[#050706] px-4 py-2 shadow-[0_12px_48px_rgba(0,0,0,0.7),0_0_24px_rgba(200,169,110,0.15)] backdrop-blur-2xl transition-all duration-500 sm:px-8 sm:py-3 ${
            scrolled ? 'scale-95' : 'scale-100'
          }`}>
            {/* Left Section: Instagram */}
            <div className="flex flex-1 items-center justify-start gap-4">
              <a 
                href="https://www.instagram.com/estilo_mansa?igsh=ZjRnZDJvNjlqd3c4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#c8a96e]/40 bg-white/5 text-[#c8a96e] shadow-[0_0_15px_rgba(200,169,110,0.1)] transition-all duration-300 hover:border-[#c8a96e] hover:shadow-[0_0_30px_rgba(200,169,110,0.3)] sm:h-14 sm:w-14"
              >
                <Instagram size={20} className="transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>

            {/* Center Section: Brand Text & Divider */}
            <div className="flex items-center gap-4 sm:gap-7">
              <Link to="/" className="flex flex-col items-center leading-none">
                <span className="font-serif text-[1.4rem] tracking-wide text-white sm:text-2xl">Estilo</span>
                <span className="-mt-1 font-script text-[1.8rem] text-[#c8a96e] sm:text-[2.2rem]">Mansa</span>
              </Link>
              
              <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-[#c8a96e]/50 to-transparent sm:h-12" />
              
              <div className="relative group">
                <div className="absolute inset-0 rounded-lg bg-[#c8a96e]/5 blur-md group-hover:bg-[#c8a96e]/10 transition-colors" />
                <img 
                  src={KasaLogo} 
                  alt="Kasa Exotica" 
                  className="relative h-12 w-auto object-contain sm:h-16"
                />
              </div>
            </div>

            {/* Right Section: Menu */}
            <div className="flex flex-1 items-center justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#c8a96e]/40 bg-white/5 text-[#c8a96e] shadow-[0_0_15px_rgba(200,169,110,0.1)] transition-all duration-300 hover:border-[#c8a96e] hover:shadow-[0_0_30px_rgba(200,169,110,0.3)] sm:h-14 sm:w-14"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} className="transition-transform duration-300 group-hover:scale-110" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/55 px-4 pt-24 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="panel mx-auto max-w-md overflow-hidden rounded-[2rem] px-5 py-6"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="section-label mb-2">Navigate</p>
                  <h3 className="font-serif text-2xl text-luxury-cream">Explore</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-luxury-text/80"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-[1.25rem] border px-4 py-4 text-left transition-colors ${
                      location.pathname === link.to
                          ? 'border-luxury-gold/24 bg-luxury-gold/10 text-luxury-gold'
                          : 'border-white/8 bg-white/[0.025] text-luxury-cream hover:border-luxury-gold/14 hover:text-luxury-gold'
                    }`}
                  >
                      <span className="font-serif text-2xl">{link.label}</span>
                      <ArrowRight size={16} />
                  </Link>
                  </motion.div>
                ))}
              </div>
              <div className="gold-divider mt-6" />
              {user ? (
                <div className="mt-5 space-y-3">
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="btn-outline w-full justify-center text-[11px]">
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn-primary w-full justify-center text-[11px]">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary mt-5 w-full justify-center text-[11px]">
                  <span>Sign In</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
