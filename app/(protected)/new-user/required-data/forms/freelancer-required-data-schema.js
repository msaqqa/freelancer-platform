import { z } from 'zod';

export const FreelancerRequiredDataSchema = (t) => {
  return z.object({
    name: z
      .string()
      .min(1, { message: t('nameRequired') })
      .max(50, { message: t('nameLength') }),

    photo: z
      .instanceof(File, { message: t('photoRequired') })
      .refine((file) => file.size <= 800 * 800, { message: t('photoSize') })
      .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: t('photoType'),
      }),

    birthDate: z
      .string()
      .min(1, { message: t('birthDateRequired') })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: t('birthDateFormat'),
      }),

    gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: t('genderRequired') }),
    }),

    country: z.string().min(1, { message: t('countryRequired') }),

    category: z.string().min(1, { message: t('categoryRequired') }),

    subcategory: z.string().min(1, { message: t('subcategoryRequired') }),

    skills: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      )
      .optional(),

    bio: z
      .string()
      .max(4000, { message: t('bioLength') })
      .optional(),

    hourlyRate: z
      .string()
      .min(0, { message: t('hourlyRateRequired') })
      .regex(/^\d+(\.\d+)?$/, { message: t('hourlyRateDigits') }),

    availability: z.boolean().optional(),
  });
};
