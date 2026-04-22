import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles } from 'lucide-react';

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
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4 py-28 sm:px-6">
      <motion.div
        className="panel relative grid w-full max-w-6xl overflow-hidden lg:grid-cols-[1.02fr_0.98fr]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative hidden overflow-hidden border-r border-white/8 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,169,110,0.18),transparent_30%),linear-gradient(180deg,rgba(9,13,11,0.94),rgba(6,8,7,0.82))]" />
          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
            <div>
              <span className="eyebrow-pill mb-5">Private Access</span>
              <h1 className="premium-h2 max-w-xl text-luxury-cream">
                Return to your
                {' '}
                <span className="italic-serif text-luxury-gold">mountain retreat</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-8 text-luxury-text/60">
                Manage stays, review availability, and step back into the calm atmosphere of Estilo Mansa.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: ShieldCheck, title: 'Secure access', copy: 'Protected entry for guests and the admin concierge.' },
                { icon: Sparkles, title: 'Frictionless experience', copy: 'Polished flows tuned for quick actions and clarity.' },
              ].map(item => (
                <div key={item.title} className="panel-soft flex items-start gap-4 px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-luxury-gold/12 text-luxury-gold">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-luxury-cream">{item.title}</p>
                    <p className="mt-1 text-sm leading-7 text-luxury-text/52">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="mb-10 text-center lg:text-left">
            <div className="mb-5 flex flex-col items-center leading-none lg:items-start">
              <span className="font-serif text-2xl text-luxury-cream tracking-wide">Estilo</span>
              <span className="font-script text-3xl gold-text -mt-1">Mansa</span>
            </div>
            <p className="section-label mb-4">Welcome Back</p>
            <h2 className="font-serif text-3xl text-luxury-cream sm:text-4xl">Sign in to continue</h2>
            <p className="mt-3 text-sm leading-7 text-luxury-text/52 sm:text-base">Access your stay details and premium guest experience.</p>
          </div>

        {error && (
          <motion.div
            className="mb-6 rounded-[1.25rem] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

          <form onSubmit={handleSubmit} className="space-y-5">
          <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.32em] text-luxury-text/48">Email</label>
            <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold/45" />
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
              <label className="mb-2 block text-xs uppercase tracking-[0.32em] text-luxury-text/48">Password</label>
            <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold/45" />
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
              className={`btn-primary w-full justify-center py-4 text-[11px] ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              {!loading && <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
          </button>
        </form>

          <div className="gold-divider mt-8" />
          <p className="mt-6 text-center text-sm text-luxury-text/40">
          Don't have an account?{' '}
            <Link to="/register" className="font-medium text-luxury-gold transition-colors hover:text-luxury-gold-light">
            Create one
          </Link>
        </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
