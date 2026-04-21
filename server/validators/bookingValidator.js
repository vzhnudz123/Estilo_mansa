import { z } from 'zod'

export const bookingSchema = z.object({
  roomId: z.string().min(24, 'Invalid Room ID'),
  phone: z.string().min(10, 'Phone number must be valid'),
  guests: z.number().int().positive('Guests must be a positive number'),
  checkIn: z.string().datetime('Invalid check-in date format'),
  checkOut: z.string().datetime('Invalid check-out date format')
}).refine(data => new Date(data.checkIn) < new Date(data.checkOut), {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});
