import React, { useState, useEffect } from 'react';
import { Trash2, Check, X, MessageSquare, Star } from 'lucide-react';
import { format } from 'date-fns';
import api from '../api/axios';

const StarDisplay = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < rating ? '#c8a96e' : 'transparent'}
        className={i < rating ? 'text-luxury-gold' : 'text-luxury-text/15'}
      />
    ))}
  </div>
);

const FeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'approved'

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('/feedback');
      setFeedbacks(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const handleApprove = async (id) => {
    try { await api.put(`/feedback/${id}/approve`); fetchFeedbacks(); }
    catch { alert('Failed to approve'); }
  };

  const handleReject = async (id) => {
    try { await api.put(`/feedback/${id}/reject`); fetchFeedbacks(); }
    catch { alert('Failed to unapprove'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this feedback?')) return;
    try { await api.delete(`/feedback/${id}`); fetchFeedbacks(); }
    catch { alert('Delete failed'); }
  };

  const filtered = feedbacks.filter(f => {
    if (filter === 'pending') return !f.isApproved;
    if (filter === 'approved') return f.isApproved;
    return true;
  });

  const pending  = feedbacks.filter(f => !f.isApproved).length;
  const approved = feedbacks.filter(f => f.isApproved).length;

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: feedbacks.length, key: 'all' },
          { label: 'Pending', value: pending, key: 'pending' },
          { label: 'Approved', value: approved, key: 'approved' },
        ].map(stat => (
          <button
            key={stat.key}
            onClick={() => setFilter(stat.key)}
            className={`panel rounded-xl p-4 text-center transition-all duration-300 border ${
              filter === stat.key ? 'border-luxury-gold/30 bg-luxury-gold/5' : 'border-white/6 hover:border-white/12'
            }`}
          >
            <p className={`font-serif text-3xl mb-1 ${filter === stat.key ? 'text-luxury-gold' : 'text-luxury-cream'}`}>
              {stat.value}
            </p>
            <p className="text-[9px] uppercase tracking-[0.3em] text-luxury-text/35">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Feedback list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="panel rounded-2xl p-12 text-center border-dashed border-white/8">
            <p className="text-luxury-text/30 text-sm italic">No feedback in this category.</p>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item._id}
              className={`panel rounded-xl p-5 border transition-all duration-300 ${
                item.isApproved ? 'border-white/6' : 'border-amber-500/15 bg-amber-500/3'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-luxury-dark border border-luxury-gold/20 flex items-center justify-center text-luxury-gold font-serif flex-shrink-0">
                  {item.name?.[0]?.toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-luxury-cream font-medium text-sm">{item.name}</span>
                    <StarDisplay rating={item.rating} />
                    <span className="text-luxury-text/30 text-[10px]">
                      {item.createdAt ? format(new Date(item.createdAt), 'MMM dd, yyyy') : ''}
                    </span>
                    {!item.isApproved && (
                      <span className="bg-amber-500/15 text-amber-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Pending
                      </span>
                    )}
                    {item.isApproved && (
                      <span className="bg-green-500/10 text-green-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-luxury-text/60 text-sm italic leading-6">"{item.comment}"</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.isApproved ? (
                    <button
                      onClick={() => handleReject(item._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 text-luxury-text/40 hover:border-white/20 hover:text-luxury-cream transition-all text-xs"
                      title="Remove from live"
                    >
                      <X size={13} /> Hide
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-green-500/25 bg-green-500/8 text-green-400 hover:bg-green-500/15 transition-all text-xs"
                      title="Approve"
                    >
                      <Check size={13} /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-luxury-text/25 hover:border-red-500/30 hover:text-red-400 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackManager;
