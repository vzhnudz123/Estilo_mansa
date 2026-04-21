import { getUserBookings, getAllBookings, createBooking, updateBookingStatus } from '../controllers/bookingController.js'

export default async function bookingRoutes(fastify, options) {
  // Protected User Routes
  fastify.get('/my-bookings', { preValidation: [fastify.authenticate] }, getUserBookings)
  fastify.post('/', { preValidation: [fastify.authenticate] }, createBooking)
  
  // Protected Admin Routes
  fastify.get('/all', { preValidation: [fastify.requireAdmin] }, getAllBookings)
  fastify.put('/:id/status', { preValidation: [fastify.requireAdmin] }, updateBookingStatus)
}
