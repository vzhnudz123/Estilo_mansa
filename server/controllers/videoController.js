import Video from '../models/Video.js';

export const getActiveVideos = async (req, reply) => {
  try {
    const videos = await Video.find({ isActive: true }).sort({ order: 1 });
    return reply.send(videos);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const getAllVideos = async (req, reply) => {
  try {
    const videos = await Video.find().sort({ order: 1 });
    return reply.send(videos);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const addVideo = async (req, reply) => {
  try {
    const video = new Video(req.body);
    await video.save();
    return reply.status(201).send(video);
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const updateVideo = async (req, reply) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return reply.status(404).send({ error: 'Not found' });
    return reply.send(video);
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const deleteVideo = async (req, reply) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    return reply.send({ success: true });
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};
