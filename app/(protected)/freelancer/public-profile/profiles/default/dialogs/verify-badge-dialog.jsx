'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Connections } from '../components';

export const VerifyBadgeDialog = ({ open, closeDialog }) => {
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogClose />
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle>Get verified badge</DialogTitle>
        </DialogHeader>
        <Connections />
      </DialogContent>
    </Dialog>
  );
};
