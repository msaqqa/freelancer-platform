import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/services/auth/auth';

export function useAuth() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['auth'],
    queryFn: getUserProfile,
    onError: (error) => {
      console.error('error', error);
      throw error?.response?.data?.message || error.message;
    },
    retry: false,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!localStorage.getItem('token'),
  });

  return {
    user,
    isLoading,
    isError,
  };
}

// how to use in any page
//  const { data, isLoading, isError } = useAuth();
// if (isError) {
//     router.push('/login');
//     return null;
//   }

//   if (isLoading) {
//     return <p>جار التحقق من الجلسة...</p>;
//   }

//  const { data: user, isLoading, isError } = useAuth();
//   useEffect(() => {
//     if (!isLoading && (!user || isError)) {
//       router.replace('/login');
//     }
//   }, [user, isLoading, isError]);
