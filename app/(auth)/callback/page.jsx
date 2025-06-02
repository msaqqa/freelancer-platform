'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCallback = () => {
    const token = searchParams.get('token');
    if (token) {
      Cookies.set('token', token);
      router.push('/freelancer');
    } else {
      console.error('Token not found in URL');
    }
  };

  useEffect(() => {
    handleCallback();
  }, [router]);

  return;
}
