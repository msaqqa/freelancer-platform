import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { resetPassword } from '@/services/auth/auth';
import { getChangePasswordSchema } from '@/app/(auth)/forms/change-password-schema';

function useResetPassword() {
  const { t } = useTranslation('auth');
  const router = useRouter();

  // The recovery session is already established by /auth/callback before the
  // user lands here, so we only collect the new password.
  const form = useForm({
    resolver: zodResolver(getChangePasswordSchema(t)),
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      router.push('/signin');
    },
  });

  return {
    t,
    form,
    onSubmit,
    isProcessing: mutation.isPending,
    success: mutation.isSuccess,
    error: mutation.error,
  };
}

export default useResetPassword;
