import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram, LogIn, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import KasaLogo from '../assets/image.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/#tents', label: 'Tents' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleNavClick = (e, link) => {
    if (link.to.startsWith('/#')) {
      e.preventDefault();
      const id = link.to.replace('/#', '');
      
      if (location.pathname === '/') {
        // Already on home, just scroll
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate home then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 sm:py-4'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="page-container max-w-7xl px-4">
          <div className={`relative rounded-full border border-white/20 bg-white/5 px-4 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] backdrop-blur-3xl transition-all duration-700 ${scrolled ? 'scale-[0.98] border-luxury-gold/30' : 'scale-100'}`}>
            {/* Glossy Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none rounded-full" />

            <div className="relative flex items-center justify-between gap-4 px-2 sm:px-4">
              {/* Left: Instagram + Brand */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/estilo_mansa?igsh=ZjRnZDJvNjlqd3c4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#c8a96e]/40 bg-black/20 text-[#c8a96e] backdrop-blur-md transition-all duration-300 hover:border-[#c8a96e] hover:shadow-[0_0_20px_rgba(200,169,110,0.3)] sm:h-11 sm:w-11"
                >
                  <Instagram size={17} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
                <Link to="/" className="flex flex-col leading-none transition-transform hover:scale-[1.02]">
                  <span className="font-serif text-[1rem] tracking-tight text-white sm:text-lg">Estilo</span>
                  <span className="-mt-0.5 font-script text-[1.5rem] text-[#c8a96e] sm:text-[1.7rem]">Mansa</span>
                </Link>
              </div>

              {/* Center: Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] transition-all duration-300 hover:text-[#c8a96e] ${location.pathname === link.to ? 'text-[#c8a96e]' : 'text-white/70'}`}
                  >
                    {link.label}
                    {location.pathname === link.to && (
                      <motion.div layoutId="navUnderline" className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#c8a96e]" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Right: Logo + Auth */}
              <div className="flex items-center gap-3 sm:gap-6">
                <div className="hidden sm:block h-7 w-[1px] bg-white/10" />

                {/* Logo Section */}
                <div className="relative flex items-center justify-center w-14 sm:w-20">
                  <div className="absolute inset-0 rounded-lg bg-[#c8a96e]/5 blur-lg pointer-events-none" />
                  <img
                    src={KasaLogo}
                    alt="Kasa Exotica"
                    className="relative z-10 w-auto h-15 sm:h-22 object-contain transition-all duration-500 hover:scale-110 drop-shadow-[0_0_10px_rgba(200,169,110,0.2)]"
                  />
                </div>

                <div className="h-7 w-[1px] bg-white/10" />

                <div className="flex items-center gap-3">
                  {user ? (
                    <div className="flex items-center gap-2">
                      <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c8a96e]/30 bg-white/5 transition-all hover:border-[#c8a96e]">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c8a96e] text-black text-[10px] font-bold">
                          {user.name?.[0].toUpperCase() || 'U'}
                        </div>
                        <span className="hidden md:block text-[9px] font-bold uppercase tracking-widest text-white/80 group-hover:text-white">{user.name?.split(' ')[0]}</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                        title="Logout"
                      >
                        <LogOut size={14} />
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" className="flex items-center gap-1.5 rounded-full border border-[#c8a96e]/40 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#c8a96e] hover:text-black transition-all duration-300">
                      <LogIn size={13} />
                      <span className="hidden sm:block">Sign In</span>
                    </Link>
                  )}

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden group flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a96e]/40 bg-black/20 text-white transition-all hover:border-[#c8a96e]"
                  >
                    {isOpen ? <X size={19} /> : <Menu size={19} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 px-4 pt-24 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="panel mx-auto max-w-md overflow-hidden rounded-[2.5rem] px-6 py-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="section-label mb-2 text-[10px]">MENU</p>
                  <h3 className="font-serif text-3xl text-luxury-cream">Navigate</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={(e) => {
                      setIsOpen(false);
                      handleNavClick(e, link);
                    }}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition-all ${location.pathname === link.to ? 'border-[#c8a96e]/30 bg-[#c8a96e]/10 text-[#c8a96e]' : 'border-white/5 bg-white/5 text-luxury-cream hover:border-[#c8a96e]/20'}`}
                  >
                    <span className="font-serif text-2xl">{link.label}</span>
                    <ArrowRight size={18} />
                  </Link>
                ))}
              </div>
              <div className="my-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {user ? (
                <div className="space-y-3">
                  <Link to={user.role === 'admin' ? '/admin' : '/profile'} onClick={() => setIsOpen(false)} className="btn-outline w-full justify-center py-4">Account</Link>
                  <button onClick={handleLogout} className="btn-primary w-full justify-center py-4">Logout</button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary w-full justify-center py-4">Sign In</Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
