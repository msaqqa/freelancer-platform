'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getFreelancerProfile } from '@/services/freelancer/profile';
import { Skeleton } from '@/components/ui/skeleton';

export function WelcomeHeader() {
  const { t } = useTranslation('freelancerDashboard');

  // Shares the cache with the profile page (same query key).
  const { data, isLoading } = useQuery({
    queryKey: ['freelancer-profile'],
    queryFn: getFreelancerProfile,
    staleTime: 1000 * 60,
  });
  const name = data?.data?.name ?? '';

  return (
    <div className="flex flex-col gap-1">
      {isLoading ? (
        <Skeleton className="h-7 w-64" />
      ) : (
        <h1 className="text-xl font-semibold text-mono">
          {t('welcome.title', { name })}
        </h1>
      )}
      <p className="text-sm text-secondary-foreground">
        {t('welcome.subtitle')}
      </p>
    </div>
  );
}
