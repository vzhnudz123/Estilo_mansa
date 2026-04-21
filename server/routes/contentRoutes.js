import { getContentByKey, getAllContent, updateContent } from '../controllers/contentController.js';

export default async function contentRoutes(fastify, options) {
  // Public
  fastify.get('/:key', getContentByKey);
  
  // Admin CMS
  fastify.get('/', { preValidation: [fastify.requireAdmin] }, getAllContent);
  fastify.put('/:key', { preValidation: [fastify.requireAdmin] }, updateContent);
}
