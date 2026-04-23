import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Calendar, Tag, Sparkles } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import api from '../api/axios';

const badge = (isOffer) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] ${
    isOffer
      ? 'bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/25'
      : 'bg-luxury-green/20 text-luxury-mist border border-luxury-green/30'
  }`}>
    {isOffer ? <Tag size={9} /> : <Calendar size={9} />}
    {isOffer ? 'Offer' : 'Event'}
  </span>
);

const EMPTY_FORM = {
  title: '',
  description: '',
  offerPrice: '',
  startDate: '',
  endDate: '',
  isActive: true,
};

const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="block text-[10px] uppercase tracking-[0.3em] text-luxury-gold/70 font-semibold">{label}</label>
    {children}
  </div>
);

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch events', err);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        offerPrice: form.offerPrice ? parseFloat(form.offerPrice) : undefined,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : undefined,
        endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
        image: '/src/assets/IMG_8813.jpeg', // Default image as per previous logic
      };
      await api.post('/events', payload);
      setForm(EMPTY_FORM);
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      const msg = err.response?.data?.error?.[0]?.message || err.response?.data?.error || err.message;
      alert('Failed: ' + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event/offer?')) return;
    try { await api.delete(`/events/${id}`); fetchEvents(); }
    catch { alert('Delete failed'); }
  };

  return (
    <div className="space-y-8">

      {/* ── Create Form Card ── */}
      <div className="panel rounded-2xl overflow-hidden border-white/8">
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-luxury-gold/10 flex items-center justify-center">
              <Plus size={15} className="text-luxury-gold" />
            </div>
            <div>
              <h3 className="text-luxury-cream font-medium">Create New Event or Offer</h3>
              <p className="text-luxury-text/35 text-xs mt-0.5">Fill the details and click Create</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(s => !s)}
            className="text-[10px] uppercase tracking-widest text-luxury-gold/60 hover:text-luxury-gold transition-colors"
          >
            {showForm ? 'Collapse' : 'Expand'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="px-7 py-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="md:col-span-2">
              <Field label="Event / Offer Title">
                <input
                  required 
                  type="text" 
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. Monsoon Special Offer"
                />
              </Field>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Field label="Description">
                <textarea
                  required 
                  name="description"
                  rows="3" 
                  value={form.description}
                  onChange={handleChange}
                  className="input-field resize-none"
                  placeholder="Tell guests what's special about this event or offer..."
                />
              </Field>
            </div>

            {/* Offer Price */}
            <Field label="Offer Price (Optional — leave empty for events)">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold/50 font-serif">₹</span>
                <input
                  type="number" 
                  name="offerPrice"
                  min="0" 
                  value={form.offerPrice}
                  onChange={handleChange}
                  className="input-field pl-9"
                  placeholder="0"
                />
              </div>
            </Field>

            {/* Start Date */}
            <Field label="Start Date & Time">
              <input
                required 
                type="datetime-local" 
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="input-field"
              />
            </Field>

            {/* End Date */}
            <Field label="End Date & Time">
              <input
                required 
                type="datetime-local" 
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="input-field"
              />
            </Field>

            {/* Active toggle */}
            <div className="flex items-center gap-3 md:col-span-2">
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, isActive: !prev.isActive }))}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${form.isActive ? 'bg-luxury-gold' : 'bg-white/15'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${form.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-luxury-text/60 text-sm">{form.isActive ? 'Active — visible to guests' : 'Inactive — hidden from guests'}</span>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full !py-4 group"
              >
                <Sparkles size={16} />
                <span>{isSubmitting ? 'Creating...' : 'Create Event / Offer'}</span>
                {!isSubmitting && <Save size={15} />}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ── Events List ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar size={17} className="text-luxury-gold" />
          <h3 className="text-luxury-cream font-medium">All Events & Offers</h3>
          <span className="ml-auto text-[10px] uppercase tracking-widest text-luxury-text/30">{events.length} total</span>
        </div>

        {events.length === 0 ? (
          <div className="panel rounded-2xl p-12 text-center border-dashed border-white/8">
            <p className="text-luxury-text/30 italic text-sm">No events yet. Create your first one above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
              <div
                key={event._id}
                className="panel rounded-2xl p-6 border-white/8 hover:border-luxury-gold/15 transition-all duration-400 relative group"
              >
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(event._id)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl bg-red-500/0 border border-transparent text-luxury-text/20 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-300"
                >
                  <Trash2 size={15} />
                </button>

                {/* Badge */}
                <div className="mb-4">{badge(!!event.offerPrice)}</div>

                <h4 className="text-luxury-cream font-medium text-base mb-2 pr-10">{event.title}</h4>
                <p className="text-luxury-text/50 text-sm leading-6 mb-4 line-clamp-2">{event.description}</p>

                {event.offerPrice && (
                  <p className="font-serif text-2xl text-luxury-gold mb-4">₹{event.offerPrice}</p>
                )}

                <div className="border-t border-white/6 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-luxury-text/35">
                    <Calendar size={11} className="text-luxury-gold/50" />
                    <span>
                      {event.startDate ? format(parseISO(event.startDate), 'MMM dd, yyyy HH:mm') : '—'}
                      {' → '}
                      {event.endDate ? format(parseISO(event.endDate), 'MMM dd, yyyy HH:mm') : '—'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${event.isActive ? 'bg-green-400' : 'bg-luxury-text/20'}`} />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-text/35">
                      {event.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManager;
