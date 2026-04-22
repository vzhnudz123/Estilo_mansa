import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, Check, X, Image as ImageIcon } from 'lucide-react';

const StoryManager = () => {
  const [story, setStory] = useState({ title: '', description: '', images: [], isActive: true });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    try {
      const res = await api.get('/story/active');
      if (res.data) setStory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (story._id) {
        await api.put(`/story/${story._id}`, story);
      } else {
        await api.post('/story', story);
      }
      alert('Story updated successfully!');
    } catch (err) {
      alert('Failed to update story');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/upload', formData);
      setStory({ ...story, images: [...story.images, res.data.url] });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = story.images.filter((_, i) => i !== index);
    setStory({ ...story, images: newImages });
  };

  if (loading) return <div className="p-8 text-center text-luxury-text/40 italic">Loading story configuration...</div>;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
          <ImageIcon size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Our Story Manager</h2>
          <p className="text-sm text-gray-500">Manage the dynamic 'Our Story' section on the homepage.</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Section Title</label>
            <input
              required
              type="text"
              value={story.title}
              onChange={e => setStory({ ...story, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold outline-none transition-all"
              placeholder="e.g. Where the Clouds Come to Rest"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Description Text</label>
            <textarea
              required
              rows="4"
              value={story.description}
              onChange={e => setStory({ ...story, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold outline-none transition-all resize-none"
              placeholder="Tell your story..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-700 flex justify-between items-center">
            <span>Story Images (Draggable in UI)</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{story.images.length} images uploaded</span>
          </label>
          
          <div className="flex flex-wrap gap-4">
            {story.images.map((img, i) => (
              <div key={i} className="relative group w-32 h-32 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            
            <label className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-luxury-gold/50 hover:bg-luxury-gold/5 transition-all cursor-pointer">
              {uploading ? (
                <div className="w-5 h-5 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus size={24} className="text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Add Image</span>
                </>
              )}
              <input type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button type="submit" className="bg-luxury-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-black/10">
            Save Story Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryManager;
