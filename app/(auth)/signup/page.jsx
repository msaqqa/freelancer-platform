'use client';

import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/auth/use-auth';
import useSignup from '@/hooks/auth/use-signup';
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
    passwordConfirmationVisible,
    setPasswordConfirmationVisible,
    existingAccountEmail,
    error,
    isProcessing,
    handleGoogleSignin,
    onSubmit,
  } = useSignup();
  const { data: user, isLoading } = useAuth();
  const router = useRouter();

  // An already-authenticated user shouldn't see the signup form; send them to
  // the right place (mirrors the signin page + ProtectedLayout routing).
  useEffect(() => {
    if (isLoading) return;
    if (!user) return;

    if (user.type && user.save_data) {
      router.replace(`/${user.type}`);
    } else if (user.type && !user.save_data) {
      router.replace('/new-user/required-data');
    } else {
      router.replace('/new-user/account-type');
    }
  }, [user, isLoading, router]);

  if (isLoading || user) {
    return <ScreenLoader />;
  }

  return (
    <Suspense>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="block w-full space-y-5"
        >
          <div className="space-y-1.5 pb-3">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              {t('signup')}
            </h1>
          </div>

          <div className="flex flex-col gap-3.5">
            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleSignin}
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
              <AlertTitle>{error.message}</AlertTitle>
            </Alert>
          )}

          {existingAccountEmail && (
            <Alert variant="warning">
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{t('existingAccountConfirmed')}</AlertTitle>
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
                  <FormControl>
                    <Input
                      placeholder={t('passwordHolder')}
                      type={passwordVisible ? 'text' : 'password'}
                      {...field}
                    />
                  </FormControl>

                  <Button
                    type="button"
                    variant="ghost"
                    mode="icon"
                    size="sm"
                    onClick={() => setPasswordVisible(!passwordVisible)}
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

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('confirmPassword')}</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={passwordConfirmationVisible ? 'text' : 'password'}
                      {...field}
                      placeholder={t('passwordHolder')}
                    />
                  </FormControl>

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
                        ? t('hidePasswordConfirm')
                        : t('showPasswordConfirm')
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
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <Spinner className="size-4 animate-spin" />
              ) : null}
              {t('signup')}
            </Button>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            {t('haveAccount')}{' '}
            <Link
              href="/signin"
              className="text-sm font-semibold text-foreground hover:text-primary"
            >
              {t('signin')}
            </Link>
          </div>
        </form>
      </Form>
    </Suspense>
  );
}
