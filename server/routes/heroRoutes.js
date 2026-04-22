import { getHeroes, getActiveHeroes, createHero, updateHero, deleteHero } from '../controllers/heroController.js';

async function heroRoutes(fastify, options) {
  // Public route to get active slides
  fastify.get('/active', getActiveHeroes);

  // Protected routes for admin
  fastify.get('/', { preHandler: [fastify.authenticate] }, getHeroes);
  fastify.post('/', { preHandler: [fastify.authenticate] }, createHero);
  fastify.put('/:id', { preHandler: [fastify.authenticate] }, updateHero);
  fastify.delete('/:id', { preHandler: [fastify.authenticate] }, deleteHero);
}

export default heroRoutes;
