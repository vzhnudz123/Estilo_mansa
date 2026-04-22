import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Trash2, Check, X, MessageSquare, Star } from 'lucide-react';
import { format } from 'date-fns';

const FeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('/feedback');
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/feedback/${id}/approve`);
      fetchFeedbacks();
    } catch (err) {
      alert('Failed to approve');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/feedback/${id}/reject`);
      fetchFeedbacks();
    } catch (err) {
      alert('Failed to reject');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this feedback?')) return;
    try {
      await api.delete(`/feedback/${id}`);
      fetchFeedbacks();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-luxury-text/40 italic">Loading feedback...</div>;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
          <MessageSquare size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Guest Feedback Manager</h2>
          <p className="text-sm text-gray-500">Review, approve, or delete guest feedback submissions.</p>
        </div>
      </div>

      <div className="space-y-4">
        {feedbacks.length > 0 ? (
          feedbacks.map((item) => (
            <div key={item._id} className={`p-6 rounded-2xl border transition-all ${item.isApproved ? 'bg-white border-gray-100' : 'bg-orange-50/30 border-orange-100'}`}>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-800">{item.name}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                      {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                    </span>
                    {!item.isApproved && (
                      <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < item.rating ? "#c8a96e" : "transparent"}
                        className={i < item.rating ? "text-luxury-gold" : "text-gray-200"}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm italic">"{item.comment}"</p>
                </div>

                <div className="flex items-center gap-2">
                  {item.isApproved ? (
                    <button
                      onClick={() => handleReject(item._id)}
                      className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all flex items-center gap-2"
                      title="Unapprove"
                    >
                      <X size={16} />
                      <span className="text-xs font-bold uppercase">Unapprove</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-all flex items-center gap-2"
                      title="Approve"
                    >
                      <Check size={16} />
                      <span className="text-xs font-bold uppercase">Approve</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    title="Delete Permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">No feedback submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackManager;
