'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function ProtectedLayout({ children }) {
  const { data: session, isLoading, isError } = useAuth();
  const router = useRouter();
  const userType = session?.user?.role || '';

  useEffect(() => {
    if (isLoading) return;

    if (!session || isError) {
      router.push('/signin');
      return;
    }

    if (userType === 'client') {
      router.replace('/client');
    } else if (userType === 'freelancer') {
      router.replace('/freelancer');
    } else {
      router.replace('/new-user/required-data');
    }
  }, [isLoading, userType, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return <>{children}</>;
}
