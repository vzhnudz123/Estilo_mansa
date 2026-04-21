import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 top-0 left-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-serif font-bold text-luxury-dark">
            Estilo<span className="text-luxury-gold">Mansa</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-luxury-gold transition-colors font-medium">Home</Link>
            <Link to="/rooms" className="text-gray-600 hover:text-luxury-gold transition-colors font-medium">Rooms</Link>
            <Link to="/gallery" className="text-gray-600 hover:text-luxury-gold transition-colors font-medium">Gallery</Link>
            <Link to="/contact" className="text-gray-600 hover:text-luxury-gold transition-colors font-medium">Contact</Link>
            
            {user ? (
              <div className="flex items-center space-x-6">
                <Link to="/my-bookings" className="text-gray-600 hover:text-luxury-gold transition-colors font-medium">My Bookings</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-luxury-gold transition-colors font-medium">Admin</Link>
                )}
                <button onClick={handleLogout} className="btn-outline text-sm py-2 px-5">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-5">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-luxury-dark">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            <Link onClick={() => setIsOpen(false)} to="/" className="block text-gray-800 font-medium py-2">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/rooms" className="block text-gray-800 font-medium py-2">Rooms</Link>
            <Link onClick={() => setIsOpen(false)} to="/gallery" className="block text-gray-800 font-medium py-2">Gallery</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className="block text-gray-800 font-medium py-2">Contact</Link>
            {user ? (
              <>
                <Link onClick={() => setIsOpen(false)} to="/my-bookings" className="block text-gray-800 font-medium py-2">My Bookings</Link>
                {user.role === 'admin' && (
                  <Link onClick={() => setIsOpen(false)} to="/admin" className="block text-gray-800 font-medium py-2">Admin</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left text-red-600 font-medium py-2">Logout</button>
              </>
            ) : (
              <Link onClick={() => setIsOpen(false)} to="/login" className="block text-luxury-gold font-medium py-2">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
