import React, { useEffect, useState, useRef } from 'react';
import { Star, Quote, Send, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../api/axios';

const StarRow = ({ rating, interactive = false, value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(s => (
      <button
        key={s}
        type={interactive ? 'button' : undefined}
        onClick={interactive ? () => onChange(s) : undefined}
        className={interactive ? 'transition-transform hover:scale-125' : 'cursor-default'}
      >
        <Star
          size={interactive ? 20 : 14}
          fill={s <= (interactive ? value : rating) ? '#c8a96e' : 'transparent'}
          className={s <= (interactive ? value : rating) ? 'text-luxury-gold' : 'text-luxury-text/20'}
        />
      </button>
    ))}
  </div>
);

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    api.get('/feedback/approved')
      .then(res => setFeedbacks(res.data))
      .catch(() => {});
  }, []);

  // Reveal header
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/feedback', formData);
      setSubmitted(true);
      setFormData({ name: '', rating: 5, comment: '' });
      setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
    } catch {
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollBy = dir => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-36 bg-luxury-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-luxury-green/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
        <div ref={headerRef} className="fade-up flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-luxury-gold/60" />
              <span className="section-label">Guest Stories</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream leading-tight">
              Voices of{' '}
              <em className="font-script text-luxury-gold not-italic">Serenity</em>
            </h2>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-outline py-3 px-8 text-xs self-start md:self-auto"
          >
            {showForm ? 'View Stories' : 'Share Your Experience'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              {feedbacks.length > 0 ? (
                <div className="relative">
                  {/* Navigation arrows */}
                  {feedbacks.length > 2 && (
                    <div className="absolute -top-16 right-0 flex gap-2">
                      <button onClick={() => scrollBy(-1)} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-luxury-text/60 hover:border-luxury-gold/40 hover:text-luxury-gold transition-all">
                        <ChevronLeft size={18} />
                      </button>
                      <button onClick={() => scrollBy(1)} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-luxury-text/60 hover:border-luxury-gold/40 hover:text-luxury-gold transition-all">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}

                  <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
                    {feedbacks.map((item, i) => (
                      <div
                        key={item._id}
                        className="flex-shrink-0 w-80 glass-card p-8 rounded-2xl flex flex-col relative group hover:border-luxury-gold/20 transition-all duration-500"
                      >
                        <Quote className="absolute top-6 right-6 text-luxury-gold/8 group-hover:text-luxury-gold/15 transition-colors" size={40} />

                        <StarRow rating={item.rating} />

                        <p className="text-luxury-text/70 italic leading-relaxed flex-grow my-6 text-sm">
                          "{item.comment}"
                        </p>

                        <div className="flex items-center gap-3 border-t border-white/6 pt-5">
                          <div className="w-9 h-9 rounded-full bg-luxury-dark border border-luxury-gold/20 flex items-center justify-center text-luxury-gold font-serif text-sm">
                            {item.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-luxury-cream font-medium text-sm">{item.name}</h4>
                            <p className="text-luxury-text/35 text-[9px] tracking-widest uppercase">Verified Guest</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 bg-luxury-dark/15 rounded-2xl border border-dashed border-luxury-gold/15">
                  <p className="text-luxury-text/35 italic">Be the first to share your experience...</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              {submitted ? (
                <div className="glass-card p-12 rounded-2xl text-center space-y-5">
                  <div className="w-16 h-16 bg-luxury-gold/15 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} className="text-luxury-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-luxury-cream">Thank You!</h3>
                  <p className="text-luxury-text/55 text-sm">Your feedback is pending approval by our concierge team.</p>
                </div>
              ) : (
                <div className="glass-card p-8 md:p-12 rounded-2xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-luxury-gold/80">Your Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder="e.g. Priya Menon" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-luxury-gold/80">Rating</label>
                        <div className="flex items-center gap-2 p-3.5 bg-luxury-dark/40 rounded-xl border border-white/8">
                          <StarRow interactive value={formData.rating} onChange={r => setFormData({ ...formData, rating: r })} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-gold/80">Your Message</label>
                      <textarea required rows="4" value={formData.comment} onChange={e => setFormData({ ...formData, comment: e.target.value })} className="input-field resize-none" placeholder="Tell us about your stay..." />
                    </div>
                    <button disabled={isSubmitting} type="submit" className="btn-primary w-full group">
                      <span>{isSubmitting ? 'Sending...' : 'Submit Feedback'}</span>
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeedbackSection;
