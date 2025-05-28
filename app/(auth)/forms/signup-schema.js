import { z } from 'zod';
import { getPasswordSchema } from './password-schema';

export const getSignupSchema = () => {
  return z
    .object({
      email: z
        .string()
        .email({ message: 'Please enter a valid email address.' })
        .min(1, { message: 'Email is required.' }),
      password: getPasswordSchema(), // Uses the updated password schema with direct messages
      password_confirmation: z.string().min(1, {
        message: 'Password confirmation is required.',
      }),
      accept: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions.',
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'Passwords do not match.',
      path: ['password_confirmation'],
    });
};
