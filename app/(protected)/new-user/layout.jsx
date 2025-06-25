'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

function NewUserlayout({ children }) {
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user || isError) {
      router.push('/signin');
    }
    if (user?.type && !user?.save_data) {
      router.push('/new-user/required-data');
    } else if (!user?.type && !user?.save_data) {
      router.push('/new-user/account-type');
    } else {
      router.push('/404');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return children;
}

export default NewUserlayout;
