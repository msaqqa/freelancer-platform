import { z } from 'zod';

export const getSigninSchema = (t) => {
  return z.object({
    email: z
      .string()
      .email({ message: t('emailInvalid') })
      .min(1, { message: t('emailRequired') }),
    password: z
      .string()
      .min(1, { message: t('passwordRequired') })
      .min(8, { message: t('passwordMinLength', { min: 8 }) }),
    rememberMe: z.boolean().optional(),
  });
};
