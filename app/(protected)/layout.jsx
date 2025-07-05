'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function ProtectedLayout({ children }) {
  // const res = await redirectUserHandler();

  // const { data: user, isLoading, isError } = useAuth();
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   if (isLoading) return;

  //   if (!user || isError) {
  //     router.push('/signin');
  //   }

  //   if (user?.save_data) {
  //     if (user?.type === 'client') {
  //       if (pathname.startsWith('/client')) {
  //         router.push(pathname);
  //         return;
  //       } else {
  //         router.push('/client');
  //         return;
  //       }
  //     }

  //     if (user?.type === 'freelancer') {
  //       if (pathname.startsWith('/freelancer')) {
  //         router.push(pathname);
  //         return;
  //       } else {
  //         router.push('/freelancer');
  //         return;
  //       }
  //     }
  //   }

  //   if (!user?.save_data) {
  //     if (user?.type) {
  //       router.push('/new-user/required-data');
  //       return;
  //     } else {
  //       router.push('/new-user/account-type');
  //       return;
  //     }
  //   }
  // }, [isLoading, user, router]);

  // if (isLoading) {
  //   return <ScreenLoader />;
  // }

  return children;
}
