'use client';

import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';

const WorkHistoryContent = () => {
  const { t } = useTranslation('freelancerCommon');

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <h3 className="text-lg text-mono font-semibold">
        {t('tabs.workHistory')}
      </h3>

      <Card className="p-8 lg:p-12">
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center py-5 gap-4">
            <img
              src={toAbsoluteUrl('/media/illustrations/2.svg')}
              className="dark:hidden max-h-[230px]"
              alt="work history"
            />
            <img
              src={toAbsoluteUrl('/media/illustrations/2-dark.svg')}
              className="light:hidden max-h-[230px]"
              alt="work history"
            />

            <div className="text-lg font-semibold text-mono">
              {t('workHistory.emptyTitle')}
            </div>
            <p className="text-sm text-secondary-foreground max-w-md">
              {t('workHistory.emptyDesc')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { WorkHistoryContent };
