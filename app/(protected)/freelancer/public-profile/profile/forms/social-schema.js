import { z } from 'zod';

export const SocialSchema = z.object({
  socialFacebook: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: 'Invalid URL',
    }),
  socialTwitter: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: 'Invalid URL',
    }),
  socialLinkedIn: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: 'Invalid URL',
    }),
  socialYoutube: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: 'Invalid URL',
    }),
});
