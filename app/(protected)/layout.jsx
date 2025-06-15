'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function ProtectedLayout({ children }) {
  // const res = await redirectUserHandler();
  const { setUser } = useUserStore();

  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user || isError) {
      router.push('/signin');
    }

    setUser({ ...user });

    if (user?.type === 'client' && user?.save_data) {
      router.push('/client');
    } else if (user?.type === 'freelancer' && user?.save_data) {
      router.push('/freelancer');
    } else if (user?.type && !user?.save_data) {
      router.push('/new-user/required-data');
    } else {
      router.push('/new-user/account-type');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return children;
}
