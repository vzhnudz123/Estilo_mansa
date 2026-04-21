import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
        className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${
          scrolled
            ? 'bg-luxury-bg/95 backdrop-blur-xl border-b border-luxury-gold/10 py-4'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl text-luxury-cream tracking-wide">Estilo</span>
            <span className="font-script text-2xl gold-text -mt-1">Mansa</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-widest uppercase font-medium transition-all duration-300 relative group ${
                  location.pathname === link.to
                    ? 'text-luxury-gold'
                    : 'text-luxury-text/70 hover:text-luxury-gold'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-luxury-gold transition-all duration-300 ${
                  location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm text-luxury-gold/80 hover:text-luxury-gold tracking-widest uppercase transition-colors">
                    Admin
                  </Link>
                )}
                <Link to="/my-bookings" className="text-sm text-luxury-text/70 hover:text-luxury-gold tracking-widest uppercase transition-colors">
                  My Bookings
                </Link>
                <button onClick={handleLogout} className="btn-outline text-xs py-2.5 px-6">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-xs py-2.5 px-6">
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-luxury-text/80 hover:text-luxury-gold transition-colors p-2"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24"
            style={{ background: 'rgba(10,15,13,0.98)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8 py-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`text-3xl font-serif transition-colors ${
                      location.pathname === link.to
                        ? 'text-luxury-gold'
                        : 'text-luxury-cream hover:text-luxury-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="gold-divider w-32 mt-4" />
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="btn-outline text-sm">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-luxury-text/60 hover:text-red-400 text-sm tracking-widest uppercase transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary text-sm">
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
