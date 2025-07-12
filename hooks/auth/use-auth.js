'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { getAuthUserData, signoutUser } from '@/services/auth/auth';

export function useAuth() {
  const router = useRouter();
  const token = Cookies.get('token');
  const hasToken = typeof token === 'string' && token.trim() !== '';
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getAuthUserData,
    enabled: hasToken,
    retry: 1,
  });

  const signout = async () => {
    await signoutUser();
    queryClient.cancelQueries();
    Cookies.remove('token');
    router.push('/signin');
  };

  return {
    data: data?.data || null,
    isLoading,
    isError,
    refetch,
    signout,
  };
}
