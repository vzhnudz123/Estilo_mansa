import { getActiveEvents, getAllEvents, createEvent, deleteEvent } from '../controllers/eventController.js';

export default async function eventRoutes(fastify, options) {
  fastify.get('/active', getActiveEvents);
  
  fastify.get('/', { preValidation: [fastify.requireAdmin] }, getAllEvents);
  fastify.post('/', { preValidation: [fastify.requireAdmin] }, createEvent);
  fastify.delete('/:id', { preValidation: [fastify.requireAdmin] }, deleteEvent);
}
