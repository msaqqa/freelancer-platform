import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { resendVerificationCode, verifyEmailOtp } from '@/services/auth/auth';

function useVerifyEmail() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const email = decodeURIComponent(emailParam);
  const [errors, setErrors] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          setIsButtonDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(timerId);
    return () => clearInterval(timerId);
  }, [timeLeft]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const resendOtpMutation = useMutation({
    mutationFn: resendVerificationCode,
    onSuccess: () => {
      setIsButtonDisabled(true);
      setTimeLeft(300);
      clearInterval(timer);
    },
    onError: (error) => {
      throw error?.response?.data?.message || error.message;
    },
  });

  const isResendLodaing = resendOtpMutation.isPending || false;

  const handleResetOtp = () => {
    setErrors(null);
    resendOtpMutation.mutate({ email });
  };

  const formSchema = z.object({
    otpCode: z.string().regex(/^\d{6}$/, 'Should be exactly 6 digits long'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otpCode: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (values) => {
    setErrors(null);
    verifyOtpMutation.mutate({ ...values, email });
  };

  const verifyOtpMutation = useMutation({
    mutationFn: verifyEmailOtp,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
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

  return {
    t,
    form,
    errors,
    isProcessing: verifyOtpMutation.isPending,
    minutes,
    seconds,
    isButtonDisabled,
    isResendLodaing,
    onSubmit,
    handleResetOtp,
  };
}

export default useVerifyEmail;
