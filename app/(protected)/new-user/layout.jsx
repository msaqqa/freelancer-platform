'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

function NewUserlayout({ children }) {
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // not signed in
    if (!user || isError) {
      router.replace('/signin');
      return;
    }

    // already onboarded → send to their dashboard
    if (user.save_data && user.type) {
      router.replace(user.type === 'client' ? '/client' : '/freelancer');
      return;
    }

    // picked a type but hasn't filled required data yet
    if (user.type && !pathname.startsWith('/new-user/required-data')) {
      router.replace('/new-user/required-data');
      return;
    }

    // no type yet → must choose account type first
    if (!user.type && !pathname.startsWith('/new-user/account-type')) {
      router.replace('/new-user/account-type');
    }
  }, [isLoading, isError, user, pathname, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return children;
}

export default NewUserlayout;
