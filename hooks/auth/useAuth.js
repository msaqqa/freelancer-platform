import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { getAuthUserData, signoutUser } from '@/services/auth/auth';

export function useAuth() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthUserData,
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!Cookies.get('token'),
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
