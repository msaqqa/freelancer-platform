import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { getGoogleOAuthUrl, signinWithCredentials } from '@/services/auth/auth';
import { getSigninSchema } from '@/app/(auth)/forms/signin-schema';

function useSignin() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const form = useForm({
    resolver: zodResolver(getSigninSchema(t)),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  });

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
      const type = data?.data?.type || null;
      const requiredData = data?.data?.save_data || null;
      if (type === 'client' && requiredData) {
        router.push('/client');
      } else if (type === 'freelancer' && requiredData) {
        router.push('/freelancer');
      } else if (type && !requiredData) {
        router.push('/new-user/required-data');
      } else {
        router.push('/new-user/account-type');
      }
    },
    onError: (error) => {
      if (error?.data?.data) {
        const is_verified = error?.data?.data?.is_verified;
        setIsVerified(is_verified);
      }
    },
  });

  const onSubmit = (values) => {
    setIsVerified(true);
    mutation.mutate(values);
  };

  const handleGoogleSignin = async () => {
    await getGoogleOAuthUrl();
  };

  return {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    errors: mutation.error,
    isProcessing: mutation.isPending,
    onSubmit,
    handleGoogleSignin,
    isVerified,
  };
}

export default useSignin;
