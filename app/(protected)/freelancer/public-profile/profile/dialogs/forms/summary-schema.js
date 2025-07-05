import { z } from 'zod';

export const SummarySchema = (t, bioLength = 8, imagesLength = 6) => {
  return z.object({
    bio: z
      .string()
      .max(4000, { message: t('maxBio', { bioLength }) })
      .optional(),
    imagesTitle: z.string().optional(),
    images: z
      .array(z.instanceof(File))
      .max(6, { message: t('maxImages', { imagesLength }) })
      .optional(),
    videoTitle: z.string().optional(),
    video: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          const isValidUrl = z.string().url().safeParse(value).success;
          const isYouTubeUrl =
            /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(value);
          return isValidUrl && isYouTubeUrl;
        },
        { message: t('invalidYouTubeURL') },
      ),
  });
};
