import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, Youtube, ExternalLink } from 'lucide-react';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.get('/videos');
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newUrl) return;
    try {
      await api.post('/videos', { url: newUrl, title: newTitle });
      setNewUrl('');
      setNewTitle('');
      fetchVideos();
    } catch (err) {
      alert('Failed to add video');
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Delete this video link?')) return;
    try {
      await api.delete(`/videos/${id}`);
      fetchVideos();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-luxury-text/40 italic">Loading videos...</div>;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
          <Youtube size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">YouTube Video Manager</h2>
          <p className="text-sm text-gray-500">Manage vertical video cards (Shorts) on the homepage.</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[300px] space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">YouTube URL (Shorts/Regular)</label>
          <input
            required
            type="url"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
            placeholder="https://youtube.com/shorts/..."
          />
        </div>
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Video Title (Optional)</label>
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
            placeholder="e.g. Misty Mornings"
          />
        </div>
        <button type="submit" className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center gap-2">
          <Plus size={18} />
          <span>Add Video</span>
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div key={vid._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="aspect-[9/16] bg-gray-900 relative">
              <iframe
                src={`https://www.youtube.com/embed/${vid.url.split('/').pop().split('?')[0]}?controls=0&modestbranding=1`}
                className="w-full h-full pointer-events-none"
                title={vid.title}
              />
              <div className="absolute inset-0 bg-transparent" />
            </div>
            <div className="p-4 flex items-center justify-between gap-4">
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-800 truncate">{vid.title || 'Untitled Video'}</p>
                <a href={vid.url} target="_blank" rel="noreferrer" className="text-[10px] text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                  Open Original <ExternalLink size={10} />
                </a>
              </div>
              <button
                onClick={() => deleteVideo(vid._id)}
                className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex-shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoManager;
