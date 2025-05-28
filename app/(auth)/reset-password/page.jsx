'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';
import useResetPassword from '@/hooks/auth/useResetPassword';
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
import { RecaptchaPopover } from '@/components/common/recaptcha-popover';

export default function Page() {
  const {
    t,
    form,
    showRecaptcha,
    setShowRecaptcha,
    error,
    isProcessing,
    success,
    handleSubmit,
    handleVerifiedSubmit,
  } = useResetPassword();

  return (
    <Suspense>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="block w-full space-y-5">
          <div className="text-center space-y-1 pb-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('resetPassword')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('resetDesc')}</p>
          </div>

          {error && (
            <Alert variant="destructive" onClose={() => setError(null)}>
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {success && (
            <Alert onClose={() => setSuccess(null)}>
              <AlertIcon>
                <Check />
              </AlertIcon>
              <AlertTitle>{success}</AlertTitle>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('emailHolder')}
                    disabled={!!success || isProcessing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!!success || isProcessing}
            className="w-full"
          >
            {isProcessing ? <Spinner className="animate-spin" /> : null}
            {t('submit')}
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
    </Suspense>
  );
}
