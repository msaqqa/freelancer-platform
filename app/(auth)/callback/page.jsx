'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import Cookies from 'js-cookie';

export default function AuthCallbackPage() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCallback = async () => {
    const token = searchParams.get('token');
    let data;
    if (token) {
      Cookies.set('token', data?.data?.token);
      data = await getAuthUserData();
    }
    const user = data?.data;
    setUser({ ...user });
    const type = user?.type || null;
    const requiredData = user?.save_data || null;

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
    handleCallback();
  }, [router]);

  return;
}
