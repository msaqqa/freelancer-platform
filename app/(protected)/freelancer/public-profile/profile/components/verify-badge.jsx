'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getFreelancerProfileComplete } from '@/services/freelancer/profile';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CircularProgress } from '@/components/ui/progress';
import { VerifyBadgeDialog } from '../dialogs';

const VerifyBadge = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`verified-badge.${key}`);

  // get profile complete data from api
  const { data, isLoading } = useQuery({
    queryKey: ['profileComplete'],
    queryFn: getFreelancerProfileComplete,
  });
  const dataComplete = data?.data[0] ?? {};
  const {
    status = [],
    completed_items,
    total_items,
    percentage,
    completion_text,
  } = dataComplete;

  return (
    <Card className="shadow-none p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-7">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <CircularProgress value={percentage} size={100} strokeWidth={8} />
          <div className="flex flex-col gap-1.5 max-w-[300px] text-center md:text-start">
            <h2 className="text-xl font-semibold text-mono">
              {fp('badgeTitle')}
            </h2>
            <p className="text-sm text-secondary-foreground leading-5.5">
              {completion_text}
            </p>
          </div>
        </div>
        <div className="grid justify-end min-w-20">
          <Button variant="mono" onClick={() => setOpenDialog(true)}>
            {fp('badgeBtn')} ({completed_items}/{total_items})
          </Button>
        </div>
      </div>
      <VerifyBadgeDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        items={status}
        badgeComplete={dataComplete}
      />
    </Card>
  );
};

export { VerifyBadge };
