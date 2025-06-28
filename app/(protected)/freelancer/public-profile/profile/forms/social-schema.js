import { z } from 'zod';

export const SocialsSchema = (t) => {
  return z.object({
    socials: z.array(
      z.object({
        link: z.string().min(1, {
          message: t('linkRequired'),
        }),
      }),
    ),
    otherSocialFields: z
      .array(
        z.object({
          title: z.string().min(1, { message: 'Title is required' }),
          link: z.string().min(1, { message: 'Title is required' }),
        }),
      )
      .optional()
      .superRefine((fields, ctx) => {
        if (fields) {
          fields.forEach((item, index) => {
            if (!item.title) {
              ctx.addIssue({
                path: [`otherSocialFields`, index, 'title'],
                message: 'Title is required',
                code: z.ZodIssueCode.custom,
              });
            }
            if (!item.link) {
              ctx.addIssue({
                path: [`otherSocialFields`, index, 'link'],
                message: 'Link is required',
                code: z.ZodIssueCode.custom,
              });
            }
          });
        }
      }),
  });
};
