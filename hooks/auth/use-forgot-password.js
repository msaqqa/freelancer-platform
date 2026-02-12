import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { forgetPassword } from '@/services/auth/auth';

function useForgetPassword() {
  const { t } = useTranslation('auth');

  const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      mode: 'onBlur',
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: forgetPassword,
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

export default useForgetPassword;
