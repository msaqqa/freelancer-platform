'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function ProtectedLayout({ children }) {
  const setAccountType = useUserStore((state) => state.setAccountType);
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();
  const type = user?.type || null;
  const requiredData = user?.save_data || null;

  useEffect(() => {
    if (isLoading) return;

    if (!user || isError) {
      router.push('/signin');
      return;
    }

    setAccountType(type);

    if (type === 'client' && requiredData) {
      router.push('/client');
    } else if (type === 'freelancer' && requiredData) {
      router.push('/freelancer');
    } else if (type && !requiredData) {
      router.push('/new-user/required-data');
    } else {
      router.push('/new-user/account-type');
    }
  }, [isLoading, type, requiredData, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return user && children;
  // return children;
}
