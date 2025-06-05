import { z } from 'zod';

export const FreelancerRequiredDataSchema = z.object({
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

  birthDate: z
    .string()
    .min(1, 'Birth date is required')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),

  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Gender is required' }),
  }),

  country: z.string().min(1, 'Country is required'),

  mobile: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),

  category: z.string().min(1, 'Category is required'),

  subcategory: z.string().min(1, 'Subcategory is required'),

  skills: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .optional(),

  bio: z.string().optional(),

  hourlyRate: z
    .number({ invalid_type_error: 'Hourly rate must be a number' })
    .min(0, 'Hourly rate cannot be negative'),

  availability: z.boolean().optional(),
});
