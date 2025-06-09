'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import useResetPassword from '@/hooks/auth/use-reset-password';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinners';

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(false);

  const { t, form, error, isProcessing, onSubmit } = useResetPassword();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-4"
      >
        <div className="text-center space-y-1 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t('resetPassword')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('resetPasswordDesc')}
          </p>
        </div>

        {error && (
          <div className="text-center space-y-6">
            <Alert variant="destructive">
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          </div>
        )}

        {/* {successMessage && (
          <Alert>
            <AlertIcon>
              <Check />
            </AlertIcon>
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        )} */}

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('newPassword')}</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder={t('newPasswordHolder')}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                  aria-label={
                    passwordVisible ? 'Hide password' : 'Show password'
                  }
                >
                  {passwordVisible ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmNewPassword')}</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={passwordConfirmationVisible ? 'text' : 'password'}
                    placeholder={t('confirmNewPassword')}
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() =>
                    setPasswordConfirmationVisible(!passwordConfirmationVisible)
                  }
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                  aria-label={
                    passwordConfirmationVisible
                      ? 'Hide password confirmation'
                      : 'Show password confirmation'
                  }
                >
                  {passwordConfirmationVisible ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isProcessing} className="w-full">
          {isProcessing && <Spinner className="size-4 animate-spin" />}
          {t('resetPassword')}
        </Button>
        <div className="space-y-3">
          <Button type="button" variant="outline" className="w-full" asChild>
            <Link href="/signin">
              <ArrowLeft className="size-3.5" /> {t('back')}
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
