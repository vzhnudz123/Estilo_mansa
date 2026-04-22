import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Compass } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="page-container">
          <div className={`panel-soft flex items-center justify-between gap-4 rounded-full px-4 py-3 shadow-[0_16px_60px_rgba(0,0,0,0.18)] transition-all duration-500 sm:px-5 ${
            scrolled ? 'border-luxury-gold/18 bg-[#0a100dcc]' : 'bg-[#0a100db8]'
          }`}>
            <Link to="/" className="group flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-luxury-gold/16 bg-white/5 text-luxury-gold">
                <Compass size={18} />
              </div>
              <div className="flex min-w-0 flex-col leading-none">
                <span className="truncate font-serif text-lg text-luxury-cream tracking-wide sm:text-xl">Estilo</span>
                <span className="-mt-0.5 truncate font-script text-2xl gold-text sm:text-[1.8rem]">Mansa</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/6 bg-white/[0.03] px-2 py-1.5">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-full px-4 py-2 text-xs tracking-[0.28em] uppercase font-semibold transition-all duration-300 ${
                  location.pathname === link.to
                    ? 'bg-luxury-gold/12 text-luxury-gold'
                    : 'text-luxury-text/70 hover:bg-white/[0.04] hover:text-luxury-cream'
                }`}
              >
                {link.label}
              </Link>
            ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.role === 'admin' && (
                    <Link to="/admin" className="rounded-full border border-luxury-gold/18 bg-luxury-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-luxury-gold transition-colors hover:bg-luxury-gold/16">
                    Admin
                  </Link>
                )}
                  <button onClick={handleLogout} className="btn-outline py-2.5 text-[11px]">
                  Logout
                </button>
              </>
            ) : (
                <Link to="/login" className="btn-primary py-2.5 text-[11px]">
                  <span>Sign In</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-luxury-text/80 transition-colors hover:text-luxury-gold md:hidden"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
