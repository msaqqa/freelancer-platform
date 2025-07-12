'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleCallback = async () => {
    const type = searchParams.get('user_type');
    const requiredData = searchParams.get('save_data');

    if (token) {
      Cookies.set('token', token);
    }

    if (requiredData) {
      if (type === 'client') {
        router.push('/client');
        return;
      }
      if (type === 'freelancer') {
        router.push('/freelancer');
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
    if (token) {
      handleCallback();
    }
  }, [searchParams]);
}
