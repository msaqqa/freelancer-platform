'use client';

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputWrapper } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinners';
import { Textarea } from '@/components/ui/textarea';
import { GalleryInput } from '@/app/components/partials/common/gallery-input';

export const SammaryDialog = ({ open, closeDialog, sammary }) => {
  const [bioChar, setBioCahr] = useState(0);
  const parentRef = useRef(null);
  const navBar = useRef(null);
  const queryClient = useQueryClient();

  const handleBioChange = (e) => {
    const val = e.target.value;
    const charLength = val.length;
    setBioCahr(charLength);
  };

  // Form initialization
  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: { summary: '', video: '', gallery: null },
    mode: 'onSubmit',
  });

  // Reset form values when dialog is opened
  // useEffect(() => {
  //   if (open) {
  //     form.reset({
  //       hourlyRate: sammary?.hourlyRate || '',
  //       availability: sammary?.availability || '',
  //     });
  //   }
  // }, [form, open, sammary]);

  const editFreelancersammary = () => {};

  // Mutation for creating/updating sammary
  const mutation = useMutation({
    mutationFn: editFreelancersammary,
    onSuccess: () => {
      const isEdit = !!sammary?.id;
      const message = isEdit
        ? 'sammary updated successfully'
        : 'sammary added successfully';

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

      queryClient.invalidateQueries({ queryKey: ['user-sammarys'] });
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
    console.log('values', values);
    // mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="w-full max-w-[600px] mx-auto"
      >
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle>{sammary ? 'Edit sammary' : 'Add sammary'}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="grow pe-3 -me-3" viewportRef={parentRef}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Summary */}
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          type="text"
                          id="summary"
                          placeholder="Pitch your experience in a few sentences"
                          className="focus-visible:ring-0"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <span className="absolute right-3 bottom-3 text-sm text-muted-foreground/80">
                        {bioChar}/4000
                      </span>
                    </div>
                    <FormMessage className="mt-1" />
                  </FormItem>
                )}
              />

              {/* Gallery */}
              <FormField
                control={form.control}
                name="gallery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo Gallery</FormLabel>
                    <FormDescription>
                      Upload up to 6 images that reflect your work and activity.
                    </FormDescription>
                    <FormControl>
                      <GalleryInput
                        multiple={true}
                        onChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="mt-1" />
                  </FormItem>
                )}
              />

              {/* YouTube */}
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Introduction</FormLabel>
                    <FormDescription>
                      Upload a short video to introduce yourself and stand out.
                    </FormDescription>
                    <FormControl>
                      <InputWrapper>
                        <img
                          src={toAbsoluteUrl(`/media/brand-logos/youTube.svg`)}
                          className="size-6 shrink-0"
                          alt="image"
                        />
                        <Input placeholder="Enter YouTube URL" {...field} />
                      </InputWrapper>
                    </FormControl>
                    <FormMessage />
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
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
