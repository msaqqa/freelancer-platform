'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';
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
import useForgetPassword from '../../../hooks/auth/use-forgot-password';

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
    onSubmit,
  } = useForgetPassword();
  const email = form.getValues('email');

  if (success) {
    return (
      <Alert>
        <AlertIcon>
          <Check />
        </AlertIcon>
        <AlertTitle>
          Check your email to access the password reset link.
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Suspense>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="block w-full space-y-5"
        >
          <div className="text-center space-y-1 pb-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('forgetPassword')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('resetDesc')}</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {success && (
            <Alert>
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

          {/* <div className="flex flex-col gap-2.5">
            <RecaptchaPopover
              open={showRecaptcha}
              onOpenChange={(open) => {
                if (!open) {
                  setShowRecaptcha(false);
                }
              }}
              onVerify={handleVerifiedSubmit}
              trigger={
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? (
                    <Spinner className="size-4 animate-spin" />
                  ) : null}
                  {t('submit')}
                </Button>
              }
            />
          </div> */}

          <div className="flex flex-col gap-2.5">
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <Spinner className="size-4 animate-spin" />
              ) : null}
              {t('submit')}
            </Button>
          </div>

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
