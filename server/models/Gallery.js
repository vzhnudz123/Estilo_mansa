import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  url:        { type: String, required: true },
  caption:    { type: String, default: '' },
  order:      { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isActive:   { type: Boolean, default: true },
  createdAt:  { type: Date, default: Date.now },
});

export default mongoose.model('Gallery', GallerySchema);
