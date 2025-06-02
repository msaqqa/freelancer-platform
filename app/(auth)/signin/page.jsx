'use client';

import Link from 'next/link';
import { RiErrorWarningFill } from '@remixicon/react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import useSignin from '@/hooks/auth/useSignin';
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

export default function Page() {
  const {
    t,
    form,
    passwordVisible,
    setPasswordVisible,
    errors,
    isProcessing,
    onSubmit,
    GoogleSignin,
  } = useSignin();
  const error = errors?.message;
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

        <Alert size="sm" close={false}>
          <AlertIcon>
            <RiErrorWarningFill className="text-primary" />
          </AlertIcon>
          <AlertTitle className="text-accent-foreground">
            Use <span className="text-mono font-semibold">demo@taqat.com</span>{' '}
            username and{' '}
            <span className="text-mono font-semibold">Demo@123</span> for demo
            access.
          </AlertTitle>
        </Alert>

        <div className="flex flex-col gap-3.5">
          <Button
            variant="outline"
            type="button"
            onClick={() => GoogleSignin()}
          >
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
                <Input
                  placeholder={t('passwordHolder')}
                  type={passwordVisible ? 'text' : 'password'} // Toggle input type
                  {...field}
                />

                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  size="sm"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
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
