import { z } from 'zod';

export const SocialsSchema = (t) => {
  return z.object({
    socials: z.array(
      z
        .object({
          link: z
            .string()
            .trim()
            .optional()
            .refine(
              (value) => !value || z.string().url().safeParse(value).success,
              {
                message: t('invalidURL'),
              },
            ),
          social_id: z.number().optional(),
        })
        .optional(),
    ),
    otherSocialFields: z
      .array(
        z.object({
          title: z.string().optional(),
          link: z
            .string()
            .trim()
            .optional()
            .refine(
              (value) => !value || z.string().url().safeParse(value).success,
              {
                message: t('invalidURL'),
              },
            ),
        }),
      )
      .optional()
      .refine(
        (fields) => {
          return fields?.every((item) => {
            return (item.title && item.link) || (!item.title && !item.link);
          });
        },
        {
          message: t('otherSocialCondition'),
        },
      ),
  });
};
