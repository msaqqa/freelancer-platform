import { notFound, redirect } from 'next/navigation';
import { getAuthUserData } from '@/services/auth/auth';

export const redirectUserHandler = async () => {
  const response = await getAuthUserData();
  console.log('response', response);

  if (!response.ok) {
    notFound();
  }

  const user = await response?.data?.data;
  const type = user?.type;
  const requiredData = user?.save_data;

  if (type === 'client' && requiredData) {
    redirect('/client');
  } else if (type === 'freelancer' && requiredData) {
    redirect('/freelancer');
  } else if (type && !requiredData) {
    redirect('/new-user/required-data');
  } else {
    redirect('/new-user/account-type');
  }
};
