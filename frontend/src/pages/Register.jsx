import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { name, email, password });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-6 py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/90 to-obsidian" />
      </div>

      <motion.div
        className="max-w-md w-full glass-panel rounded-md p-8 md:p-10 relative z-10"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-10">
          <div className="flex items-baseline justify-center gap-1 mb-5">
            <span className="font-serif text-2xl text-ivory">Estilo</span>
            <span className="font-script text-3xl text-gold italic">Mansa</span>
          </div>
          <p className="section-label mb-4">Guest Access</p>
          <h2 className="font-serif text-3xl text-ivory mb-3">Create Account</h2>
          <p className="text-cream/50 text-sm">Begin your private booking journey.</p>
        </div>
        
        {error && <div className="bg-red-500/10 text-red-300 p-3 rounded-[2px] border border-red-400/15 mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] text-gold/60 mb-2 tracking-[0.3em] uppercase font-bold">Full Name</label>
            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" />
              <input 
                type="text" 
                required
                className="input-field pl-10" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] text-gold/60 mb-2 tracking-[0.3em] uppercase font-bold">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" />
              <input 
                type="email" 
                required
                className="input-field pl-10" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] text-gold/60 mb-2 tracking-[0.3em] uppercase font-bold">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" />
              <input 
                type="password" 
                required
                className="input-field pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="w-full btn-primary py-4 group">
            <span>Register</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <div className="gold-divider mt-8" />
        <p className="text-center mt-6 text-cream/45 text-sm">
          Already have an account? <Link to="/login" className="text-gold hover:text-gold-light transition-colors font-medium">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
