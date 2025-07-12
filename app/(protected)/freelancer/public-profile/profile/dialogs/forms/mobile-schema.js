import { z } from 'zod';

export const MobileSchema = (t) => {
  return z.object({
    mobile: z
      .string()
      .regex(/^\d+$/, { message: t('mobileDigits') })
      .min(7, { message: t('mobileRequired') })
      .max(15, { message: t('mobileLength') }),
  });
};
