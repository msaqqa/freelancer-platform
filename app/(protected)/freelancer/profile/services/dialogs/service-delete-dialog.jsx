'use client';

import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deleteFreelancerService } from '@/services/freelancer/services';
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

const ServiceDeleteDialog = ({ open, closeDialog, service }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('services');

  // Define the mutation for deleting the service
  const mutation = useMutation({
    mutationFn: () => deleteFreelancerService(service?.id),
    onSuccess: (data) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{data.message}</AlertTitle>
          </Alert>
        ),

        {
          position: 'top-center',
        },
      );
      queryClient.invalidateQueries({ queryKey: ['freelancer-services'] }); // Refetch services list
      closeDialog();
    },
  });

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent close={false}>
        <DialogHeader>
          <DialogTitle>{t('delete.deleteTitle')}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t('delete.deleteDesc')}</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            {t('cancelBtn')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate(service.id)}
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' && (
              <Spinner className="animate-spin" />
            )}
            {t('delete.deleteBtn')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDeleteDialog;
