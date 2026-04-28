import Feedback from '../models/Feedback.js';
import User from '../models/User.js';
import { resolveAvatarUrl } from '../utils/avatar.js';

const normalizeFeedback = (feedback) => {
  const raw = typeof feedback.toObject === 'function' ? feedback.toObject() : feedback;
  const author = raw.user && typeof raw.user === 'object' ? raw.user : null;

  return {
    ...raw,
    user: author?._id || raw.user || null,
    name: author?.name || raw.name,
    email: author?.email || raw.email || '',
    avatarUrl: resolveAvatarUrl({
      email: author?.email || raw.email || '',
      avatarUrl: author?.avatarUrl || raw.avatarUrl || '',
    }),
  };
};

export const getApprovedFeedback = async (req, reply) => {
  try {
    const feedback = await Feedback.find({ isApproved: true })
      .populate('user', 'name email avatarUrl')
      .sort({ createdAt: -1 });
    return reply.send(feedback.map(normalizeFeedback));
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const getAllFeedback = async (req, reply) => {
  try {
    const feedback = await Feedback.find()
      .populate('user', 'name email avatarUrl')
      .sort({ createdAt: -1 });
    return reply.send(feedback.map(normalizeFeedback));
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const submitFeedback = async (req, reply) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return reply.status(400).send({ error: 'Rating and comment are required.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return reply.status(401).send({ error: 'User not found. Please log in again.' });
    }

    const feedback = new Feedback({
      user: user._id,
      name: user.name,
      email: user.email,
      avatarUrl: resolveAvatarUrl({ email: user.email, avatarUrl: user.avatarUrl }),
      rating: Number(rating),
      comment,
    });
    await feedback.save();
    return reply.status(201).send({ success: true, message: 'Thank you for your feedback! It will be reviewed shortly.' });
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const approveFeedback = async (req, reply) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true }).populate('user', 'name email avatarUrl');
    if (!feedback) return reply.status(404).send({ error: 'Not found' });
    return reply.send(normalizeFeedback(feedback));
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const rejectFeedback = async (req, reply) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { isApproved: false }, { new: true }).populate('user', 'name email avatarUrl');
    if (!feedback) return reply.status(404).send({ error: 'Not found' });
    return reply.send(normalizeFeedback(feedback));
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const deleteFeedback = async (req, reply) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    return reply.send({ success: true });
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};
