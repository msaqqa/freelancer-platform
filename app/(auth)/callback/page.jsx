'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCallback = async () => {
    const token = searchParams.get('token');
    const type = searchParams.get('user_type');
    const requiredData = searchParams.get('save_data');
    if (token) {
      Cookies.set('token', token);
    }

    if (type === 'client' && requiredData) {
      router.push('/client');
    } else if (type === 'freelancer' && requiredData) {
      router.push('/freelancer');
    } else if (type && !requiredData) {
      router.push('/new-user/required-data');
    } else {
      router.push('/new-user/account-type');
    }
  };

  useEffect(() => {
    if (searchParams.get('token')) {
      handleCallback();
    }
  }, [searchParams]);
}
