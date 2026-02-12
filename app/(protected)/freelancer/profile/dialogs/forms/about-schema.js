import { z } from 'zod';

export const FreelancerAboutSchema = (t) => {
  return z.object({
    hourlyRate: z
      .string()
      .min(1, { message: t('hourlyRateRequired') })
      .regex(/^\d+(\.\d+)?$/, {
        message: t('hourlyRateNumber'),
      }),

    availability: z.boolean().optional(),

    category: z.string().min(1, { message: t('categoryRequired') }),

    subcategory: z.string().min(1, { message: t('subcategoryRequired') }),

    country: z.string().min(1, { message: t('countryRequired') }),
  });
};
