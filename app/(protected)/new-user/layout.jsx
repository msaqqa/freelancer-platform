'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { ScreenLoader } from '@/components/common/screen-loader';

function NewUserlayout({ children }) {
  const { data: session, isLoading, isError } = useAuth();

  // useEffect(() => {
  //   if (isLoading) return;
  //   if (!session || isError) {
  //     redirect('/signup');
  //   }
  // }, [session, isError]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return children;
}

export default NewUserlayout;
