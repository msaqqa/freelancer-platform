'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { getAuthUserData, signoutUser } from '@/services/auth/auth';

export function useAuth() {
  const router = useRouter();
  const token = Cookies.get('token');
  const hasToken = typeof token === 'string' && token.trim() !== '';
  const { setUser } = useUserStore();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthUserData,
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    onSuccess: (data) => {
      console.log('data-auth', data);
      setUser(data?.data);
    },
    onError: (error) => {
      throw error?.response?.data?.message || error.message;
    },
  });

  const signout = async () => {
    await signoutUser();
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
