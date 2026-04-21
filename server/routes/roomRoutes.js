import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from '../controllers/roomController.js'

export default async function roomRoutes(fastify, options) {
  fastify.get('/', getRooms)
  fastify.get('/:id', getRoomById)
  
  // Protected Admin Routes
  fastify.post('/', { preValidation: [fastify.requireAdmin] }, createRoom)
  fastify.put('/:id', { preValidation: [fastify.requireAdmin] }, updateRoom)
  fastify.delete('/:id', { preValidation: [fastify.requireAdmin] }, deleteRoom)
}
