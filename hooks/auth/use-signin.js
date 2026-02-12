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

  const form = useForm({
    resolver: zodResolver(getSigninSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = (values) => {
    console.log('values', values);
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: signinWithCredentials,
    onSuccess: (data) => {
      // store token in the cookies
      Cookies.set('token', data?.data?.token);
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
  });

  const handleGoogleSignin = async () => {
    await getGoogleOAuthUrl();
  };

  return {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    error: mutation.error,
    isProcessing: mutation.isPending,
    onSubmit,
    handleGoogleSignin,
  };
}

export default useSignin;
