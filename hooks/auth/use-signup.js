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
  // Email of an already-registered account; drives the inline "already
  // registered, sign in instead" notice (the user navigates manually).
  const [existingAccountEmail, setExistingAccountEmail] = useState(null);
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
    onMutate: () => {
      // Clear any previous "already registered" notice before a new attempt.
      setExistingAccountEmail(null);
    },
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
      if (!data || isObfuscatedExistingUser(data)) {
        return { existingAccount: true, email: values.email };
      }

      // Brand-new account → continue to verify-email.
      return { isNewUser: true };
    },
    onSuccess: (result) => {
      // Existing account → show an inline notice and let the user navigate.
      if (result?.existingAccount) {
        setExistingAccountEmail(result.email);
        return;
      }

      const email = form.getValues('email');
      router.push(
        `/verify-email?email=${encodeURIComponent(email)}&resent=true`,
      );
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
    existingAccountEmail,
    error: mutation.error,
    isProcessing: mutation.isPending,
    handleGoogleSignin,
    onSubmit,
  };
}

export default useSignup;
