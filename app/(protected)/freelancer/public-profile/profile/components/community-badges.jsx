'use client';

import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { useUserStore } from '@/stores/user-store';
import { MessagesSquare, Truck, Volleyball, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';

const CommunityBadges = () => {
  const { user } = useUserStore();
  const badges = user?.badges || [];
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`badges.${key}`);

  const renderItem = (item, index) => {
    return (
      <HexagonBadge
        key={index}
        stroke={item.stroke}
        fill={item.fill}
        size="size-[50px]"
        badge={<item.icon className={`text-xl ps-px ${item.iconColor}`} />}
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('badgesTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="pb-7.5">
        {badges.length ? (
          <div className="flex items-center flex-wrap gap-3 lg:gap-4">
            {badges.map((item, index) => {
              return renderItem(item, index);
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
