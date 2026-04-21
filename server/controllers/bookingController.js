import Booking from '../models/Booking.js'
import Room from '../models/Room.js'
import { bookingSchema } from '../validators/bookingValidator.js'

export const getUserBookings = async (request, reply) => {
  try {
    const bookings = await Booking.find({ user: request.user.id }).populate('room', 'name images')
    reply.code(200).send(bookings)
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' })
  }
}

export const getAllBookings = async (request, reply) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').populate('room', 'name')
    reply.code(200).send(bookings)
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' })
  }
}

export const createBooking = async (request, reply) => {
  try {
    const data = bookingSchema.parse(request.body)
    const { roomId, checkIn, checkOut, phone, guests } = data

    // Check if room exists
    const room = await Room.findById(roomId)
    if (!room) return reply.code(404).send({ error: 'Room not found' })

    const parsedCheckIn = new Date(checkIn)
    const parsedCheckOut = new Date(checkOut)

    // Prevent double booking logic (pending or approved blocking dates)
    const existingBooking = await Booking.findOne({
      room: roomId,
      status: { $in: ['approved', 'pending'] },
      $and: [
        { checkIn: { $lt: parsedCheckOut } },
        { checkOut: { $gt: parsedCheckIn } }
      ]
    })

    if (existingBooking) {
      return reply.code(400).send({ error: 'Room is already booked or pending for these dates' })
    }

    // Calculate total price
    const msPerDay = 1000 * 60 * 60 * 24
    const days = Math.ceil((parsedCheckOut.getTime() - parsedCheckIn.getTime()) / msPerDay)
    const totalPrice = days * room.price

    const booking = new Booking({
      user: request.user.id,
      room: roomId,
      phone,
      guests,
      checkIn: parsedCheckIn,
      checkOut: parsedCheckOut,
      totalPrice,
      status: 'pending'
    })
    await booking.save()

    reply.code(201).send(booking)
  } catch (error) {
    if (error.errors) return reply.code(400).send({ error: error.errors })
    reply.code(500).send({ error: 'Internal server error' })
  }
}

export const updateBookingStatus = async (request, reply) => {
  try {
    const { status } = request.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return reply.code(400).send({ error: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(request.params.id, { status }, { new: true });
    if (!booking) return reply.code(404).send({ error: 'Booking not found' });
    reply.code(200).send(booking);
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
}
