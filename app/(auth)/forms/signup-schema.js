import { z } from 'zod';
import { getPasswordSchema } from './password-schema';

export const getSignupSchema = (t) => {
  return z
    .object({
      email: z
        .string({
          required_error: t('emailRequired'),
          invalid_type_error: t('emailRequired'),
        })
        .min(1, { message: t('emailRequired') })
        .email({ message: t('emailInvalid') }),
      password: getPasswordSchema(t),
      passwordConfirmation: z
        .string({
          required_error: t('passwordConfirmationRequired'),
          invalid_type_error: t('passwordConfirmationRequired'),
        })
        .min(1, {
          message: t('passwordConfirmationRequired'),
        }),
      accept: z
        .boolean({
          required_error: t('acceptRequired'),
          invalid_type_error: t('acceptRequired'),
        })
        .refine((val) => val === true, {
          message: t('acceptRequired'),
        }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('passwordsMismatch'),
      path: ['passwordConfirmation'],
    });
};
