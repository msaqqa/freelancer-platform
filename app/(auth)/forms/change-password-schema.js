import { z } from 'zod';
import { getPasswordSchema } from './password-schema';

export const getChangePasswordSchema = (t) => {
  return z
    .object({
      newPassword: getPasswordSchema(t),
      confirmPassword: z
        .string({
          required_error: t('passwordConfirmationRequired'),
          invalid_type_error: t('passwordConfirmationRequired'),
        })
        .min(1, { message: t('passwordConfirmationRequired') }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('passwordsMismatch'),
      path: ['confirmPassword'],
    });
};

export const getChangePasswordApiSchema = () => {
  return z.object({
    token: z.string().nonempty({
      message: 'A valid token is required to change the password.',
    }),
    newPassword: getPasswordSchema(),
  });
};
