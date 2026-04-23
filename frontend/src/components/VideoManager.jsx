import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Youtube, ExternalLink } from 'lucide-react';
import api from '../api/axios';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ url: '', title: '' });
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
      await api.post('/videos', { url: form.url, title: form.title });
      setForm({ url: '', title: '' });
      fetchVideos();
    } catch { alert('Failed to add video'); }
    finally { setSaving(false); }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Delete this video?')) return;
    try { await api.delete(`/videos/${id}`); fetchVideos(); }
    catch { alert('Delete failed'); }
  };

  const getThumb = (url) => {
    try {
      const u = new URL(url);
      let id = '';
      if (u.pathname.includes('/shorts/')) id = u.pathname.split('/shorts/')[1].split('/')[0].split('?')[0];
      else if (u.searchParams.get('v')) id = u.searchParams.get('v');
      else id = u.pathname.split('/').pop();
      return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
    } catch { return null; }
  };

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="panel rounded-2xl overflow-hidden border-white/8">
        <div className="flex items-center gap-3 px-7 py-5 border-b border-white/6">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
            <Youtube size={15} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-luxury-cream font-medium">Add YouTube Short / Video</h3>
            <p className="text-luxury-text/35 text-xs mt-0.5">Paste a YouTube Shorts URL to display in the Reels section</p>
          </div>
        </div>
        <form onSubmit={handleAdd} className="px-7 py-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-luxury-gold/70 font-semibold">YouTube URL</label>
            <input
              required type="url" value={form.url}
              onChange={e => setForm({ ...form, url: e.target.value })}
              className="input-field"
              placeholder="https://youtube.com/shorts/..."
            />
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
          <Youtube size={16} className="text-red-400" />
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
              const thumb = getThumb(vid.url);
              const isYT = vid.url.includes('youtube') || vid.url.includes('youtu.be');
              return (
                <div key={vid._id} className="panel rounded-xl overflow-hidden border-white/8 group hover:border-luxury-gold/15 transition-all duration-300">
                  <div className="aspect-[9/16] bg-black/40 relative overflow-hidden">
                    {thumb ? (
                      <img src={thumb} alt={vid.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-luxury-text/20">
                        <Youtube size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {isYT && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">YouTube</span>
                      </div>
                    )}
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
