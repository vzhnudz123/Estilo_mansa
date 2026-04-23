import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Save, X } from 'lucide-react';
import { resolveMediaUrl } from '../utils/media';

const HeroManager = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    ctaTextPrimary: 'Book Now',
    ctaTextSecondary: 'Explore Rooms',
    isActive: true,
    order: 0,
    images: []
  });
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchHeroes = async () => {
    try {
      const res = await api.get('/hero');
      setHeroes(res.data);
    } catch (err) {
      console.error("Failed to fetch heroes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (form.images.length === 0 && !editingId) {
      form.images = ['/src/assets/IMG_8813.jpeg']; // Default fallback asset
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/hero/${editingId}`, form);
        alert('Hero slide updated!');
      } else {
        await api.post('/hero', form);
        alert('Hero slide created!');
      }

      // Reset form
      setForm({
        title: '',
        subtitle: '',
        ctaTextPrimary: 'Book Now',
        ctaTextSecondary: 'Explore Rooms',
        isActive: true,
        order: 0,
        images: []
      });
      setEditingId(null);
      fetchHeroes();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Action failed: ' + (err.response?.data?.error?.[0]?.message || err.response?.data?.error || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this hero slide?')) return;
    try {
      await api.delete(`/hero/${id}`);
      fetchHeroes();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleRemoveImage = (heroId, imgUrl) => {
    // This is for local UI state before saving
    // But since images are in an array, we should probably update it in DB
    const hero = heroes.find(h => h._id === heroId);
    if (hero.images.length <= 1) {
      alert("At least one image is required.");
      return;
    }
    const newImages = hero.images.filter(url => url !== imgUrl);
    api.put(`/hero/${heroId}`, { images: newImages })
      .then(() => fetchHeroes())
      .catch(() => alert("Failed to remove image"));
  };

  const handleToggleActive = async (hero) => {
    try {
      await api.put(`/hero/${hero._id}`, { isActive: !hero.isActive });
      fetchHeroes();
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleMove = async (hero, direction) => {
    const currentIndex = heroes.findIndex(h => h._id === hero._id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= heroes.length) return;

    const targetHero = heroes[targetIndex];
    
    try {
      await Promise.all([
        api.put(`/hero/${hero._id}`, { order: targetHero.order }),
        api.put(`/hero/${targetHero._id}`, { order: hero.order })
      ]);
      fetchHeroes();
    } catch (err) {
      alert('Move failed');
    }
  };

  const startEdit = (hero) => {
    setEditingId(hero._id);
    setForm({
      title: hero.title,
      subtitle: hero.subtitle,
      ctaTextPrimary: hero.ctaTextPrimary || 'Book Now',
      ctaTextSecondary: hero.ctaTextSecondary || 'Explore Rooms',
      isActive: hero.isActive,
      order: hero.order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return null;

  return (
    <div className="space-y-10 pb-20">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          {editingId ? 'Edit Hero Slide' : 'Add New Hero Slide'}
          {editingId && (
            <button 
              onClick={() => {
                setEditingId(null); 
                setForm({title:'', subtitle:'', ctaTextPrimary:'Book Now', ctaTextSecondary:'Explore Rooms', isActive:true, order:0});
                setUploadFiles([]);
              }} 
              className="text-xs font-normal text-luxury-gold underline ml-2"
            >
              Cancel
            </button>
          )}
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-2">Title (Handwriting Animated)</label>
            <input 
              required 
              type="text" 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
              className="input-field w-full"
              placeholder="e.g. Welcome to Estilo Mansa"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-2">Subtitle</label>
            <textarea 
              required 
              rows="2"
              value={form.subtitle} 
              onChange={e => setForm({...form, subtitle: e.target.value})} 
              className="input-field w-full"
              placeholder="e.g. Your Luxury Sanctuary in Lakkidi, Wayanad"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Primary CTA (Book Now)</label>
            <input 
              type="text" 
              value={form.ctaTextPrimary} 
              onChange={e => setForm({...form, ctaTextPrimary: e.target.value})} 
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Secondary CTA (Explore)</label>
            <input 
              type="text" 
              value={form.ctaTextSecondary} 
              onChange={e => setForm({...form, ctaTextSecondary: e.target.value})} 
              className="input-field w-full"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input 
                type="checkbox" 
                checked={form.isActive} 
                onChange={e => setForm({...form, isActive: e.target.checked})} 
                className="w-5 h-5 accent-luxury-gold"
              />
              <span className="font-medium">Active (Visible on Home)</span>
            </label>
          </div>
          <div className="col-span-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`btn-primary w-full py-4 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Processing...' : (editingId ? 'Update Hero Slide' : 'Create Hero Slide')}
              {!isSubmitting && <Save size={20} />}
            </button>
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Existing Slides</h3>
        <div className="grid grid-cols-1 gap-6">
          {heroes.map((hero) => (
            <div key={hero._id} className={`flex flex-col md:flex-row gap-6 p-6 rounded-3xl border transition shadow-sm ${hero.isActive ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-200 opacity-75'}`}>
              <div className="flex-shrink-0 space-y-2">
                <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden relative group">
                  <img src={resolveMediaUrl(hero.images[0])} alt="" className="w-full h-full object-cover" />
                  {!hero.isActive && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-full text-xs uppercase">Inactive</span>
                    </div>
                  )}
                </div>
                {/* Thumbnails for additional images */}
                <div className="flex gap-2 overflow-x-auto max-w-[256px] pb-1">
                  {hero.images.map((img, i) => (
                    <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 group">
                      <img src={resolveMediaUrl(img)} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => handleRemoveImage(hero._id, img)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-luxury-dark">{hero.title}</h4>
                    <div className="flex gap-2">
                      <button onClick={() => handleMove(hero, 'up')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><ArrowUp size={18} /></button>
                      <button onClick={() => handleMove(hero, 'down')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><ArrowDown size={18} /></button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hero.subtitle}</p>
                  <div className="flex gap-4 text-xs font-medium uppercase tracking-wider">
                    <span className="bg-gray-100 px-2 py-1 rounded">Primary: {hero.ctaTextPrimary}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Secondary: {hero.ctaTextSecondary}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleToggleActive(hero)} 
                      className={`text-sm font-bold transition-colors ${hero.isActive ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {hero.isActive ? 'Set Inactive' : 'Set Active'}
                    </button>
                    <button onClick={() => startEdit(hero)} className="text-sm font-bold text-luxury-gold hover:text-luxury-gold/80 transition-colors">Edit Details</button>
                  </div>
                  <button onClick={() => handleDelete(hero._id)} className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {heroes.length === 0 && (
            <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
              No hero slides found. Create your first one above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroManager;
