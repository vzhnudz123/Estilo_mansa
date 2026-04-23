import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, Star, CheckCircle2, Grid } from 'lucide-react';

const getServerOrigin = () => {
  try {
    return new URL(api.defaults.baseURL).origin;
  } catch {
    return '';
  }
};

const getManagedUploadFilename = (url) => {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    const serverOrigin = getServerOrigin();

    if (serverOrigin && parsed.origin !== serverOrigin) {
      return '';
    }

    if (!parsed.pathname.startsWith('/uploads/')) {
      return '';
    }

    return parsed.pathname.split('/').pop() || '';
  } catch {
    return '';
  }
};

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get('/gallery');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/upload', formData);
      await api.post('/gallery', { url: res.data.url });
      fetchImages();
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const toggleFeatured = async (id, current) => {
    try {
      await api.put(`/gallery/${id}`, { isFeatured: !current });
      fetchImages();
    } catch (err) {
      alert('Update failed');
    }
  };

  const deleteImage = async (id, url) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const filename = getManagedUploadFilename(url);

      if (filename) {
        try {
          await api.delete(`/upload/${filename}`);
        } catch (err) {
          const status = err.response?.status;
          if (status !== 404) {
            throw err;
          }
        }
      }

      await api.delete(`/gallery/${id}`);
      fetchImages();
    } catch (err) {
      const message = err.response?.data?.error || 'Delete failed';
      alert(message);
    }
  };

  if (loading) return null;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
            <Grid size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Gallery & Highlights</h2>
            <p className="text-sm text-gray-500">Manage all gallery images and special highlights.</p>
          </div>
        </div>

        <label className="bg-luxury-gold text-white px-6 py-3 rounded-xl font-bold hover:bg-luxury-gold-hover transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-luxury-gold/20">
          {uploading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={18} />}
          <span>Upload Image</span>
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {images.map((img) => (
          <div key={img._id} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
            <img src={img.url} alt="" className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => toggleFeatured(img._id, img.isFeatured)}
                className={`p-2 rounded-full transition-all ${img.isFeatured ? 'bg-luxury-gold text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
                title={img.isFeatured ? 'Featured Image' : 'Mark as Featured'}
              >
                <Star size={16} fill={img.isFeatured ? "currentColor" : "none"} />
              </button>
              <button
                onClick={() => deleteImage(img._id, img.url)}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all"
                title="Delete Image"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {img.isFeatured && (
              <div className="absolute top-2 left-2 bg-luxury-gold text-white p-1 rounded-lg">
                <CheckCircle2 size={10} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
