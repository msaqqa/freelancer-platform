'use client';

// import { useEffect } from 'react';
// import { forbidden, notFound, redirect, unauthorized, useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/auth/use-auth';
// import { ScreenLoader } from '@/components/common/screen-loader';
import { Layout } from '../../components/layouts/layout';

export default function ClientLayout({ children }) {
  // const { data: user, isLoading, isError } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  // if (!user || isError) redirect('signin'); // router.replace('signin')
  // if (user?.type !== 'client') notFound();
  // }, [user, router]);

  // if (isLoading) {
  //   return <ScreenLoader />;
  // }

  return (
    <Layout>
      <div className="pt-15">{children}</div>
    </Layout>
  );
}
