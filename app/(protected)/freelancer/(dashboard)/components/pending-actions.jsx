'use client';

import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';

// TODO: replace the empty state with a real list once a jobs/actions service exists.
export function PendingActions() {
  const { t } = useTranslation('freelancerDashboard');

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-mono">
        {t('pendingActions.title')}
      </h2>
      <Card>
        <CardContent className="flex flex-col items-center justify-center text-center py-12 gap-3">
          <img
            src={toAbsoluteUrl('/media/illustrations/2.svg')}
            className="dark:hidden max-h-[160px]"
            alt="pending actions"
          />
          <img
            src={toAbsoluteUrl('/media/illustrations/2-dark.svg')}
            className="light:hidden max-h-[160px]"
            alt="pending actions"
          />
          <div className="text-base font-semibold text-mono">
            {t('pendingActions.emptyTitle')}
          </div>
          <p className="text-sm text-secondary-foreground max-w-md">
            {t('pendingActions.emptyDesc')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
