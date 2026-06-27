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
    // Honor staleTime so a freshly set cache (e.g. right after login) isn't
    // refetched on the dashboard mount — that redundant fetch is what made
    // the screen briefly flash a loader during the auth → dashboard handoff.
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const signout = async () => {
    await signoutUser();
    queryClient.cancelQueries();
    // Wipe ALL cached data, not just the profile, so the next account that
    // signs in never sees the previous user's cached pages/lists.
    queryClient.clear();
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
