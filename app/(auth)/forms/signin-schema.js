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
      .min(6, { message: t('passwordMinLength', { min: 6 }) }),
    rememberMe: z.boolean().optional(),
  });
};
