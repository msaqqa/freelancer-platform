'use client';

import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CircularProgress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Connections } from './components';

export const VerifyBadgeDialog = ({
  open,
  closeDialog,
  items,
  badgeComplete,
}) => {
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`verified-badge.${key}`);
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        close={true}
        className="mx-auto grow w-full max-w-xl p-0 gap-0"
        variant="fullscreen"
      >
        <DialogHeader className="py-5 px-6 border-b border-border">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <CircularProgress
              value={badgeComplete.percentage}
              size={70}
              strokeWidth={5}
              valueSize={'md'}
            />
            <div className="flex flex-col gap-1.5 max-w-[300px]">
              <h2 className="text-xl font-semibold text-mono">
                {fp('badgeTitle')}
              </h2>
              <p className="text-sm text-secondary-foreground leading-5.5">
                {badgeComplete.completionText}
              </p>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3">
          <div className="text-sm font-semibold mb-5">
            {fp('badgeBtn')} ({badgeComplete.completed_items}/
            {badgeComplete.total_items})
          </div>
          <Connections items={items} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
