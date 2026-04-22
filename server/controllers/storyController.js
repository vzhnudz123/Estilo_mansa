import Story from '../models/Story.js';

export const getActiveStory = async (req, reply) => {
  try {
    const story = await Story.findOne({ isActive: true }).sort({ order: 1 });
    return reply.send(story || null);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const getAllStories = async (req, reply) => {
  try {
    const stories = await Story.find().sort({ order: 1, createdAt: -1 });
    return reply.send(stories);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};

export const createStory = async (req, reply) => {
  try {
    const story = new Story(req.body);
    await story.save();
    return reply.status(201).send(story);
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const updateStory = async (req, reply) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!story) return reply.status(404).send({ error: 'Not found' });
    return reply.send(story);
  } catch (err) {
    return reply.status(400).send({ error: err.message });
  }
};

export const deleteStory = async (req, reply) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    return reply.send({ success: true });
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
};
