'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { Layout } from '../../components/layouts/layout';

export default function FreelancerLayout({ children }) {
  const { data: user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    if (user.type !== 'freelancer') {
      router.push(`/${user.type}`);
    }
  }, [user, router]);

  return (
    <Layout>
      <div className="pt-15">{children}</div>
    </Layout>
  );
}
