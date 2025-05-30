import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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
    verifyOtpMutation.mutate({ ...values, email });
  };

  const verifyOtpMutation = useMutation({
    mutationFn: verifyEmailOtp,
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

  const resendOtpMutation = useMutation({
    mutationFn: resendEmailOtp,
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  const handleResetOtp = () => {
    resendOtpMutation.mutate(email);
  };

  const errors = verifyOtpMutation.error || resendOtpMutation.error;

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
