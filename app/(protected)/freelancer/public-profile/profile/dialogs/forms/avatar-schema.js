import { z } from 'zod';

export const AvatarSchema = (t) => {
  return z.object({
    photo: z
      .instanceof(File, { message: t('photoRequired') })
      .refine((file) => file.size <= 800 * 800, {
        message: t('photoSize'),
      })
      .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: t('photoType'),
      }),
  });
};
