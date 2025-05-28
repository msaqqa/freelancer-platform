import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { getGoogleOAuthUrl, signinWithCredentials } from '@/services/auth/auth';
import { getSigninSchema } from '@/app/(auth)/forms/signin-schema';

function useSignin() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(getSigninSchema()),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: signinWithCredentials,
    onSuccess: (data) => {
      // store token
      localStorage.setItem('token', data.token);
      // redirect to main dashboard
      router.push('/');
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

  const handleGoogleSignin2 = useQuery({
    queryKey: ['googleOAuth'],
    queryFn: getGoogleOAuthUrl,
    onSuccess: (data) => {
      console.log('data', data);
      window.location.href = googleUrl;
    },
  });

  return {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    errors: mutation.error,
    isProcessing: mutation.isPending,
    onSubmit,
    handleGoogleSignin,
    handleGoogleSignin2,
  };
}

export default useSignin;
