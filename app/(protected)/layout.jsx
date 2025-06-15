'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function ProtectedLayout({ children }) {
  // const res = await redirectUserHandler();
  // const { setUser } = useUserStore();

  const { data: session, isLoading, isError } = useAuth();
  const router = useRouter();
  const type = session?.type || null;
  const requiredData = session?.save_data || null;

  useEffect(() => {
    if (isLoading) return;

    if (!session || isError) {
      router.push('/signin');
      return;
    }

    setUser({ ...session });

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

  return children;
}
