import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { resetPassword, signoutUser } from '@/services/auth/auth';
import { getChangePasswordSchema } from '@/app/(auth)/forms/change-password-schema';

function useResetPassword() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const queryClient = useQueryClient();

  // The recovery session is already established by /auth/callback before the
  // user lands here, so we only collect the new password.
  const form = useForm({
    resolver: zodResolver(getChangePasswordSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: async (values) => {
      await resetPassword(values);
      // Drop the recovery session so the user must sign in fresh.
      await signoutUser();
      // Clear the cached recovery-session profile too; otherwise the signin
      // page reads the stale user and routes straight to the dashboard.
      queryClient.clear();
    },
    onSuccess: () => {
      router.push('/signin?reset=success');
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
