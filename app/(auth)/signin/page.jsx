'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/auth/use-auth';
import useSignin from '@/hooks/auth/use-signin';
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
import { ScreenLoader } from '@/components/common/screen-loader';

export default function Page() {
  const {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    error,
    isProcessing,
    onSubmit,
    handleGoogleSignin,
  } = useSignin();
  const { data: user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get('email') ?? '';
  const existingAccount = searchParams.get('existing') === 'true';
  const passwordReset = searchParams.get('reset') === 'success';

  useEffect(() => {
    if (prefillEmail) {
      form.reset({
        email: prefillEmail,
        password: '',
        rememberMe: false,
      });
    }
  }, [prefillEmail, form]);

  useEffect(() => {
    // Route as soon as a user is in cache. Don't gate on isFetching: after
    // login the cache is seeded and a background refetch may be in flight, and
    // waiting for it would leave the page stuck on the loader.
    if (isLoading) return;
    if (!user) return;

    // Mirror ProtectedLayout's routing so we never land on a page that
    // immediately bounces again (which shows up as a flicker).
    if (user.type && user.save_data) {
      router.replace(`/${user.type}`);
    } else if (user.type && !user.save_data) {
      router.replace('/new-user/required-data');
    } else {
      router.replace('/new-user/account-type');
    }
  }, [user, isLoading, router]);

  // Initial load: show the loader. Once authenticated, keep showing it while
  // the redirect effect runs so the form never flashes before navigating.
  if (isLoading) {
    return <ScreenLoader />;
  }
  if (user) {
    return <ScreenLoader />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="space-y-1.5 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            {t('signin')}
          </h1>
        </div>

        <div className="flex flex-col gap-3.5">
          <Button variant="outline" type="button" onClick={handleGoogleSignin}>
            <Icons.googleColorful className="size-5! opacity-100!" />{' '}
            {t('SigninGoogle')}
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

        {passwordReset && (
          <Alert variant="success">
            <AlertIcon>
              <Check />
            </AlertIcon>
            <AlertTitle>{t('passwordResetSuccess')}</AlertTitle>
          </Alert>
        )}

        {existingAccount && (
          <Alert variant="warning">
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{t('existingAccountConfirmed')}</AlertTitle>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error.message}</AlertTitle>
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
              <div className="flex justify-between items-center gap-2.5">
                <FormLabel>{t('password')}</FormLabel>
                <Link
                  href="/forget-password"
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  {t('forgetPassword')}
                </Link>
              </div>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder={t('passwordHolder')}
                    type={passwordVisible ? 'text' : 'password'} // Toggle input type
                    {...field}
                  />
                </FormControl>

                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  size="sm"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!"
                  aria-label={
                    passwordVisible ? t('hidePassword') : t('showPassword')
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

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <>
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />

                <label
                  htmlFor="remember-me"
                  className="text-sm leading-none text-muted-foreground"
                >
                  {t('rememberMe')}
                </label>
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? <Spinner className="size-4 animate-spin" /> : null}
            {t('signin')}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          {t('dontHaveAccount')}{' '}
          <Link
            href="/signup"
            className="text-sm font-semibold text-foreground hover:text-primary"
          >
            {t('signup')}
          </Link>
        </p>
      </form>
    </Form>
  );
}
