'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updateFreelancerPhoto } from '@/services/freelancer/profile';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinners';
import { AvatarInput } from '@/app/components/partials/common/avatar-input';
import { AvatarSchema } from './forms';

export const AvatarDialog = ({ open, closeDialog, user }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('freelancerProfile');
  const { t: tv } = useTranslation('validation');
  const fp = (key) => t(`avatar.${key}`);

  const form = useForm({
    resolver: zodResolver(AvatarSchema(tv)),
    defaultValues: {
      photo: null,
    },
    mode: 'onBlur',
  });

  const mutation = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'photo' && values.photo instanceof File) {
          formData.append('photo', values.photo);
        }
      });
      const response = updateFreelancerPhoto(formData);
      return response;
    },
    onSuccess: async (data) => {
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
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      closeDialog();
    },
    onError: (error) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  const submitLoading = mutation.isPending || false;

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader className="pb-6 border-b border-border">
          <DialogTitle>{fp('dialogTitle')}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="block w-full space-y-5"
          >
            {/* Photo */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2.5">
                  <FormLabel>{fp('photo')}</FormLabel>
                  <span className="text-sm text-secondary-foreground">
                    800x800px JPG or PNG
                  </span>
                  <FormControl>
                    <AvatarInput
                      defaultImg={user?.photo}
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        form.trigger('photo');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                {t('cancelBtn')}
              </Button>
              <Button disabled={submitLoading || !form.formState.isDirty}>
                {submitLoading && <Spinner className="animate-spin" />}
                {t('saveBtn')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
