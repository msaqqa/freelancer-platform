import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getGoogleOAuthUrl,
  resendVerificationCode,
  signupWithCredentials,
} from '@/services/auth/auth';
import { getSignupSchema } from '@/app/(auth)/forms/signup-schema';

function useSignup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('auth');

  const form = useForm({
    resolver: zodResolver(getSignupSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: async (values) => {
      try {
        return await signupWithCredentials(values);
      } catch (error) {
        const message = String(error?.message ?? '').toLowerCase();
        const alreadyRegistered =
          message.includes('already registered') ||
          message.includes('already exists') ||
          message.includes('user already registered') ||
          message.includes('user already exists');

        if (!alreadyRegistered) {
          throw error;
        }

        try {
          await resendVerificationCode(values.email);
          return { alreadyRegisteredUnconfirmed: true };
        } catch (resendError) {
          const resendMessage = String(
            resendError?.message ?? '',
          ).toLowerCase();
          const alreadyConfirmed =
            resendMessage.includes('already confirmed') ||
            resendMessage.includes('already verified') ||
            resendMessage.includes('already registered') ||
            resendMessage.includes('already exists');

          if (alreadyConfirmed) {
            const confirmedError = new Error(t('existingAccountConfirmed'));
            confirmedError.code = 'EXISTING_CONFIRMED';
            throw confirmedError;
          }

          throw resendError;
        }
      }
    },
    onSuccess: () => {
      const email = form.getValues('email');
      router.push(
        `/verify-email?email=${encodeURIComponent(email)}&resent=true`,
      );
    },
    onError: (error, variables) => {
      if (error?.code === 'EXISTING_CONFIRMED') {
        const email = variables?.email;
        router.push(
          `/signin?email=${encodeURIComponent(email ?? '')}&existing=true`,
        );
      }
    },
  });

  const handleGoogleSignin = () => {
    getGoogleOAuthUrl();
  };

  return {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    passwordConfirmationVisible,
    setPasswordConfirmationVisible,
    showRecaptcha,
    setShowRecaptcha,
    error: mutation.error,
    isProcessing: mutation.isPending,
    handleGoogleSignin,
    onSubmit,
  };
}

export default useSignup;
