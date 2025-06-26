import { z } from 'zod';

export const ClientCompanyDataSchema = (t) => {
  return z.object({
    name: z
      .string()
      .min(1, { message: t('nameRequired') })
      .max(50, { message: t('nameLength') }),

    photo: z
      .instanceof(File, { message: t('photoRequired') })
      .refine((file) => file.size <= 800 * 800, {
        message: t('photoSize'),
      })
      .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: t('photoType'),
      }),

    bio: z
      .string()
      .max(4000, { message: t('bioLength') })
      .optional(),

    country: z.string().min(1, { message: t('countryRequired') }),

    website: z
      .string()
      .url({ message: t('websiteFormat') })
      .optional(),
  });
};
