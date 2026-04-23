import React, { useState, useEffect } from 'react';
import { Save, BookOpen } from 'lucide-react';
import api from '../api/axios';

const StoryManager = () => {
  const [story, setStory] = useState({ _id: '', title: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/story/active')
      .then(res => { 
        if (res.data) {
          setStory({ 
            _id: res.data._id,
            title: res.data.title || '', 
            description: res.data.description || '' 
          }); 
        } 
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: story.title,
        description: story.description
      };

      // Ensure we have a valid ID for update
      if (story._id && story._id !== 'update' && story._id.length === 24) {
        console.log('Updating existing story:', story._id);
        await api.put(`/story/update/${story._id}`, payload);
      } else {
        console.log('Creating new story (no valid ID found)');
        const res = await api.post('/story', {
          ...payload,
          isActive: true
        });
        if (res.data?._id) {
          setStory(prev => ({ ...prev, _id: res.data._id }));
        }
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Save failed:', err);
      const msg = err.response?.data?.error || err.message;
      alert('Failed to save: ' + msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="panel rounded-2xl overflow-hidden border-white/8">
        <div className="flex items-center gap-3 px-7 py-5 border-b border-white/6">
          <div className="w-8 h-8 rounded-lg bg-luxury-gold/10 flex items-center justify-center">
            <BookOpen size={15} className="text-luxury-gold" />
          </div>
          <div>
            <h3 className="text-luxury-cream font-medium">Our Story Content</h3>
            <p className="text-luxury-text/35 text-xs mt-0.5">Edit the title and description shown on the homepage</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="px-7 py-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-luxury-gold/70 font-semibold">
              Section Title
            </label>
            <input
              type="text"
              name="title"
              value={story.title}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. Where the Clouds Come to Rest"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-luxury-gold/70 font-semibold">
              Description
            </label>
            <textarea
              rows="6"
              name="description"
              value={story.description}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Tell the story of Estilo Mansa..."
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`btn-primary w-full !py-4 group ${saved ? '!bg-green-500/20 border-green-500/40 text-green-400' : ''}`}
          >
            <Save size={15} />
            <span>{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Story Content'}</span>
          </button>
        </form>
      </div>

      {/* Preview card */}
      {story.title && (
        <div className="panel rounded-2xl p-6 border-white/8">
          <p className="text-[9px] uppercase tracking-[0.35em] text-luxury-gold/50 mb-3">Preview</p>
          <h3 className="font-serif text-2xl text-luxury-cream mb-3">{story.title}</h3>
          <p className="text-luxury-text/55 text-sm leading-7">{story.description}</p>
        </div>
      )}
    </div>
  );
};

export default StoryManager;
