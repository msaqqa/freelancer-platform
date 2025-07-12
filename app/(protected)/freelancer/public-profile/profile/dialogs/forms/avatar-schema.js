import { z } from 'zod';

export const AvatarSchema = (t) => {
  return z.object({
    photo: z
      .instanceof(File, { message: t('photoRequired') })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        // 5MB size limit
        message: t('photoSize'),
      })
      .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: t('photoType'),
      })
      .refine(
        (file) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const isSquare = img.width === img.height;
              const isBigEnough = img.width >= 400 && img.height >= 400;
              resolve(isSquare && isBigEnough);
            };
            img.onerror = () => resolve(false);
            img.src = URL.createObjectURL(file);
          }),
        {
          message: t('photoDimensions', { minDimension: 400 }),
        },
      ),
  });
};
