import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Youtube, Instagram, ExternalLink } from 'lucide-react';
import api from '../api/axios';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ url: '', title: '', type: 'youtube' });
  const [saving, setSaving] = useState(false);

  const fetchVideos = async () => {
    try {
      const res = await api.get('/videos');
      setVideos(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.url) return;
    setSaving(true);
    try {
      await api.post('/videos', { ...form });
      setForm({ url: '', title: '', type: 'youtube' });
      fetchVideos();
    } catch (err) { 
      const errorMsg = err.response?.data?.error || 'Failed to add video';
      alert(errorMsg); 
    }
    finally { setSaving(false); }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Delete this video?')) return;
    try { await api.delete(`/videos/${id}`); fetchVideos(); }
    catch { alert('Delete failed'); }
  };

  const getThumb = (url, type) => {
    if (type === 'youtube') {
      try {
        const u = new URL(url);
        let id = '';
        if (u.pathname.includes('/shorts/')) id = u.pathname.split('/shorts/')[1].split('/')[0].split('?')[0];
        else if (u.searchParams.get('v')) id = u.searchParams.get('v');
        else id = u.pathname.split('/').pop();
        return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
      } catch { return null; }
    }
    // For Instagram, we don't have a reliable public thumb URL without token
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="panel rounded-2xl overflow-hidden border-white/8">
        <div className="flex items-center gap-3 px-7 py-5 border-b border-white/6">
          <div className="w-8 h-8 rounded-lg bg-luxury-gold/10 flex items-center justify-center">
            <Plus size={15} className="text-luxury-gold" />
          </div>
          <div>
            <h3 className="text-luxury-cream font-medium">Add Video Content</h3>
            <p className="text-luxury-text/35 text-xs mt-0.5">Add YouTube or Instagram videos to your gallery</p>
          </div>
        </div>
        <form onSubmit={handleAdd} className="px-7 py-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-luxury-gold/70 font-semibold">Video Type</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="input-field appearance-none cursor-pointer"
              >
                <option value="youtube" className="bg-black text-white">YouTube (Video/Shorts)</option>
                <option value="instagram" className="bg-black text-white">Instagram (Post/Reel)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-luxury-gold/70 font-semibold">Video URL</label>
              <input
                required type="url" value={form.url}
                onChange={e => setForm({ ...form, url: e.target.value })}
                className="input-field"
                placeholder={form.type === 'youtube' ? "https://youtube.com/shorts/..." : "https://instagram.com/p/..."}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-luxury-gold/70 font-semibold">Title (Optional)</label>
            <input
              type="text" value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="input-field"
              placeholder="e.g. Misty Mornings at Lakkidi"
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full !py-4 group">
            <Plus size={15} />
            <span>{saving ? 'Adding...' : 'Add Video'}</span>
          </button>
        </form>
      </div>

      {/* Video list */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Youtube size={16} className="text-luxury-gold" />
          <h3 className="text-luxury-cream font-medium">All Videos</h3>
          <span className="ml-auto text-[10px] uppercase tracking-widest text-luxury-text/30">{videos.length} total</span>
        </div>

        {videos.length === 0 ? (
          <div className="panel rounded-2xl p-10 text-center border-dashed border-white/8">
            <p className="text-luxury-text/30 text-sm italic">No videos added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map(vid => {
              const videoType = vid.type || (vid.url?.includes('youtube') || vid.url?.includes('youtu.be') ? 'youtube' : 'instagram');
              const thumb = getThumb(vid.url, videoType);
              const isYT = videoType === 'youtube';
              return (
                <div key={vid._id} className="panel rounded-xl overflow-hidden border-white/8 group hover:border-luxury-gold/15 transition-all duration-300">
                  <div className="aspect-[9/16] bg-black/40 relative overflow-hidden">
                    {thumb ? (
                      <img src={thumb} alt={vid.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-luxury-text/20 gap-2">
                        {isYT ? <Youtube size={32} /> : <Instagram size={32} />}
                        <span className="text-[9px] uppercase tracking-tighter">{videoType}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <span className={`text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${isYT ? 'bg-red-600' : 'bg-pink-600'}`}>
                        {videoType}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-luxury-cream text-xs font-medium truncate">{vid.title || 'Untitled'}</p>
                      <a href={vid.url} target="_blank" rel="noreferrer" className="text-[9px] text-luxury-text/30 hover:text-luxury-gold flex items-center gap-1 mt-0.5 transition-colors">
                        Link <ExternalLink size={8} />
                      </a>
                    </div>
                    <button
                      onClick={() => deleteVideo(vid._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-luxury-text/25 hover:border-red-500/30 hover:text-red-400 transition-all flex-shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoManager;
