import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, Youtube, ExternalLink, Video, Upload, CheckCircle2 } from 'lucide-react';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [uploading, setUploading] = useState(false);

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

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!newUrl) return;
    try {
      await api.post('/videos', { url: newUrl, title: newTitle });
      setNewUrl('');
      setNewTitle('');
      fetchVideos();
    } catch (err) {
      alert('Failed to add video link');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file); // API expects 'image' field for uploads

    try {
      const res = await api.post('/upload', formData);
      const videoUrl = res.data.url;
      
      // Create video record in DB
      await api.post('/videos', { 
        url: videoUrl, 
        title: newTitle || file.name 
      });
      
      setNewTitle('');
      fetchVideos();
      alert('Video uploaded successfully!');
    } catch (err) {
      alert('Video upload failed. Max size 500MB.');
    } finally {
      setUploading(false);
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Delete this video?')) return;
    try {
      await api.delete(`/videos/${id}`);
      fetchVideos();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-luxury-text/40 italic">Loading video suite...</div>;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
            <Video size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Experience Video Suite</h2>
            <p className="text-sm text-gray-500">Manage YouTube shorts or direct MP4 uploads for the Jeep Adventure.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Link Section */}
        <form onSubmit={handleAddLink} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Youtube size={16} />
            <span>Add YouTube Link</span>
          </h3>
          <input
            required
            type="url"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
            placeholder="https://youtube.com/shorts/..."
          />
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
            placeholder="Title (e.g. Jeep Adventure)"
          />
          <button type="submit" className="w-full bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2">
            <Plus size={18} />
            <span>Add YouTube Video</span>
          </button>
        </form>

        {/* Upload Section */}
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Upload size={16} />
            <span>Direct Video Upload</span>
          </h3>
          <div className="relative group">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-luxury-gold/5 hover:border-luxury-gold/50 transition-all">
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold text-luxury-gold animate-pulse">Uploading Large File...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={32} className="text-gray-300 group-hover:text-luxury-gold transition-colors" />
                  <span className="text-xs text-gray-400 font-medium text-center">Click to upload MP4/MOV<br/>(Max 500MB)</span>
                </div>
              )}
              <input type="file" className="hidden" accept="video/*" onChange={handleFileUpload} disabled={uploading} />
            </label>
          </div>
          <p className="text-[10px] text-gray-400 text-center italic">
            Tip: Include "Jeep" in the title to show it in the Adventure section.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div key={vid._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="aspect-[9/16] bg-gray-900 relative">
              {vid.url.includes('youtube.com') || vid.url.includes('youtu.be') ? (
                <iframe
                  src={`https://www.youtube.com/embed/${vid.url.split('/').pop().split('?')[0]}?controls=0&modestbranding=1`}
                  className="w-full h-full pointer-events-none"
                  title={vid.title}
                />
              ) : (
                <video src={vid.url} className="w-full h-full object-cover" controls={false} muted loop autoPlay />
              )}
              <div className="absolute top-4 left-4">
                {vid.title?.toLowerCase().includes('jeep') && (
                  <div className="bg-luxury-gold text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                    <CheckCircle2 size={10} />
                    Jeep Section
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 flex items-center justify-between gap-4">
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-800 truncate">{vid.title || 'Untitled Video'}</p>
                <a href={vid.url} target="_blank" rel="noreferrer" className="text-[10px] text-gray-400 hover:text-luxury-gold flex items-center gap-1 transition-colors">
                  {vid.url.includes('youtube.com') ? 'YouTube' : 'Direct Link'} <ExternalLink size={10} />
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
