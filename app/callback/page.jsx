'use client';

import { useEffect } from 'react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { toAbsoluteUrl } from '@/lib/helpers';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleCallback = () => {
    const type = searchParams.get('user_type');
    const requiredData = searchParams.get('save_data');

    if (token) {
      Cookies.set('token', token);
    }

    if (requiredData) {
      if (type === 'client') {
        router.replace('/client');
        return;
      }
      if (type === 'freelancer') {
        router.replace('/freelancer');
        return;
      }
    }

    if (!requiredData) {
      if (type) {
        router.push('/new-user/required-data');
        return;
      } else {
        router.push('/new-user/account-type');
        return;
      }
    }
  };

  useEffect(() => {
    if (!token) return notFound();
    handleCallback();
  }, [searchParams, token]);

  return (
    <div className="flex flex-col items-center gap-2 justify-center fixed inset-0 z-50 transition-opacity duration-700 ease-in-out">
      <img
        className="h-[40px] max-w-none"
        src={toAbsoluteUrl('/media/brand-logos/google.svg')}
        alt="logo"
      />

      <div className="text-muted-foreground font-medium text-sm">
        Signed in with Google successfully. Redirecting you now...
      </div>
    </div>
  );
}
