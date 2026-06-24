'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAuthUserData, signoutUser } from '@/services/auth/auth';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getAuthUserData,
    retry: 1,
    // Cache the user profile to avoid loading every time
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const signout = async () => {
    await signoutUser();
    queryClient.cancelQueries();
    queryClient.removeQueries({ queryKey: ['user-profile'] });
    router.push('/signin');
  };

  return {
    data: data?.data,
    isLoading,
    isFetching,
    isError,
    refetch,
    signout,
  };
}
