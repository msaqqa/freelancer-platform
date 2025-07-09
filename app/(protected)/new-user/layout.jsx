'use client';

import { useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

function NewUserlayout({ children }) {
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user || isError) router.push('/signin');
    if (!user?.save_data) {
      if (user?.type) {
        router.push('/new-user/required-data');
      } else {
        router.push('/new-user/account-type');
      }
    }
    if (user?.save_data && user?.type) notFound();
  }, [isLoading, user, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return children;
}

export default NewUserlayout;
