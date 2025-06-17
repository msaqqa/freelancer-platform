'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Facebook, Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { Input, InputWrapper } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinners';
import { SocialSchema } from '../forms/social-schema';

export const SocialsDialog = ({ open, closeDialog, socials }) => {
  const queryClient = useQueryClient();
  const [socialFields, setSocailFields] = useState([
    { id: 0, title: '', link: '' },
  ]);

  useEffect(() => {
    setSocailFields([{ id: 0, title: '', link: '' }]);
  }, [open]);

  // Form initialization
  const form = useForm({
    resolver: zodResolver(SocialSchema),
    defaultValues: {
      socialFacebook: '',
      socialTwitter: '',
      socialLinkedIn: '',
      socialYoutube: '',
      socialFields: [{ id: 0, title: '', link: '' }],
    },
    mode: 'onSubmit',
  });

  const handleAddField = () => {
    const newField = { id: socialFields.length };
    setSocailFields([...socialFields, newField]);

    form.setValue('socialFields', [...socialFields, newField]);
  };

  const handleRemoveField = (id) => {
    if (id !== 0) {
      const updatedFields = socialFields.filter((field) => field.id !== id);
      setSocailFields(updatedFields);
      form.setValue('socialFields', updatedFields);
    }
  };

  // Reset form values when dialog is opened
  useEffect(() => {
    if (open) {
      form.reset({
        socialFacebook: socials?.socialFacebook || '',
        socialTwitter: socials?.socialTwitter || '',
        socialLinkedIn: socials?.socialLinkedIn || '',
        socialYoutube: socials?.socialYoutube || '',
      });
    }
  }, [form, open, socials]);

  const editFreelancerSocials = () => {};

  // Mutation for creating/updating socials
  const mutation = useMutation({
    mutationFn: editFreelancerSocials,
    onSuccess: () => {
      const isEdit = !!socials?.id;
      const message = isEdit
        ? 'socials updated successfully'
        : 'socials added successfully';

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

      queryClient.invalidateQueries({ queryKey: ['user-socialss'] });
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{socials ? 'Edit Socials' : 'Add Socials'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Facebook */}
            <FormField
              control={form.control}
              name="socialFacebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <InputWrapper>
                      {/* <Facebook size={16} className="text-green-500" /> */}
                      <img
                        src={toAbsoluteUrl(`/media/brand-logos/facebook.svg`)}
                        className="size-6 shrink-0"
                        alt="image"
                      />
                      <Input placeholder="Enter Facebook URL" {...field} />
                    </InputWrapper>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Twitter */}
            <FormField
              control={form.control}
              name="socialTwitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <InputWrapper>
                      <img
                        src={toAbsoluteUrl(`/media/brand-logos/twitter.svg`)}
                        className="size-6 shrink-0"
                        alt="image"
                      />
                      <Input placeholder="Enter Twitter URL" {...field} />
                    </InputWrapper>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LinkedIn */}
            <FormField
              control={form.control}
              name="socialLinkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <InputWrapper>
                      <img
                        src={toAbsoluteUrl(`/media/brand-logos/linkedIn.svg`)}
                        className="size-6 shrink-0"
                        alt="image"
                      />
                      <Input placeholder="Enter LinkedIn URL" {...field} />
                    </InputWrapper>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* YouTube */}
            <FormField
              control={form.control}
              name="socialYoutube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube</FormLabel>
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

            {/* Render social fields */}
            {socialFields.map((field, index) => (
              <div key={field.id} className="flex items-end mb-4">
                <div className="flex items-center gap-2.5 w-[90%]">
                  {/* Title */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`socialFields[${index}].title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Portfolio Website"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Link */}
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`socialFields[${index}].link`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link</FormLabel>
                          <FormControl>
                            <InputWrapper>
                              <Input
                                placeholder="Paste the full URL (e.g. https://...)"
                                {...field}
                              />
                            </InputWrapper>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Remove button for fields after the first one */}
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-[8%] ms-[2%]"
                    onClick={() => handleRemoveField(field.id)}
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>
            ))}

            {/* Add button */}
            <Button
              type="button"
              variant="dim"
              className="text-blue-500 hover:text-blue-600"
              onClick={handleAddField}
            >
              <span className="p-px border border-blue-500 group-hover:border-blue-600">
                <Plus size={16} />
              </span>
              Add Link
            </Button>

            {/* Action Buttons */}
            <div className="flex space-x-4 justify-end">
              <Button type="reset" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isDirty || isLoading}
              >
                {isLoading && <Spinner className="animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
