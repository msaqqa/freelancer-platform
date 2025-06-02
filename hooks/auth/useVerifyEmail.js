import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { resendEmailOtp, verifyEmailOtp } from '@/services/auth/auth';

function useVerifyEmail() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const email = decodeURIComponent(emailParam);
  const [errors, setErrors] = useState(null);

  const formSchema = z.object({
    otpCode: z.string().regex(/^\d{6}$/, 'Should be exactly 6 digits long'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otpCode: '',
    },
  });

  const onSubmit = (values) => {
    setErrors(null);
    verifyOtpMutation.mutate({ ...values, email });
  };

  const verifyOtpMutation = useMutation({
    mutationFn: verifyEmailOtp,
    onSuccess: (data) => {
      // store token
      Cookies.set('token', data?.data?.token);
      // redirect to main dashboard
      router.push('/new-user/account-type');
    },
    onError: (error) => {
      setErrors(error);
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: resendEmailOtp,
    onError: (error) => {
      setErrors(error);
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  const handleResetOtp = () => {
    setErrors(null);
    resendOtpMutation.mutate(email);
  };

  // const errors = verifyOtpMutation.error || resendOtpMutation.error;

  return {
    t,
    form,
    errors,
    isProcessing: verifyOtpMutation.isPending,
    isResendOtProcessing: resendOtpMutation.isPending,
    onSubmit,
    handleResetOtp,
  };
}

export default useVerifyEmail;
