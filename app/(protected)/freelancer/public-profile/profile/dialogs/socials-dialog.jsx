'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';
import { saveFreelancerSocials } from '@/services/freelancer/profile';
import { getSocials } from '@/services/general';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinners';
import { SocialsSchema } from '../forms/social-schema';

export const SocialsDialog = ({ open, closeDialog, socials }) => {
  const { t } = useTranslation('freelancerProfile');
  const { t: tv } = useTranslation('validation');
  const fp = (key) => t(`socials.${key}`);

  // get socials data from API
  const { data: socialsData, isLoading: socialsLoading } = useQuery({
    queryKey: ['socials'],
    queryFn: getSocials,
  });
  const socialsDataFields = socialsData?.data ?? [];

  // Form initialization with React Hook Form
  const form = useForm({
    resolver: zodResolver(SocialsSchema(tv)),
    defaultValues: {
      socials: [],
      otherSocialFields: [{ title: '', link: '' }],
    },
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'otherSocialFields',
  });

  // Mutation for creating/updating socials
  const mutation = useMutation({
    mutationFn: saveFreelancerSocials,
    onSuccess: () => {
      const isEdit = !!socials?.id;
      const message = isEdit
        ? 'Socials updated successfully'
        : 'Socials added successfully';

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

      queryClient.invalidateQueries({ queryKey: ['user-socials'] });
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

  const isLoading = mutation.status === 'pending';

  const handleSubmit = (values) => {
    console.log('values', values);
    // mutation.mutate(values);
  };

  const handleAddField = () => {
    append({ title: '', link: '' });
  };

  const handleRemoveField = (index) => {
    remove(index);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="mx-auto grow w-full max-w-xl p-0 gap-0"
        variant="fullscreen"
      >
        <DialogHeader className="py-5 px-6 border-b border-border">
          <DialogTitle>{fp('socialsTitle')}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Render fixed social fields from API */}
              {socialsDataFields?.map((item) => {
                return (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`socials[${item.id}].link`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.name}</FormLabel>
                        <FormControl>
                          <InputWrapper>
                            <div
                              dangerouslySetInnerHTML={{ __html: item.icon }}
                            />
                            <Input
                              placeholder={`${fp('socialHolder')} ${item.name}`}
                              value={field.value}
                              onChange={(e) => {
                                // const prevsocial = form.getValues('socialFields');
                                field.onChange(e);
                                form.setValue(`socials[${item.id}]`, {
                                  social_id: item.id,
                                  link: e.target.value,
                                });
                              }}
                            />
                          </InputWrapper>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              {/* Render dynamic social fields */}
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end mb-4">
                  <div className="flex gap-2.5 w-[90%]">
                    {/* Title */}
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name={`otherSocialFields[${index}].title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{fp('titleLabel')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={fp('titleHolder')}
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
                        name={`otherSocialFields[${index}].link`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{fp('linkLabel')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={fp('linkHolder')}
                                {...field}
                              />
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
                      onClick={() => handleRemoveField(index)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              ))}

              {/* Add button */}
              <Button
                type="button"
                variant="inverse"
                className="text-blue-500 hover:text-blue-600"
                onClick={handleAddField}
              >
                <span className="p-px border border-blue-500 group-hover:border-blue-600 rounded-md">
                  <Plus size={16} />
                </span>
                {fp('addLink')}
              </Button>

              {/* Action Buttons */}
              <div className="flex space-x-4 justify-end">
                <Button type="reset" variant="outline" onClick={closeDialog}>
                  {t('cancelBtn')}
                </Button>
                <Button
                  type="submit"
                  disabled={!form.formState.isDirty || isLoading}
                >
                  {isLoading && <Spinner className="animate-spin" />}
                  {t('saveBtn')}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
