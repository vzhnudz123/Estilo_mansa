import { getHeroes, getActiveHeroes, createHero, updateHero, deleteHero } from '../controllers/heroController.js';

async function heroRoutes(fastify, options) {
  // Public route to get active slides
  fastify.get('/active', getActiveHeroes);

  // Protected routes for admin
  fastify.get('/', { preHandler: [fastify.requireAdmin] }, getHeroes);
  fastify.post('/', { preHandler: [fastify.requireAdmin] }, createHero);
  fastify.put('/:id', { preHandler: [fastify.requireAdmin] }, updateHero);
  fastify.delete('/:id', { preHandler: [fastify.requireAdmin] }, deleteHero);
}

export default heroRoutes;
