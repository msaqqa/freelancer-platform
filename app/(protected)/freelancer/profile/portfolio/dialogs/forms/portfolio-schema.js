import { z } from 'zod';

export const ProjectFieldsSchema = (t) => {
  return z.object({
    projectFields: z
      .array(
        z
          .object({
            type: z.enum(['text', 'image']),
            value: z.string().optional(),
            file: z.any().optional(),
          })
          .superRefine((block, ctx) => {
            if (block.type === 'text' && !block.value?.trim()) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t('textRequired'),
                path: ['value'],
              });
            }
            if (block.type === 'image' && !block.file) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t('projectImageRequired'),
                path: ['file'],
              });
            }
          }),
      )
      .min(2),
    title: z.string().optional(),
    skills: z.any().optional(),
    projectCover: z.any().optional(),
  });
};
