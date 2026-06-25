'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function ProtectedLayout({ children }) {
  const { data: user, isLoading, isFetching, isError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!user || isError) {
      router.replace('/signin');
      return;
    }

    // New user: no account type selected yet
    if (!user.type) {
      if (!pathname.startsWith('/new-user/account-type')) {
        router.replace('/new-user/account-type');
      }
      return;
    }

    // New user: account type selected but required data not filled
    if (user.type && !user.save_data) {
      if (!pathname.startsWith('/new-user/required-data')) {
        router.replace('/new-user/required-data');
      }
      return;
    }

    // Fully onboarded user: redirect to their dashboard
    if (user.type && user.save_data) {
      const userDashboard = `/${user.type}`;

      // Already in correct dashboard: do nothing
      if (pathname.startsWith(userDashboard)) {
        return;
      }

      // In new-user flow but already done: go to dashboard
      if (pathname.startsWith('/new-user')) {
        router.replace(userDashboard);
        return;
      }

      // Any other path: send to correct dashboard
      router.replace(userDashboard);
      return;
    }
  }, [isLoading, user, isError, pathname, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  // Show nothing while redirecting (prevents flash of content)
  if (!user || isError) {
    return null;
  }

  // If we reach here, user is authenticated and in the correct place
  return children;
}
