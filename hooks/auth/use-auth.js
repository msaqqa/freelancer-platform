'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAuthUserData, signoutUser } from '@/services/auth/auth';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getAuthUserData,
    retry: 1,
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
    isError,
    refetch,
    signout,
  };
}
