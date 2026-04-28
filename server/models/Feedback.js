import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, trim: true, lowercase: true },
  avatarUrl:  { type: String, trim: true },
  rating:     { type: Number, required: true, min: 1, max: 5 },
  comment:    { type: String, required: true, trim: true },
  isApproved: { type: Boolean, default: false },
  createdAt:  { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', FeedbackSchema);
