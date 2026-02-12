import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getGoogleOAuthUrl, signupWithCredentials } from '@/services/auth/auth';
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
    mutationFn: signupWithCredentials,
    onSuccess: () => {
      const email = form.getValues('email');
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
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
