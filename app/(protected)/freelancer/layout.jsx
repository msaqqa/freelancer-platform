'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { ScreenLoader } from '@/components/common/screen-loader';
import { Demo1Layout } from '../../components/layouts/demo1/layout';

export default function ProtectedLayout({ children }) {
  const { data: session, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!session || isError) {
      router.push('/signin');
    }
  }, [session, isError, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return session && <Demo1Layout>{children}</Demo1Layout>;
}
