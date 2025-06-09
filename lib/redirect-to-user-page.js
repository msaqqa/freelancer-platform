import { useRouter } from 'next/navigation';

export const RedirectHandler = ({
  isLoading,
  user,
  isError,
  type,
  requiredData,
}) => {
  const router = useRouter();

  if (isLoading) return null; // لا نعرض شيء أثناء التحميل
  if (!user || isError) {
    router.push('/signin');
    return null; // لا نعرض شيء بعد التوجيه
  }

  if (type === 'client' && requiredData) {
    router.push('/client');
  } else if (type === 'freelancer' && requiredData) {
    router.push('/freelancer');
  } else if (type && !requiredData) {
    router.push('/new-user/required-data');
  } else {
    router.push('/new-user/account-type');
  }

  return null; // إذا لم يكن هناك حاجة للتوجيه
};

export default RedirectHandler;
