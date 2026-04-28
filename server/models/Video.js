import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  url:       { type: String, required: true },
  title:     { type: String, default: '' },
  type:      { type: String, enum: ['youtube', 'instagram'], default: 'youtube' },
  order:     { type: Number, default: 0 },
  isActive:  { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Video', VideoSchema);
