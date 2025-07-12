import { z } from 'zod';

export const LanguagesSchema = (t) => {
  return z.object({
    languageFields: z
      .array(
        z.object({
          language_id: z.string().min(1, {
            message: t('languageRequired'),
          }),
          level: z.string().min(1, t('levelRequired')),
        }),
      )
      .superRefine((languages, ctx) => {
        const ids = languages.map((lang) => lang.language_id);
        ids.forEach((id, index) => {
          if (id && ids.indexOf(id) !== index) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t('languageDuplicate'),
              path: [index, 'language_id'],
            });
          }
        });
      }),
  });
};
