import { z } from 'zod';

export const getPasswordSchema = (t, minLength = 8) => {
  return z
    .string({
      required_error: t('passwordRequired'),
      invalid_type_error: t('passwordRequired'),
    })
    .min(1, { message: t('passwordRequired') })
    .min(minLength, {
      message: t('passwordMinLength', { min: minLength }),
    })
    .regex(/[A-Z]/, {
      message: t('passwordUppercase'),
    })
    .regex(/[a-z]/, {
      message: t('passwordLowercase'),
    })
    .regex(/\d/, {
      message: t('passwordNumber'),
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: t('passwordSpecialChar'),
    });
};
