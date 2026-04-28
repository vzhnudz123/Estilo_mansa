import Video from '../models/Video.js';
import { normalizeMediaUrl, normalizeVideoPayload } from '../utils/mediaUrl.js';

export const getActiveVideos = async (req, reply) => {
  try {
    const videos = await Video.find({ isActive: true }).sort({ order: 1 });
    return reply.send(videos.map(normalizeVideoPayload));
  } catch (err) {
    return reply.status(500).send({ error: 'Failed to fetch videos' });
  }
};

export const getAllVideos = async (req, reply) => {
  try {
    const videos = await Video.find().sort({ order: 1 });
    return reply.send(videos.map(normalizeVideoPayload));
  } catch (err) {
    return reply.status(500).send({ error: 'Failed to fetch all videos' });
  }
};

const validateVideoUrl = (url, type) => {
  if (!url) return false;
  if (type === 'youtube') {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url);
  }
  if (type === 'instagram') {
    return /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/.+$/.test(url);
  }
  return true;
};

export const addVideo = async (req, reply) => {
  try {
    const { url, type } = req.body;
    
    if (!validateVideoUrl(url, type)) {
      return reply.status(400).send({ error: `Invalid ${type} URL` });
    }

    const video = new Video({
      ...req.body,
      url: type === 'youtube' || type === 'instagram' ? url : normalizeMediaUrl(url),
    });
    await video.save();
    return reply.status(201).send(normalizeVideoPayload(video));
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const updateVideo = async (req, reply) => {
  try {
    const { url, type } = req.body;
    const existingVideo = await Video.findById(req.params.id);
    if (!existingVideo) return reply.status(404).send({ error: 'Not found' });

    const finalType = type || existingVideo.type;
    const finalUrl = url || existingVideo.url;

    if (url || type) {
      if (!validateVideoUrl(finalUrl, finalType)) {
        return reply.status(400).send({ error: `Invalid ${finalType} URL` });
      }
    }

    const payload = {
      ...req.body,
      ...(url ? { url: finalType === 'youtube' || finalType === 'instagram' ? url : normalizeMediaUrl(url) } : {}),
    };
    const video = await Video.findByIdAndUpdate(req.params.id, payload, { new: true });
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
