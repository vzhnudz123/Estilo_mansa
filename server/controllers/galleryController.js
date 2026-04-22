import Gallery from '../models/Gallery.js';

export const getActiveGallery = async (req, reply) => {
  try {
    const images = await Gallery.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    return reply.send(images);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const getFeaturedGallery = async (req, reply) => {
  try {
    const images = await Gallery.find({ isActive: true, isFeatured: true }).sort({ order: 1 });
    return reply.send(images);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const getAllGallery = async (req, reply) => {
  try {
    const images = await Gallery.find().sort({ order: 1, createdAt: 1 });
    return reply.send(images);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const addGalleryImage = async (req, reply) => {
  try {
    const image = new Gallery(req.body);
    await image.save();
    return reply.status(201).send(image);
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const updateGalleryImage = async (req, reply) => {
  try {
    const image = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) return reply.status(404).send({ error: 'Not found' });
    return reply.send(image);
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const deleteGalleryImage = async (req, reply) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    return reply.send({ success: true });
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};
