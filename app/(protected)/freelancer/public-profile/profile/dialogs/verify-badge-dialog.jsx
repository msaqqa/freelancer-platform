'use client';

import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Connections } from './components';

export const VerifyBadgeDialog = ({ open, closeDialog, items }) => {
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
          <DialogTitle>{fp('badgeTitle')}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3">
          <Connections items={items} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
