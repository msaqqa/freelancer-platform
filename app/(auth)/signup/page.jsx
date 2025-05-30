'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import useSignup from '@/hooks/auth/useSignup';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Icons } from '@/components/common/icons';
import { RecaptchaPopover } from '@/components/common/recaptcha-popover';

export default function Page() {
  const {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    passwordConfirmationVisible,
    setPasswordConfirmationVisible,
    showRecaptcha,
    setShowRecaptcha,
    errors,
    isProcessing,
    success,
    handleSubmit,
    handleVerifiedSubmit,
    handleGoogleSignin,
  } = useSignup();

  const error = errors?.message;
  const email = form.getValues('email');

  if (success) {
    return (
      <Alert>
        <AlertIcon>
          <Check />
        </AlertIcon>
        <AlertTitle>
          {t('siginupAlertSuccess')}{' '}
          <Link
            href={{
              pathname: '/verify-email/',
              query: { email },
            }}
            className="text-primary hover:text-primary-darker"
          >
            {t('verifyEmail')}
          </Link>
          .
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Suspense>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="block w-full space-y-5">
          <div className="space-y-1.5 pb-3">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              {t('signup')}
            </h1>
          </div>

          <div className="flex flex-col gap-3.5">
            <Button
              variant="outline"
              type="button"
              // onClick={() => signIn('google', { callbackUrl: '/' })}
              onClick={() => handleGoogleSignin()}
            >
              <Icons.googleColorful className="size-4!" /> {t('SignupGoogle')}
            </Button>
          </div>

          <div className="relative py-1.5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('or')}
              </span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('emailHolder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <div className="relative">
                  <Input
                    placeholder={t('passwordHolder')}
                    type={passwordVisible ? 'text' : 'password'}
                    {...field}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    mode="icon"
                    size="sm"
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
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('confirmPassword')}</FormLabel>
                <div className="relative">
                  <Input
                    type={passwordConfirmationVisible ? 'text' : 'password'}
                    {...field}
                    placeholder={t('passwordHolder')}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    mode="icon"
                    size="sm"
                    onClick={() =>
                      setPasswordConfirmationVisible(
                        !passwordConfirmationVisible,
                      )
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

          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="accept"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        id="accept"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />

                      <label
                        htmlFor="accept"
                        className="text-sm leading-none text-muted-foreground"
                      >
                        {t('agree')}
                      </label>
                      <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="-ms-0.5 text-sm font-semibold text-foreground hover:text-primary"
                      >
                        {t('privacyPolicy')}
                      </Link>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2.5">
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
                  {t('signup')}
                </Button>
              }
            />
          </div>

          <div className="text-sm text-muted-foreground text-center">
            {t('haveAccount')}{' '}
            <Link
              href="/signin"
              className="text-sm text-sm font-semibold text-foreground hover:text-primary"
            >
              {t('signin')}
            </Link>
          </div>
        </form>
      </Form>
    </Suspense>
  );
}
