import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { getGoogleOAuthUrl, signinWithCredentials } from '@/services/auth/auth';
import { getSigninSchema } from '@/app/(auth)/forms/signin-schema';

function useSignin() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(getSigninSchema(t)),
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
      // store token in the cookies
      if (form.getValues('rememberMe')) {
        Cookies.set('token', data?.data?.token, { expires: 30 }); // 30 days
      } else {
        Cookies.set('token', data?.data?.token); // 1 session
      }
      // redirect to main dashboard
      router.push('/freelancer');
    },
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  const handleGoogleSignin = useQuery({
    queryKey: ['googleOAuth'],
    queryFn: getGoogleOAuthUrl,
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

  const { refetch: GoogleSignin } = handleGoogleSignin;

  return {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    errors: mutation.error,
    isProcessing: mutation.isPending,
    onSubmit,
    GoogleSignin,
  };
}

export default useSignin;
