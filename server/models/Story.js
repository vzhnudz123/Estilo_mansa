import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  images:      [{ type: String }],
  order:       { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now },
});

export default mongoose.model('Story', StorySchema);
