'use client';

import { useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';
import { Demo1Layout } from '../../components/layouts/demo1/layout';

export default function ClientLayout({ children }) {
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user || isError) router.push('/signin');
    if (user?.type !== 'client') notFound();
  }, [isLoading, user, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return user?.type === 'client' && <Demo1Layout>{children}</Demo1Layout>;
}
