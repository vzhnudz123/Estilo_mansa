import Video from '../models/Video.js';
import { normalizeMediaUrl, normalizeVideoPayload } from '../utils/mediaUrl.js';

export const getActiveVideos = async (req, reply) => {
  try {
    const videos = await Video.find({ isActive: true }).sort({ order: 1 });
    return reply.send(videos.map(normalizeVideoPayload));
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const getAllVideos = async (req, reply) => {
  try {
    const videos = await Video.find().sort({ order: 1 });
    return reply.send(videos.map(normalizeVideoPayload));
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const addVideo = async (req, reply) => {
  try {
    const video = new Video({
      ...req.body,
      url: normalizeMediaUrl(req.body?.url),
    });
    await video.save();
    return reply.status(201).send(normalizeVideoPayload(video));
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const updateVideo = async (req, reply) => {
  try {
    const payload = {
      ...req.body,
      ...(req.body?.url ? { url: normalizeMediaUrl(req.body.url) } : {}),
    };
    const video = await Video.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!video) return reply.status(404).send({ error: 'Not found' });
    return reply.send(normalizeVideoPayload(video));
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
