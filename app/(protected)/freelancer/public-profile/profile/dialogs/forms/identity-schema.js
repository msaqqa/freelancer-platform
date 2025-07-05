import { z } from 'zod';

export const FreelancerIdentitySchema = (t) => {
  return z.object({
    firstName: z.string().min(1, { message: t('firstNameRequired') }),
    fatherName: z.string().min(1, { message: t('fatherNameRequired') }),
    grandfatherName: z
      .string()
      .min(1, { message: t('grandfatherNameRequired') }),
    familyName: z.string().min(1, { message: t('familyNameRequired') }),
    IDNumber: z.string().min(1, { message: t('IDRequired') }),
    fullAddress: z.string().min(1, { message: t('addressRequired') }),
    image: z
      .instanceof(File, { message: t('imageRequired') })
      .refine((file) => file.size <= 800 * 800, {
        message: t('imageSize'),
      })
      .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
        message: t('imageType'),
      }),
  });
};
