import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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
  const [timeLeft, setTimeLeft] = useState(300);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(null);

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
  });

  const handleResetOtp = () => {
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
    mutation.mutate({ ...values, email });
  };

  const mutation = useMutation({
    mutationFn: verifyEmailOtp,
    onSuccess: () => {
      // verifyOtp establishes the Supabase session automatically.
      router.push('/new-user/account-type');
    },
  });

  return {
    t,
    form,
    onSubmit,
    isProcessing: mutation.isPending,
    error: mutation.error,
    minutes,
    seconds,
    isButtonDisabled,
    handleResetOtp,
    isResendLodaing: resendOtpMutation.isPending,
  };
}

export default useVerifyEmail;
