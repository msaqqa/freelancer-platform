import { z } from 'zod';

export const getSigninSchema = (t) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t('emailRequired') })
      .email({ message: t('emailInvalid') }),
    password: z.string().min(1, { message: t('passwordRequired') }),
    rememberMe: z.boolean().optional(),
  });
};
