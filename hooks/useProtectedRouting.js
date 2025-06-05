import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';

export const useProtectedRouting = () => {
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();
  const type = user?.type || null;
  const requiredData = user?.save_date || null;

  const redirectToUserPage = () => {
    if (type === 'client' && requiredData) {
      router.push('/client');
    } else if (type === 'freelancer' && requiredData) {
      router.push('/freelancer');
    } else if (type && !requiredData) {
      router.push('/new-user/required-data');
    } else {
      router.push('/new-user/account-type');
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || isError) {
      router.push('/signin');
      return;
    }

    redirectToUserPage();
  }, [isLoading, user, isError, router]);

  return { isLoading, user, redirectToUserPage };
};
