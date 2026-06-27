import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getGoogleOAuthUrl,
  resendVerificationCode,
  signinWithCredentials,
} from '@/services/auth/auth';
import { getSigninSchema } from '@/app/(auth)/forms/signin-schema';

function useSignin() {
  const router = useRouter();
  const { t } = useTranslation('auth');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(getSigninSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // On mount, preload the saved email and set the Remember Me checkbox.
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedEmail || savedRememberMe) {
      form.reset({
        email: savedEmail ?? '',
        password: '',
        rememberMe: savedRememberMe,
      });
    }
  }, [form]);

  const queryClient = useQueryClient();

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: async (values) => {
      try {
        return await signinWithCredentials(values);
      } catch (error) {
        const message = String(error?.message ?? '').toLowerCase();
        const notConfirmed =
          message.includes('email not confirmed') ||
          message.includes('not confirmed');

        if (!notConfirmed) throw error;

        // Unconfirmed account: resend OTP, then route to verify-email.
        try {
          await resendVerificationCode(values.email);
        } catch {
          // ignore resend failure; verify-email page can resend manually.
        }
        return { needsVerification: true, email: values.email };
      }
    },
    onSuccess: (data, variables) => {
      // If email is not confirmed, redirect to verify-email.
      if (data?.needsVerification || data?.emailConfirmed === false) {
        router.push(
          `/verify-email?email=${encodeURIComponent(variables.email)}&resent=true`,
        );
        return;
      }

      // Handle "Remember Me": save email to localStorage if checked
      if (variables.rememberMe) {
        localStorage.setItem('rememberedEmail', variables.email);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberMe');
      }

      // Account-switch safety: drop any cached data left over from a previous
      // session before seeding the new user's profile, so the new account
      // never reads the previous user's cached pages/lists.
      queryClient.clear();

      // Update user profile cache so protected routes can read the authenticated user immediately.
      const profile = data?.profile;
      const user = data?.user;

      if (profile && user) {
        queryClient.setQueryData(['user-profile'], {
          data: {
            ...profile,
            email: user.email,
            type: profile.user_type,
            save_data: profile.profile_complete,
          },
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      }

      // Routing is handled by the redirect effect once the cache populates,
      // keeping a single source of truth and avoiding a double navigation.
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
