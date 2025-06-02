import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getAuthUserData, signupWithCredentials } from '@/services/auth/auth';
import { getSignupSchema } from '@/app/(auth)/forms/signup-schema';

function useSignup() {
  const { t } = useTranslation('auth');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const form = useForm({
    resolver: zodResolver(getSignupSchema(t)),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      accept: false,
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await form.trigger();
    if (!result) return;
    setShowRecaptcha(true);
  };

  const handleVerifiedSubmit = async () => {
    const values = form.getValues();
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: signupWithCredentials,
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  const handleGoogleSignup = useQuery({
    queryKey: ['googleOAuth'],
    queryFn: getAuthUserData,
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        Cookies.set('token', token);
        router.push('/freelancer');
      }
    },
  });

  const { refetch: GoogleSignin } = handleGoogleSignup;

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
    GoogleSignin,
    onSubmit,
  };
}

export default useSignup;
