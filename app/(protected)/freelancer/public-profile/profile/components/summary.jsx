'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { getFreelancerSummary } from '@/services/freelancer/profile';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';
import { PostVedio } from '.';
import { SummaryDialog } from '../dialogs';

const Summary = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`summary.${key}`);

  // get summary data from api
  const { data: summaryData, isLoading: summaryLoading } = useQuery({
    queryKey: ['freelancerSummary'],
    queryFn: getFreelancerSummary,
  });

  const summary = summaryData?.data ?? {};
  const items = summary?.images_urls ?? [];

  const renderItem = (item, index) => {
    return (
      <div
        key={index}
        className="bg-cover bg-no-repeat min-h-[340px] min-w-[250px] rounded-xl"
        style={{
          backgroundImage: `url(${toAbsoluteUrl(item)})`,
        }}
      ></div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="border-b-0">
          <CardTitle>{fp('summaryTitle')}</CardTitle>
          {Object.keys(summary).length > 0 && (
            <Button
              variant="ghost"
              mode="icon"
              onClick={() => setOpenDialog(true)}
            >
              <SquarePen size={16} className="text-blue-500" />
            </Button>
          )}
        </CardHeader>

        <div className="grid gap-5 mb-5 px-7.5">
          {Object.keys(summary).length ? (
            <>
              <p className="text-sm text-foreground leading-5.5">
                {summary?.bio}
              </p>
              {items.length > 0 && (
                <div className="flex gap-2.5 xl:gap-7.5 kt-scrollable-x overflow-x-auto pb-2">
                  {items.map((item, index) => {
                    return renderItem(item, index);
                  })}
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title={fp('summaryTitle')}
              description={fp('summaryDesc')}
              icon={{
                light: '/media/icons/summary-light.svg',
                dark: '/media/icons/summary-dark.svg',
              }}
              openDialog={() => setOpenDialog(true)}
            />
          )}
        </div>

        <SummaryDialog
          open={openDialog}
          closeDialog={() => setOpenDialog(false)}
          summary={summary}
        />
      </Card>
      {summary?.video && <PostVedio video={summary.video} />}
    </>
  );
};

export { Summary };
