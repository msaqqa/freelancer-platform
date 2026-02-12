import { z } from 'zod';

export const SkillsSchema = () => {
  return z.object({
    skills: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      )
      .optional(),
  });
};
