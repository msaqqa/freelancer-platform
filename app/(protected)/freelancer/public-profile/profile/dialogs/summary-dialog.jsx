'use client';

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { postFreelancerSummary } from '@/services/freelancer/profile';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinners';
import { Textarea } from '@/components/ui/textarea';
import { GalleryInput } from './components';
import { SummarySchema } from './forms';

export const SummaryDialog = ({ open, closeDialog, summary }) => {
  const [bioChar, setBioCahr] = useState(0);
  const { t } = useTranslation('freelancerProfile');
  const { t: tv } = useTranslation('validation');
  const fp = (key) => t(`summary.${key}`);
  const parentRef = useRef(null);
  const queryClient = useQueryClient();

  const handleBioChange = (e) => {
    const val = e.target.value;
    const charLength = val.length;
    setBioCahr(charLength);
  };

  // Form initialization
  const form = useForm({
    resolver: zodResolver(SummarySchema(tv)),
    defaultValues: {
      bio: '',
      imagesTitle: '',
      images: [],
      videoTitle: '',
      video: '',
    },
    mode: 'onBlur',
  });

  // Reset form values when dialog is opened
  useEffect(() => {
    if (open) {
      form.reset({
        bio: summary?.bio || '',
        imagesTitle: summary?.images_title || '',
        video: summary?.video || '',
        videoTitle: summary?.video_title || '',
      });
    }
  }, [form, open, summary]);

  // Mutation for creating/updating summary
  const mutation = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'images' && Array.isArray(values.images)) {
          values.images.map((image) => {
            formData.append('images[]', image);
          });
        } else if (key !== 'images') {
          formData.append(key, values[key]);
        }
      });
      const response = postFreelancerSummary(formData);
      return response;
    },
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
      queryClient.invalidateQueries({ queryKey: ['freelancer-summary'] });
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
    const updataData = {
      bio: values.bio,
      video: values.video,
      video_title: values.videoTitle,
      images_title: values.imagesTitle,
      images: values.images,
    };
    console.log('updataData', updataData);
    mutation.mutate(updataData);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="mx-auto grow w-full max-w-xl p-0 gap-0"
        variant="fullscreen"
      >
        <DialogHeader className="py-5 px-6 border-b border-border">
          <DialogTitle>{fp('summaryTitle')}</DialogTitle>
        </DialogHeader>
        <ScrollArea
          className="py-0 mb-5 ps-6 pe-3 me-3"
          viewportRef={parentRef}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Summary */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>{fp('summaryTitle')}</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          id="bio"
                          placeholder={fp('summaryHolder')}
                          className="focus-visible:ring-0"
                          rows={8}
                          value={field.value}
                          onChange={(val) => {
                            field.onChange(val);
                            handleBioChange(val);
                            form.trigger('bio');
                          }}
                          onBlur={() => form.trigger('bio')}
                        />
                      </FormControl>
                      <span className="absolute end-5 bottom-3 text-sm text-muted-foreground/80">
                        {bioChar}/4000
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gallery Photos */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fp('galleryPhotoLabel')}</FormLabel>
                    <FormDescription>
                      {fp('galleryPhotoHolder')}
                    </FormDescription>
                    <FormControl className="mb-5">
                      <GalleryInput
                        {...field}
                        multiple={true}
                        onChange={(val) => {
                          field.onChange(val);
                          form.trigger('images');
                        }}
                        imagesUrls={summary?.images_urls || []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gallery Title */}
              <FormField
                control={form.control}
                name="imagesTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fp('galleryTitleLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={fp('galleryTileHolder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Viedo Link */}
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fp('viedoLinkLabel')}</FormLabel>
                    <FormDescription>{fp('viedoLinkHolder')}</FormDescription>
                    <FormControl>
                      <InputWrapper>
                        <img
                          src={toAbsoluteUrl(`/media/icons/youTube.svg`)}
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

              {/* Viedo Title */}
              <FormField
                control={form.control}
                name="videoTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fp('viedoTitleLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={fp('viedoTitleHolder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>
                  {t('cancelBtn')}
                </Button>
                <Button disabled={isLoading || !form.formState.isDirty}>
                  {isLoading && <Spinner className="animate-spin" />}
                  {t('saveBtn')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
