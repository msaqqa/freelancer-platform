import { useEffect } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { resetPassword } from '@/services/auth/auth';
import { getChangePasswordSchema } from '@/app/(auth)/forms/change-password-schema';

function useResetPassword() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const emailFormat = decodeURIComponent(emailParam);
  const tokenParam = searchParams.get('token');

  useEffect(() => {
    if (!tokenParam || !emailParam) {
      redirect('/forget-password');
    }
    return;
  });

  const form = useForm({
    resolver: zodResolver(getChangePasswordSchema(t)),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values) => {
    mutation.mutate({ ...values, email: emailFormat, token: tokenParam });
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      router.push('/signin');
    },
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  return {
    t,
    form,
    error: mutation?.error?.message,
    isProcessing: mutation.isPending,
    success: mutation.isSuccess,
    onSubmit,
  };
}

export default useResetPassword;
