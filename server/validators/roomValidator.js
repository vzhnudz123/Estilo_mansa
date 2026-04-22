import { z } from 'zod'

export const roomSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().nonnegative('Price must be zero or greater').default(0),
  capacity: z.number().int().nonnegative('Capacity must be zero or greater').default(0),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string().url('Invalid image URL')).default([]),
  videos: z.array(z.string().url('Invalid video URL')).default([])
})
