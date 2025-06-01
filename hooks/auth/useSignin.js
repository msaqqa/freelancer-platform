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
    onSuccess: ({ data }) => {
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
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log('data', data);
      window.location.href = googleUrl;
    },
  });

  const { refetch: GoogleSignin } = handleGoogleSignin2;

  return {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    errors: mutation.error,
    isProcessing: mutation.isPending,
    onSubmit,
    handleGoogleSignin,
    GoogleSignin,
  };
}

export default useSignin;
