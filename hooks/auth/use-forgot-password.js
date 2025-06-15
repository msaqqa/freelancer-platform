import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { forgetPassword } from '@/services/auth/auth';

function useForgetPassword() {
  const { t } = useTranslation('auth');
  const [showRecaptcha, setShowRecaptcha] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await form.trigger();
    if (!result) return;
    setShowRecaptcha(true);
  };

  const handleVerifiedSubmit = async () => {
    const values = form.getValues();
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: forgetPassword,
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
  });

  return {
    t,
    form,
    showRecaptcha,
    setShowRecaptcha,
    error: mutation?.error?.message,
    isProcessing: mutation.isPending,
    success: mutation.isSuccess,
    handleSubmit,
    handleVerifiedSubmit,
    onSubmit,
  };
}

export default useForgetPassword;
