'use client';

import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

  // Define the mutation for deleting the service
  const mutation = useMutation({
    mutationFn: deleteFreelancerService,
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
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete the service ?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate()}
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' && (
              <Spinner className="animate-spin" />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDeleteDialog;
