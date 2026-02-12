'use client';

import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deleteFreelancerEducationById } from '@/services/freelancer/profile';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinners';

const EducationDeleteDialog = ({ open, closeDialog, educationId }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`education.${key}`);

  // Define the mutation for deleting the project
  const mutation = useMutation({
    mutationFn: deleteFreelancerEducationById,
    onSuccess: (data) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{data?.message}</AlertTitle>
          </Alert>
        ),

        {
          position: 'top-center',
        },
      );

      queryClient.invalidateQueries({ queryKey: ['freelancer-educations'] });
      closeDialog();
    },
  });

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{fp('educationDeleteConfirm')}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{fp('educationDeleteDesc')}</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            {fp('educationDeleteCancelBtn')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate(educationId)}
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' && (
              <Spinner className="animate-spin" />
            )}
            {fp('educationDeleteBtn')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EducationDeleteDialog;
