import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { ArrowRight, Lock, Mail, User, Sparkles, Leaf } from 'lucide-react';
import SEO from '../components/SEO';
import { ROUTES } from '../utils/routes';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || ROUTES.home;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { name, email, password });
      login(response.data.token, response.data.user);
      navigate(redirectTo);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4 py-28 sm:px-6">
      <SEO
        title="Create Account | EstiloMansa"
        description="Create an EstiloMansa account to manage reservations and guest access."
        path={ROUTES.register}
        noindex
      />
      <motion.div
        className="panel relative grid w-full max-w-6xl overflow-hidden lg:grid-cols-[0.96fr_1.04fr]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative hidden border-r border-white/8 lg:block">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,17,14,0.92),rgba(8,11,10,0.86)),radial-gradient(circle_at_bottom_right,rgba(200,169,110,0.18),transparent_32%)]" />
          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
            <div>
              <span className="eyebrow-pill mb-5">Guest Access</span>
              <h1 className="premium-h2 max-w-xl text-luxury-cream">
                Begin your
                {' '}
                <span className="italic-serif text-luxury-gold">private escape</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-8 text-luxury-text/58">
                Create your account to unlock reservations, personalized communication, and a smoother stay.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: Sparkles, title: 'Premium flow', copy: 'A simpler, more polished path from discovery to booking.' },
                { icon: Leaf, title: 'Nature-first calm', copy: 'A digital experience that feels as relaxed as the property itself.' },
              ].map(item => (
                <div key={item.title} className="panel-soft flex items-start gap-4 px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-luxury-gold/12 text-luxury-gold">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-luxury-cream">{item.title}</p>
                    <p className="mt-1 text-sm leading-7 text-luxury-text/50">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="mb-10 text-center lg:text-left">
            <div className="mb-5 flex items-baseline justify-center gap-1 lg:justify-start">
              <span className="font-serif text-2xl text-ivory">Estilo</span>
              <span className="font-script text-3xl text-gold italic">Mansa</span>
            </div>
            <p className="section-label mb-4">Guest Access</p>
            <h2 className="font-serif text-3xl text-ivory sm:text-4xl">Create your account</h2>
            <p className="mt-3 text-sm leading-7 text-cream/48 sm:text-base">Begin your private booking journey with a calm, premium experience.</p>
          </div>
        
          {error && <div className="mb-6 rounded-[1.25rem] border border-red-400/15 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
        
          <form onSubmit={handleSubmit} className="space-y-5">
          <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">Full Name</label>
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
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">Email</label>
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
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">Password</label>
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
            <button type="submit" className="btn-primary w-full justify-center py-4 text-[11px]">
            <span>Register</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>
        
          <div className="gold-divider mt-8" />
          <p className="mt-6 text-center text-sm text-cream/45">
            Already have an account? <Link to={ROUTES.login} className="font-medium text-gold transition-colors hover:text-gold-light">Log in</Link>
        </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
