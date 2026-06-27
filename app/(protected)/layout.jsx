'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function ProtectedLayout({ children }) {
  const { data: user, isLoading, isError, isSuccess } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait while loading or on a transient error (network/DB blip). Bouncing
    // to /signin on a temporary error is what caused the flash-to-signin.
    if (isLoading || isError) return;

    // Only treat as signed-out once the query has settled with no user.
    if (isSuccess && !user) {
      router.replace('/signin');
      return;
    }
    if (!user) return;

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
  }, [isLoading, isError, isSuccess, user, pathname, router]);

  // Keep the loader on during load AND transient errors so we never flash the
  // signin page or empty content between transitions.
  if (isLoading || isError) {
    return <ScreenLoader />;
  }

  // Settled with no user → redirecting to signin; render nothing.
  if (!user) {
    return null;
  }

  // If we reach here, user is authenticated and in the correct place
  return children;
}
