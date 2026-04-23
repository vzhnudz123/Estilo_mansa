import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import { Edit3, Hotel, ImagePlus, Plus, Save, Trash2, Upload, Video, X } from 'lucide-react';

const emptyForm = {
  name: '',
  description: '',
};

const toLines = (value) => value
  .split('\n')
  .map(item => item.trim())
  .filter(Boolean);

const fromLines = (value = []) => value.join('\n');

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState('');

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get('/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const editRoom = (room) => {
    setEditingId(room._id);
    setForm({
      name: room.name || '',
      description: room.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveRoom = async (event) => {
    event.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: 1,
      capacity: 1,
      amenities: ['Room media'],
      images: editingId ? undefined : ['/src/assets/IMG_8813.jpeg'],
      videos: editingId ? undefined : []
    };

    try {
      if (editingId) {
        await api.put(`/rooms/${editingId}`, payload);
      } else {
        await api.post('/rooms', payload);
      }
      resetForm();
      fetchRooms();
    } catch (err) {
      const serverError = err.response?.data?.error;
      const details = Array.isArray(serverError)
        ? serverError.map(item => item.message).join('\n')
        : serverError;
      alert(`Room save failed.${details ? `\n\n${details}` : '\n\nPlease check title, description, and valid media URLs.'}`);
    } finally {
      setSaving(false);
    }
  };

  const deleteRoom = async (room) => {
    if (!window.confirm(`Delete ${room.name}?`)) return;
    try {
      await api.delete(`/rooms/${room._id}`);
      fetchRooms();
      if (editingId === room._id) resetForm();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-400 italic">Loading rooms...</div>;

  return (
    <div className="space-y-8">
      <form onSubmit={saveRoom} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
              <Hotel size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{isEditing ? 'Edit Room Showcase' : 'Add Room Showcase'}</h2>
              <p className="text-sm text-gray-500">Manage room details, image gallery, and room videos.</p>
            </div>
          </div>

          {isEditing && (
            <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-700">
              <X size={16} />
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <input
              required
              value={form.name}
              onChange={e => updateField('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-luxury-gold"
              placeholder="Room name"
            />
            <textarea
              required
              rows="7"
              value={form.description}
              onChange={e => updateField('description', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none focus:border-luxury-gold"
              placeholder="Room details and experience"
            />
            <div className="rounded-2xl border border-dashed border-luxury-gold/20 bg-luxury-gold/5 p-5 text-sm leading-relaxed text-gray-500">
              Only room title, description, images, and videos are published on the Rooms page.
            </div>
          </div>


        </div>

        <div className="mt-8 flex justify-end">
          <button disabled={saving} type="submit" className="bg-luxury-gold text-white px-8 py-3 rounded-xl font-bold hover:bg-luxury-gold-hover transition-all flex items-center gap-2 disabled:opacity-60">
            {saving ? <span>Saving...</span> : <><Save size={17} /> <span>{isEditing ? 'Update Room' : 'Create Room'}</span></>}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rooms.map(room => (
          <div key={room._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 h-56 bg-gray-100">
              {(room.images?.length ? room.images : ['https://images.unsplash.com/photo-1618773928120-2c15c328de8e?auto=format&fit=crop&q=80&w=800']).slice(0, 3).map((src, index) => (
                <img key={src + index} src={src} alt="" className="w-full h-full object-cover" />
              ))}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-serif text-2xl text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-500">{room.images?.length || 0} images · {room.videos?.length || 0} videos</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <Video size={14} />
                  {room.videos?.length || 0}
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-5">{room.description}</p>
              <div className="flex items-center justify-between">
                <button onClick={() => editRoom(room)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200">
                  <Edit3 size={15} />
                  Edit
                </button>
                <button onClick={() => deleteRoom(room)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-500 hover:text-white">
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {rooms.length === 0 && (
          <div className="bg-white rounded-3xl p-10 border border-dashed border-gray-200 text-center text-gray-400">
            <Plus size={34} className="mx-auto mb-3" />
            Add your first room showcase above.
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomManager;
