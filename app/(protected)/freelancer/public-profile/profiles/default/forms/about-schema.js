import { z } from 'zod';

export const FreelancerAboutSchema = () => {
  return z.object({
    hourlyRate: z
      .string()
      .min(1, { message: 'Hourly rate is required' })
      .regex(/^\d+(\.\d+)?$/, {
        message: 'Hourly rate must be a valid number',
      }),

    availability: z.boolean().optional(),

    category: z.string().min(1, { message: 'Category is required' }),

    subcategory: z.string().min(1, { message: 'Subcategory is required' }),

    experience: z
      .string()
      .min(1, { message: 'Experience is required' })
      .max(100, { message: 'Experience cannot be more than 100 characters' })
      .regex(/^[0-9]{1,15}$/, { message: 'Experience must be a valid number' }),

    country: z.string().min(1, { message: 'Country is required' }),
  });
};
