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
        <div className="page-container max-w-5xl px-4">
          <div className={`relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-2 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] backdrop-blur-3xl transition-all duration-700 ${
            scrolled ? 'scale-[0.98] border-luxury-gold/30' : 'scale-100'
          }`}>
            {/* Glossy Sheen Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
            
            <div className="relative flex items-center justify-between gap-2 px-2 sm:px-4">
              {/* Left Section: Instagram + Brand Grouped */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a 
                  href="https://www.instagram.com/estilo_mansa?igsh=ZjRnZDJvNjlqd3c4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a96e]/40 bg-black/20 text-[#c8a96e] backdrop-blur-md transition-all duration-300 hover:border-[#c8a96e] hover:shadow-[0_0_20px_rgba(200,169,110,0.3)] sm:h-12 sm:w-12"
                >
                  <Instagram size={18} className="transition-transform duration-300 group-hover:scale-110" />
                </a>

                {/* Brand Text */}
                <Link to="/" className="flex flex-col leading-none transition-transform hover:scale-[1.02]">
                  <span className="font-serif text-[1.1rem] tracking-tight text-white sm:text-xl">Estilo</span>
                  <span className="-mt-0.5 font-script text-[1.6rem] text-[#c8a96e] sm:text-[1.8rem]">Mansa</span>
                </Link>
              </div>

              {/* Center Divider & Logo Section */}
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent sm:h-10" />
                
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-[#c8a96e]/5 blur-md group-hover:bg-[#c8a96e]/10 transition-colors" />
                  <img 
                    src={KasaLogo} 
                    alt="Kasa Exotica" 
                    className="relative h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[2deg] sm:h-20"
                  />
                </div>

                <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent sm:h-10" />

                {/* Far Right: Menu */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a96e]/40 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c8a96e] hover:text-[#c8a96e] hover:shadow-[0_0_20px_rgba(200,169,110,0.2)] sm:h-12 sm:w-12"
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} className="transition-transform duration-300 group-hover:scale-110" />}
                </button>
              </div>
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
