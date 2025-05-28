'use client';

import { Suspense } from 'react';
import { AlertCircle } from 'lucide-react';
import useVerifyEmail from '@/hooks/auth/useVerifyEmail';
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
  const { t, form, errors, isProcessing, onSubmit, handleResetOtp } =
    useVerifyEmail();
  const error = errors?.message;
  return (
    <Suspense>
      <div className="w-full space-y-6">
        <h1 className="text-2x font-semibold">{t('verifyEmail')}</h1>
        {error && (
          <Alert variant="destructive">
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {isProcessing && (
          <Alert>
            <AlertIcon>
              <Spinner className="size-4 animate-spin stroke-muted-foreground" />
            </AlertIcon>
            <AlertTitle>Verifying...</AlertTitle>
          </Alert>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="block w-full space-y-5"
          >
            <FormField
              control={form.control}
              name="otpCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('code')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('codeHolder')} {...field} />
                  </FormControl>
                  <FormMessage />
                  <span
                    onClick={handleResetOtp}
                    className="text-xs font-semibold text-foreground hover:text-primary cursor-pointer"
                  >
                    {t('resetOtp')}
                  </span>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isProcessing} className="w-full">
              {isProcessing ? <Spinner className="animate-spin" /> : null}
              {t('submit')}
            </Button>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}
