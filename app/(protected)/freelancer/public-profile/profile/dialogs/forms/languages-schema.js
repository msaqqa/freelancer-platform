import { z } from 'zod';

export const LanguagesSchema = (t) => {
  return z.object({
    languageFields: z.array(
      z.object({
        language_id: z.string().min(1, {
          message: t('languageRequired'),
        }),
        level: z.string().min(1, t('levelRequired')),
      }),
    ),
  });
};
