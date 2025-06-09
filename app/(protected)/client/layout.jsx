'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';
import { Demo1Layout } from '../../components/layouts/demo1/layout';

export default function ProtectedLayout({ children }) {
  const { data: user, isLoading, isError } = useAuth();
  const type = user?.type || null;
  const requiredData = user?.save_data || null;
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user || isError) {
      router.push('/signin');
    }
    if (type === 'freelancer' && requiredData) {
      router.push('/freelancer');
    }
    if (type === 'freelancer' && !requiredData) {
      router.push('/new-user/required-data');
    }
  }, [isLoading, type, requiredData, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return user && <Demo1Layout>{children}</Demo1Layout>;
}
