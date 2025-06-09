'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

function NewUserlayout({ children }) {
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();
  const type = user?.type || null;
  const requiredData = user?.save_data || null;

  useEffect(() => {
    if (isLoading) return;
    if (!user || isError) {
      router.push('/signin');
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
  }, [isLoading, user, type, requiredData]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return children;
}

export default NewUserlayout;
