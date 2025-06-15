'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/auth/use-auth';
import { submitAccountType } from '@/services/auth/auth';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import TypeComponent from './components/type-component';

export default function AccountType() {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { t } = useTranslation('requiredData');
  const { refetch } = useAuth();

  const handleChange = (value) => {
    setUser({ type: value });
  };

  const mutation = useMutation({
    mutationFn: submitAccountType,
    onSuccess: async (data) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{data?.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
      await refetch();
      setTimeout(() => {
        router.replace(`/new-user/required-data`);
      }, 1000);
    },
    onError: (error) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    },
  });

  const handleSubmit = async () => {
    const typeNum = user?.type === 'client' ? 1 : 2;
    mutation.mutate({ type: typeNum });
  };

  const isProcessing = mutation.isPending || false;

  const accountTypeOptions = [
    {
      name: t('accountTypeClient'),
      lightImg: '/media/illustrations/36.svg',
      darkImg: '/media/illustrations/36-dark.svg',
      active: user?.type === 'client',
      value: 'client',
    },
    {
      name: t('accountTypeFreelancer'),
      lightImg: '/media/illustrations/37.svg',
      darkImg: '/media/illustrations/37-dark.svg',
      active: user?.type === 'freelancer',
      value: 'freelancer',
    },
  ];

  return (
    <div className="w-full h-screen min-h-fit py-8 lg:py-10">
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
