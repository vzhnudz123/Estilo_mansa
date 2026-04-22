import Feedback from '../models/Feedback.js';

export const getApprovedFeedback = async (req, reply) => {
  try {
    const feedback = await Feedback.find({ isApproved: true }).sort({ createdAt: -1 });
    return reply.send(feedback);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const getAllFeedback = async (req, reply) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    return reply.send(feedback);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const submitFeedback = async (req, reply) => {
  try {
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return reply.status(400).send({ error: 'Name, rating, and comment are required.' });
    }
    const feedback = new Feedback({ name, rating: Number(rating), comment });
    await feedback.save();
    return reply.status(201).send({ success: true, message: 'Thank you for your feedback! It will be reviewed shortly.' });
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const approveFeedback = async (req, reply) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!feedback) return reply.status(404).send({ error: 'Not found' });
    return reply.send(feedback);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const rejectFeedback = async (req, reply) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { isApproved: false }, { new: true });
    if (!feedback) return reply.status(404).send({ error: 'Not found' });
    return reply.send(feedback);
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
