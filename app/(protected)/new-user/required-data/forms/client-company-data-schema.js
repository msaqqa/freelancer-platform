import { z } from 'zod';

export const ClientCompanyDataSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name cannot exceed 50 characters'),

  photo: z
    .instanceof(File, { message: 'Photo file is required' })
    .refine((file) => file.size <= 800 * 800, {
      message: 'Photo file must be smaller than 1MB',
    })
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
      message: 'Only JPG or PNG, formats are allowed',
    }),

  bio: z.string().optional(),

  country: z.string().min(1, 'Country is required'),

  website: z.string().url('Invalid URL format').optional(),
});
