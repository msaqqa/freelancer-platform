import { z } from 'zod';
import { getPasswordSchema } from './password-schema';

export const getSignupSchema = (t) => {
  return z
    .object({
      email: z
        .string()
        .email({ message: t('emailInvalid') })
        .min(1, { message: t('emailRequired') }),
      password: getPasswordSchema(t),
      passwordConfirmation: z.string().min(1, {
        message: t('passwordConfirmationRequired'),
      }),
      accept: z.boolean().refine((val) => val === true, {
        message: t('acceptRequired'),
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('passwordsMismatch'),
      path: ['passwordConfirmation'],
    });
};
