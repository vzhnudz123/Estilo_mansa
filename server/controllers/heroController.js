import Hero from '../models/Hero.js';
import { heroSchema } from '../validators/heroValidator.js';

export const getHeroes = async (request, reply) => {
  try {
    const heroes = await Hero.find().sort({ order: 1, createdAt: -1 });
    reply.code(200).send(heroes);
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};

export const getActiveHeroes = async (request, reply) => {
  try {
    const heroes = await Hero.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    reply.code(200).send(heroes);
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};

export const createHero = async (request, reply) => {
  try {
    console.log('Creating Hero with body:', request.body);
    const data = heroSchema.parse(request.body);
    
    if (data.order === undefined || data.order === 0) {
      const lastHero = await Hero.findOne().sort({ order: -1 });
      data.order = lastHero ? lastHero.order + 1 : 1;
    }
    
    const hero = new Hero(data);
    await hero.save();
    console.log('Hero created successfully:', hero._id);
    reply.code(201).send(hero);
  } catch (error) {
    console.error('Create Hero Error:', error);
    if (error.errors) return reply.code(400).send({ error: error.errors });
    reply.code(500).send({ error: error.message || 'Internal server error' });
  }
};

export const updateHero = async (request, reply) => {
  try {
    const data = heroSchema.partial().parse(request.body);
    const hero = await Hero.findByIdAndUpdate(request.params.id, data, { new: true });
    if (!hero) return reply.code(404).send({ error: 'Hero slide not found' });
    reply.code(200).send(hero);
  } catch (error) {
    if (error.errors) return reply.code(400).send({ error: error.errors });
    reply.code(500).send({ error: 'Internal server error' });
  }
};

export const deleteHero = async (request, reply) => {
  try {
    const hero = await Hero.findByIdAndDelete(request.params.id);
    if (!hero) return reply.code(404).send({ error: 'Hero slide not found' });
    reply.code(200).send({ success: true, message: 'Hero slide deleted' });
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
};
