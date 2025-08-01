'use client';

import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/empty-state';

const CommunityBadges = ({ user, isLoading }) => {
  const badges = user?.badges || [];
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`badges.${key}`);

  const Loading = () => {
    return (
      <>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="size-6 rounded-full m-0" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="size-6 rounded-full m-0" />
          <Skeleton className="h-3 w-18" />
        </div>
      </>
    );
  };

  const renderItem = (item) => {
    return (
      <div key={item?.id} className="flex items-center gap-x-2.5">
        <img
          src={toAbsoluteUrl(item?.icon)}
          className="size-[20px]"
          alt="image"
        />
        <span className="text-sm text-foreground">{item?.name}</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('badgesTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="pb-7.5">
        {isLoading ? (
          <Loading />
        ) : badges.length ? (
          <div className="flex items-center flex-wrap gap-3 lg:gap-4">
            {badges.map((item) => {
              return renderItem(item);
            })}
          </div>
        ) : (
          <EmptyState
            title={fp('badgesTitle')}
            description={fp('badgesDesc')}
            icon={{
              light: '/media/icons/badges-light.svg',
              dark: '/media/icons/badges-dark.svg',
            }}
            button={false}
          />
        )}
      </CardContent>
    </Card>
  );
};

export { CommunityBadges };
