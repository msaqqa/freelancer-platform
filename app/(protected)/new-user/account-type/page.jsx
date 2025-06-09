'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { submitAccountType } from '@/services/auth/auth';
import TypeComponent from '../components/type-component';

export default function AccountType() {
  const accountType = useUserStore((state) => state.accountType);
  const setAccountType = useUserStore((state) => state.setAccountType);
  const router = useRouter();
  const { t } = useTranslation('requiredData');

  const handleChange = (value) => {
    setAccountType(value);
  };

  const mutation = useMutation({
    mutationFn: submitAccountType,
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => {
        router.push(`/new-user/required-data`);
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async () => {
    const typeNum = accountType === 'client' ? 1 : 2;
    mutation.mutate({ type: typeNum });
  };

  const isProcessing = mutation.isPending || false;
  console.log('isProcessing', isProcessing);

  const accountTypeOptions = [
    {
      name: t('accountTypeClient'),
      lightImg: '/media/illustrations/36.svg',
      darkImg: '/media/illustrations/36-dark.svg',
      active: accountType === 1,
      value: 'client',
    },
    {
      name: t('accountTypeFreelancer'),
      lightImg: '/media/illustrations/37.svg',
      darkImg: '/media/illustrations/37-dark.svg',
      active: accountType === 2,
      value: 'freelancer',
    },
  ];

  return (
    <div className="grow-1">
      <TypeComponent
        img={{
          light: '/media/illustrations/21.svg',
          dark: '/media/illustrations/21-dark.svg',
        }}
        title={t('accountTypeTitle')}
        desc={t('accountTypeDesc')}
        options={accountTypeOptions}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isProcessing={isProcessing}
      />
    </div>
  );
}
