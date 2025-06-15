'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { toAbsoluteUrl } from '@/lib/helpers';
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
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinners';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export const AboutDialog = ({ open, closeDialog, about }) => {
  const queryClient = useQueryClient();

  // Form initialization
  const form = useForm({
    resolver: zodResolver(),
    defaultValues: { hourlyRate: '', availability: '' },
    mode: 'onSubmit',
  });

  // Reset form values when dialog is opened
  useEffect(() => {
    if (open) {
      form.reset({
        hourlyRate: about?.hourlyRate || '',
        availability: about?.availability || '',
      });
    }
  }, [form, open, about]);

  const editFreelancerAbout = () => {};

  // Mutation for creating/updating about
  const mutation = useMutation({
    mutationFn: editFreelancerAbout,
    onSuccess: () => {
      const isEdit = !!about?.id;
      const message = isEdit
        ? 'about updated successfully'
        : 'about added successfully';

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

      queryClient.invalidateQueries({ queryKey: ['user-abouts'] });
      closeDialog();
    },
    onError: (error) => {
      const message = error.message;
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        ),

        {
          position: 'top-center',
        },
      );
    },
  });

  // Derive the loading state from the mutation status
  const isLoading = mutation.status === 'pending';

  // Handle form submission
  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent close={false}>
        <DialogHeader>
          <DialogTitle>{about ? 'Edit About' : 'Add About'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* hourly Rate */}
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>hourly Rate</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="text"
                        id="hourlyRate"
                        placeholder="0.00"
                        className="focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <img
                      src={toAbsoluteUrl('/media/app/dollar-square.svg')}
                      className="bg-background absolute right-0 top-1/2 transform -translate-1/2 text-sm text-muted-foreground h-[20px]"
                      alt=""
                    />
                  </div>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            {/* Availability */}
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex items-center gap-2">
                    <FormLabel htmlFor="availability">availability</FormLabel>
                    <FormControl>
                      <Switch
                        id="availability"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        size="sm"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
              >
                {isLoading && <Spinner className="animate-spin" />}
                Save Settings
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
