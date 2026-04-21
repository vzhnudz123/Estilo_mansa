import { z } from 'zod';

export const contentSchema = z.object({
  key: z.string().min(2, 'Key is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  metadata: z.any().optional(),
  isActive: z.boolean().optional()
});
