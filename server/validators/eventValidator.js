import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  offerPrice: z.number().optional(),
  image: z.string().optional(),
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime('Invalid end date format'),
  isActive: z.boolean().optional()
}).refine(data => {
  if (!data.startDate || !data.endDate) return true;
  return new Date(data.startDate) < new Date(data.endDate);
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});
