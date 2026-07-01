'use client';

import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deleteFreelancerPortfolio } from '@/services/freelancer/portfolio';
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

const ProjectDeleteDialog = ({ open, closeDialog, project }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('portfolio');

  // Define the mutation for deleting the project
  const mutation = useMutation({
    mutationFn: async () => deleteFreelancerPortfolio(project.id),
    onSuccess: (data) => {
      const message = data?.message ?? t('delete.deleteSuccess');

      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        ),

        {
          position: 'top-center',
        },
      );

      queryClient.invalidateQueries({ queryKey: ['user-projects'] }); // Refetch projects list
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
            onClick={() => mutation.mutate()}
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

export default ProjectDeleteDialog;
