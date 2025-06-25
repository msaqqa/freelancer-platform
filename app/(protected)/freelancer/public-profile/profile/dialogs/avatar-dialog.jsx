'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AvatarInput } from '@/app/components/partials/common/avatar-input';

export const AvatarDialog = ({ open, closeDialog }) => {
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle>Edit Avatar</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center flex-wrap gap-2.5">
          <Label className="max-w-56">Photo</Label>
          <span className="text-sm text-secondary-foreground">
            150x150px JPEG, PNG Image
          </span>
          <AvatarInput />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="button">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
