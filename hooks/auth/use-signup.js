import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getGoogleOAuthUrl, signupWithCredentials } from '@/services/auth/auth';
import { getSignupSchema } from '@/app/(auth)/forms/signup-schema';

// Supabase signals an existing account in two ways depending on the project's
// "prevent leaking existence" setting:
//   - protection OFF: signUp throws "User already registered"
//   - protection ON : signUp succeeds but returns user.identities === []
function isExistingUserError(error) {
  return String(error?.message ?? '')
    .toLowerCase()
    .includes('user already registered');
}

function isObfuscatedExistingUser(data) {
  const identities = data?.user?.identities;
  return Array.isArray(identities) && identities.length === 0;
}

function useSignup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('auth');

  const form = useForm({
    resolver: zodResolver(getSignupSchema(t)),
    mode: 'onBlur',
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: async (values) => {
      let data;
      try {
        data = await signupWithCredentials(values);
      } catch (error) {
        // protection OFF path: throw means the account already exists.
        if (!isExistingUserError(error)) throw error;
        data = null;
      }

      // Existing account (throw, or obfuscated empty-identities response).
      // Route to signin with a notice; signin itself handles an unconfirmed
      // account by resending the OTP and sending it on to verify-email.
      if (!data || isObfuscatedExistingUser(data)) {
        const existingError = new Error(t('existingAccountConfirmed'));
        existingError.code = 'EXISTING_ACCOUNT';
        throw existingError;
      }

      // Brand-new account → continue to verify-email.
      return { isNewUser: true };
    },
    onSuccess: () => {
      const email = form.getValues('email');
      router.push(
        `/verify-email?email=${encodeURIComponent(email)}&resent=true`,
      );
    },
    onError: (error, variables) => {
      if (error?.code === 'EXISTING_ACCOUNT') {
        const email = variables?.email;
        router.push(
          `/signin?email=${encodeURIComponent(email ?? '')}&existing=true`,
        );
      }
    },
  });

  const handleGoogleSignin = () => {
    getGoogleOAuthUrl();
  };

  return {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    passwordConfirmationVisible,
    setPasswordConfirmationVisible,
    showRecaptcha,
    setShowRecaptcha,
    error: mutation.error,
    isProcessing: mutation.isPending,
    handleGoogleSignin,
    onSubmit,
  };
}

export default useSignup;
