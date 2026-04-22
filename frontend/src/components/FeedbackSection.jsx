import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Send, CheckCircle2 } from 'lucide-react';
import api from '../api/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('/feedback/approved');
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/feedback', formData);
      setSubmitted(true);
      setFormData({ name: '', rating: 5, comment: '' });
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 md:py-36 bg-luxury-surface relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-green/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-4">Guest Stories</p>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream leading-tight">
              Voices of <em className="font-script text-luxury-gold not-italic">Serenity</em>
            </h2>
          </motion.div>

          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="btn-outline py-3 px-8 text-xs"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {showForm ? 'View Guest Stories' : 'Share Your Experience'}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {feedbacks.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="pb-16"
                >
                  {feedbacks.map((item, index) => (
                    <SwiperSlide key={item._id}>
                      <div className="glass-card p-8 rounded-3xl h-full flex flex-col relative group transition-all duration-500 hover:border-luxury-gold/30">
                        <Quote className="absolute top-6 right-8 text-luxury-gold/10 group-hover:text-luxury-gold/20 transition-colors" size={48} />
                        
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < item.rating ? "#c8a96e" : "transparent"}
                              className={i < item.rating ? "text-luxury-gold" : "text-luxury-text/20"}
                            />
                          ))}
                        </div>

                        <p className="text-luxury-text/80 italic leading-relaxed flex-grow mb-8 text-base">
                          "{item.comment}"
                        </p>

                        <div className="flex items-center gap-4 border-t border-luxury-gold/10 pt-6">
                          <div className="w-10 h-10 rounded-full bg-luxury-dark border border-luxury-gold/20 flex items-center justify-center text-luxury-gold font-serif">
                            {item.name[0]}
                          </div>
                          <div>
                            <h4 className="text-luxury-cream font-medium text-sm">{item.name}</h4>
                            <p className="text-luxury-text/40 text-[10px] tracking-widest uppercase">Verified Guest</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="text-center py-20 bg-luxury-dark/20 rounded-3xl border border-dashed border-luxury-gold/20">
                  <p className="text-luxury-text/40 italic">Be the first to share your experience...</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              {submitted ? (
                <div className="glass-card p-12 rounded-3xl text-center space-y-6">
                  <div className="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} className="text-luxury-gold" />
                  </div>
                  <h3 className="text-2xl font-serif text-luxury-cream">Thank You!</h3>
                  <p className="text-luxury-text/60">Your feedback has been submitted and is pending approval by our concierge.</p>
                </div>
              ) : (
                <div className="glass-card p-8 md:p-12 rounded-3xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-luxury-gold font-medium ml-1">Your Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="input-field"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-luxury-gold font-medium ml-1">Rating</label>
                        <div className="flex gap-2 p-3 bg-luxury-dark/40 rounded-xl border border-luxury-gold/10">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormData({ ...formData, rating: star })}
                              className="transition-transform hover:scale-125"
                            >
                              <Star
                                size={20}
                                fill={star <= formData.rating ? "#c8a96e" : "transparent"}
                                className={star <= formData.rating ? "text-luxury-gold" : "text-luxury-text/20"}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-luxury-gold font-medium ml-1">Your Message</label>
                      <textarea
                        required
                        rows="4"
                        value={formData.comment}
                        onChange={e => setFormData({ ...formData, comment: e.target.value })}
                        className="input-field resize-none"
                        placeholder="Tell us about your stay..."
                      />
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn-primary w-full group"
                    >
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
