'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Connections } from '../components';

export const VerifyBadgeDialog = ({ open, closeDialog }) => {
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="mx-auto grow w-full max-w-2xl p-0 [&>button]:hidden gap-0"
        variant="fullscreen"
      >
        <DialogClose />
        <DialogHeader className="py-5 px-6 border-b border-border">
          <DialogTitle>Get verified badge</DialogTitle>
        </DialogHeader>
        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3">
          <Connections />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
