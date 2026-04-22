import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { ArrowRight, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate(res.data.user?.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-bg flex items-center justify-center px-6 relative overflow-hidden">
      {/* BG Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #c8a96e, transparent)' }} />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #2d4a35, transparent)' }} />
      </div>

      <motion.div
        className="max-w-md w-full glass-card rounded-3xl p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex flex-col leading-none items-center mb-4">
            <span className="font-serif text-2xl text-luxury-cream tracking-wide">Estilo</span>
            <span className="font-script text-3xl gold-text -mt-1">Mansa</span>
          </div>
          <h2 className="font-serif text-2xl text-luxury-cream mb-2">Welcome Back</h2>
          <p className="text-luxury-text/50 text-sm">Sign in to access your Estilo Mansa account</p>
        </div>

        {error && (
          <motion.div
            className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs text-luxury-text/50 mb-2 tracking-widest uppercase">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold/50" />
              <input
                type="email"
                required
                className="input-field pl-10"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-luxury-text/50 mb-2 tracking-widest uppercase">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold/50" />
              <input
                type="password"
                required
                className="input-field pl-10"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full py-4 group ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="gold-divider mt-8" />
        <p className="text-center text-luxury-text/40 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-luxury-gold hover:text-luxury-gold-light transition-colors font-medium">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
