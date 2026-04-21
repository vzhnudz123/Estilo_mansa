import { z } from 'zod';

export const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  ctaTextPrimary: z.string().optional(),
  ctaTextSecondary: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});
