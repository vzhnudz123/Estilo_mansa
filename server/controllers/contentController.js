import Content from '../models/Content.js';
import { contentSchema } from '../validators/contentValidator.js';

export const getContentByKey = async (request, reply) => {
  try {
    const { key } = request.params;
    const content = await Content.findOne({ key, isActive: true });
    if (!content) return reply.code(200).send({});
    reply.code(200).send(content);
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};

export const getAllContent = async (request, reply) => {
  try {
    const contents = await Content.find();
    reply.code(200).send(contents);
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};

export const updateContent = async (request, reply) => {
  try {
    const { key } = request.params;
    const data = contentSchema.parse(request.body);
    
    // Upsert behavior: create if doesn't exist, update if it does.
    const content = await Content.findOneAndUpdate(
      { key },
      { ...data },
      { new: true, upsert: true }
    );
    
    reply.code(200).send(content);
  } catch (error) {
    if (error.errors) return reply.code(400).send({ error: error.errors });
    reply.code(500).send({ error: 'Internal server error' });
  }
};
