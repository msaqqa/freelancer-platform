'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toAbsoluteUrl } from '@/lib/helpers';
import { getFreelancerSummary } from '@/services/freelancer/profile';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/empty-state';
import { PostVedio } from '.';
import { SummaryDialog } from '../dialogs';

const Summary = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`summary.${key}`);

  const Loading = () => {
    return (
      <>
        <div className="text-sm text-foreground leading-5.5">
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-3 w-48 mb-5" />
        <div className="flex gap-2.5 xl:gap-4.5 kt-scrollable-x overflow-x-auto pb-2">
          {Array(3)
            .fill(0)
            .map((item, index) => {
              return renderItem(item, index);
            })}
        </div>
        <div>
          <Skeleton className="h-3 w-48 mb-5" />
          <Skeleton className="bg-accent w-full aspect-video rounded-xl"></Skeleton>
        </div>
      </>
    );
  };

  // get summary data from api
  const { data: summaryData, isLoading } = useQuery({
    queryKey: ['freelancer-summary'],
    queryFn: getFreelancerSummary,
  });

  const summary = summaryData?.data ?? {};
  const items = summary?.images_urls ?? [];

  function checkEmptyObject(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (
          value !== null &&
          value !== '' &&
          (Array.isArray(value) ? value.length > 0 : true)
        ) {
          return true;
        }
      }
    }

    return false;
  }
  const isSummaryEmpty = checkEmptyObject(summary);

  const renderItem = (item, index) => {
    return (
      <div
        key={index}
        className={`${item === 0 && 'animate-pulse'} bg-accent bg-cover bg-no-repeat bg-center min-h-[340px] min-w-[250px] rounded-xl`}
        style={{
          backgroundImage: `url(${toAbsoluteUrl(item.url)})`,
        }}
      ></div>
    );
  };

  return (
    <Card>
      <CardHeader className="border-b-0 px-7.5 mb-5">
        <h2 className="text-xl font-semibold leading-none tracking-tight">
          {fp('summaryTitle')}
        </h2>
        {isSummaryEmpty && (
          <Button variant="ghost" onClick={() => setOpenDialog(true)}>
            <Pencil size={16} className="text-accent-foreground" /> {t('edit')}
          </Button>
        )}
      </CardHeader>

      <div className="grid gap-5 mb-5 px-7.5">
        {isLoading ? (
          <Loading />
        ) : isSummaryEmpty ? (
          <>
            <p className="text-sm text-foreground leading-5.5">
              {summary?.bio}
            </p>
            <h4 className="text-base font-semibold leading-none tracking-tight mb-5">
              {summary?.images_title}
            </h4>
            {items.length > 0 && (
              <div className="flex gap-2.5 xl:gap-4.5 kt-scrollable-x overflow-x-auto pb-2">
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
      {summary?.video && (
        <PostVedio video={summary?.video} title={summary?.video_title} />
      )}

      <SummaryDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        summary={summary}
      />
    </Card>
  );
};

export { Summary };
