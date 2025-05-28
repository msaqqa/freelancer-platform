import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { signupWithCredentials } from '@/services/auth/auth';
import { getSignupSchema } from '@/app/(auth)/forms/signup-schema';

function useSignup() {
  const { t } = useTranslation('auth');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const form = useForm({
    resolver: zodResolver(getSignupSchema()),
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
      accept: false,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await form.trigger();
    if (!result) return;
    setShowRecaptcha(true);
  };

  const handleVerifiedSubmit = async () => {
    const values = form.getValues();
    console.log('values', values);
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: signupWithCredentials,
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  const handleGoogleSignin = async () => {
    try {
      const googleUrl = await getGoogleOAuthUrl();
      window.location.href = googleUrl;
    } catch (err) {
      console.error('Failed to get Google login URL', err);
    }
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
    errors: mutation.error,
    isProcessing: mutation.isPending,
    success: mutation.isSuccess,
    handleSubmit,
    handleVerifiedSubmit,
    handleGoogleSignin,
  };
}

export default useSignup;
