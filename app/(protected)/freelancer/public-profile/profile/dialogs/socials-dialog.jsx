'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
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
import { SocialsSchema } from './forms';

export const SocialsDialog = ({ open, closeDialog, socials }) => {
  const [mergedData, setMergedData] = useState([]);
  const queryClient = useQueryClient();
  const { t } = useTranslation('freelancerProfile');
  const { t: tv } = useTranslation('validation');
  const fp = (key) => t(`socials.${key}`);
  const [addedSocials, setAddedSocials] = useState([]);

  // get socials data from API
  const { data: socialsData } = useQuery({
    queryKey: ['socials'],
    queryFn: getSocials,
  });
  const socialsDataFields = socialsData?.data ?? [];

  useEffect(() => {
    if (socials?.length > 0) {
      const data = socialsDataFields?.map((social) => {
        const matchingSocial = socials?.find((item) => item.id === social.id);
        if (matchingSocial) {
          return { ...social, link: matchingSocial.link };
        }
        return social;
      });
      setMergedData(data);
      setAddedSocials(
        data
          .filter((social) => social.link)
          .map((social) => ({
            link: social.link,
            social_id: social.id,
          })),
      );
    } else {
      setMergedData(socialsDataFields);
    }
  }, [socialsData, socials]);

  // Form initialization with React Hook Form
  const form = useForm({
    resolver: zodResolver(SocialsSchema(tv)),
    defaultValues: {
      socials: [],
      otherSocialFields: [{ title: '', link: '' }],
    },
    mode: 'onBlur',
  });
  const { errors } = form.formState;

  // Reset form values when dialog is opened
  useEffect(() => {
    const customSocials = socials
      .filter((social) => social.id === null)
      .map((social) => ({
        link: social.link,
        title: social.name,
      }));
    const customSocialsData =
      customSocials.length > 0 ? customSocials : [{ title: '', link: '' }];
    if (open) {
      form.reset({
        socials: socials || [],
        otherSocialFields: customSocialsData,
      });
    }
  }, [form, open, socials]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'otherSocialFields',
  });

  // Mutation for creating/updating socials
  const mutation = useMutation({
    mutationFn: saveFreelancerSocials,
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
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({
        queryKey: ['freelancer-profile-complete'],
      });
      closeDialog();
    },
  });
  const submitLoading = mutation.status === 'pending';

  const handleSubmit = (values) => {
    const customFields = values.otherSocialFields.filter(
      (field) => field.title && field.link,
    );
    const updateValues = {
      socials: addedSocials,
      custom: customFields,
    };
    console.log('updateValues', updateValues);
    mutation.mutate(updateValues);
  };

  const handleAddField = () => {
    append({ title: '', link: '' });
  };

  const handleRemoveField = (index) => {
    remove(index);
  };

  const removeBtnAlighn = (index) => {
    const { errors } = form.formState;
    if (errors.otherSocialFields) {
      const checkErrors =
        errors.otherSocialFields[index]?.title ||
        errors.otherSocialFields[index]?.link;
      return checkErrors;
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        className="mx-auto grow w-full max-w-xl p-0 gap-0"
        variant="fullscreen"
      >
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle>{fp('socialsTitle')}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Render fixed social fields from API */}
              {mergedData?.map((item) => {
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
                              defaultValue={item.link}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                setAddedSocials((prevData) => {
                                  if (e.target.value === '') {
                                    // If the link is empty, remove the item
                                    return prevData.filter(
                                      (social) => social.social_id !== item.id,
                                    );
                                  }
                                  const existingItem = prevData.find(
                                    (social) => social.social_id === item.id,
                                  );

                                  if (existingItem) {
                                    // If the item exists, update only the link
                                    return prevData.map((social) =>
                                      social.social_id === item.id
                                        ? { ...social, link: e.target.value }
                                        : social,
                                    );
                                  } else {
                                    // If the item doesn't exist, add it
                                    return [
                                      ...prevData,
                                      {
                                        social_id: item.id,
                                        link: e.target.value,
                                      },
                                    ];
                                  }
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
                <div
                  key={index}
                  className={`flex ${removeBtnAlighn(index) ? 'items-center' : 'items-end'} mb-4`}
                >
                  <div className="flex items-baseline gap-2.5 w-[90%]">
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
                              <InputWrapper>
                                <img
                                  src={toAbsoluteUrl(
                                    '/media/icons/custom-social-light.svg',
                                  )}
                                  className="dark:hidden h-[20px]"
                                  alt="image"
                                />
                                <img
                                  src={toAbsoluteUrl(
                                    '/media/icons/custom-social-dark.svg',
                                  )}
                                  className="light:hidden h-[20px]"
                                  alt="image"
                                />
                                <Input
                                  placeholder={fp('linkHolder')}
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
                      onClick={() => handleRemoveField(index)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
              ))}

              {errors?.otherSocialFields && (
                <FormMessage>{errors.otherSocialFields.message}</FormMessage>
              )}

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
                <Button type="button" variant="outline" onClick={closeDialog}>
                  {t('cancelBtn')}
                </Button>
                <Button disabled={!form.formState.isDirty || submitLoading}>
                  {submitLoading && <Spinner className="animate-spin" />}
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
