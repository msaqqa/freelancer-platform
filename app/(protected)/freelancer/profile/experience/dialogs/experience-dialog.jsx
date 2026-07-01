'use client';

import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { MONTH as months } from '@/config/dateConfig';
import { getYears } from '@/lib/date';
import {
  addFreelancerExperience,
  getFreelancerExperienceById,
  updateFreelancerExperienceById,
} from '@/services/freelancer/experience';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinners';
import { Textarea } from '@/components/ui/textarea';
import { FreelancerExperienceSchema } from './forms';

const EMPLOYMENT_TYPES = ['on-site', 'remote', 'hybrid'];

const splitDate = (date) => {
  if (!date) return { month: '', year: '' };
  const [month, year] = date.split('-');
  return { month, year };
};

export const ExperienceDialog = ({ open, closeDialog, experienceId }) => {
  const { t } = useTranslation('freelancerExperience');
  const { t: tv } = useTranslation('validation');
  const queryClient = useQueryClient();

  const { data: experienceData, isLoading: experienceLoading } = useQuery({
    queryKey: ['freelancer-experienceById', experienceId],
    queryFn: () => getFreelancerExperienceById(experienceId),
    enabled: !!experienceId && open,
  });
  const experience = experienceData?.data ?? {};

  const form = useForm({
    resolver: zodResolver(FreelancerExperienceSchema(tv)),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      type: '',
      description: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      currentlyWorking: false,
    },
    mode: 'onBlur',
  });

  // Reset on open (create) / prefill (edit).
  useEffect(() => {
    if (open && !experienceId) {
      form.reset({
        title: '',
        company: '',
        location: '',
        type: '',
        description: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        currentlyWorking: false,
      });
    }

    if (open && experienceId && experience?.id && !experienceLoading) {
      const start = splitDate(experience?.start_date);
      const end = splitDate(experience?.end_date);
      form.reset({
        title: experience?.title ?? '',
        company: experience?.company ?? '',
        location: experience?.location ?? '',
        type: experience?.type ?? '',
        description: experience?.description ?? '',
        startMonth: start.month,
        startYear: start.year,
        endMonth: end.month,
        endYear: end.year,
        currentlyWorking: !experience?.end_date,
      });
    }
  }, [form, open, experienceId, experience?.id, experienceLoading]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => getYears(), [currentYear]);

  const mutation = useMutation({
    mutationFn: async (values) =>
      experienceId
        ? await updateFreelancerExperienceById(experienceId, values)
        : await addFreelancerExperience(values),
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
      queryClient.invalidateQueries({ queryKey: ['freelancer-experiences'] });
      experienceId &&
        queryClient.invalidateQueries({
          queryKey: ['freelancer-experienceById', experienceId],
        });
      closeDialog();
    },
  });

  const isLoading = mutation.status === 'pending';

  const handleSubmit = (values) => {
    const { startMonth, startYear, endMonth, endYear, currentlyWorking } =
      values;

    const startDate =
      startMonth && startYear ? `${startMonth}-${startYear}` : undefined;
    const endDate =
      !currentlyWorking && endMonth && endYear
        ? `${endMonth}-${endYear}`
        : null;

    mutation.mutate({
      title: values.title,
      company: values.company,
      location: values.location,
      type: values.type,
      description: values.description,
      start_date: startDate,
      end_date: endDate,
    });
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="mx-auto grow w-full max-w-xl p-0 gap-0"
      >
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle>
            {experienceId ? t('dialog.editTitle') : t('dialog.addTitle')}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Job Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.titleLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('dialog.titleHolder')}
                        className="focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.companyLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('dialog.companyHolder')}
                        className="focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.locationLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('dialog.locationHolder')}
                        className="focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Employment Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.typeLabel')}</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('dialog.typeHolder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {EMPLOYMENT_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {t(`types.${type}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="mt-1" />
                  </FormItem>
                )}
              />

              {/* Start Date */}
              <div>
                <FormLabel className="inline-block mb-2">
                  {t('dialog.startDateLabel')}
                </FormLabel>
                <div className="flex flex-col md:flex-row gap-2.5">
                  <FormField
                    control={form.control}
                    name="startMonth"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val);
                              form.trigger('startMonth');
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('dialog.month')} />
                            </SelectTrigger>
                            <SelectContent className="max-h-50 overflow-y">
                              {months.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id.toString()}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startYear"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val);
                              form.trigger('startYear');
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('dialog.year')} />
                            </SelectTrigger>
                            <SelectContent className="max-h-50 overflow-y">
                              {years.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id.toString()}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <FormLabel className="inline-block mb-2">
                  {t('dialog.endDateLabel')}
                </FormLabel>
                <div className="flex flex-col md:flex-row gap-2.5">
                  <FormField
                    control={form.control}
                    name="endMonth"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val);
                              form.trigger('endMonth');
                            }}
                            disabled={form.watch('currentlyWorking')}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('dialog.month')} />
                            </SelectTrigger>
                            <SelectContent className="max-h-50 overflow-y">
                              {months.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id.toString()}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endYear"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val);
                              form.trigger('endYear');
                            }}
                            disabled={form.watch('currentlyWorking')}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('dialog.year')} />
                            </SelectTrigger>
                            <SelectContent className="max-h-50 overflow-y">
                              {years.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id.toString()}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Currently working */}
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="currentlyWorking"
                  render={({ field }) => (
                    <FormItem className="flex-row items-center">
                      <FormControl>
                        <Checkbox
                          id="currently-working"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(!!checked);
                            if (checked) {
                              form.clearErrors(['endYear', 'endMonth']);
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel htmlFor="currently-working">
                        {t('dialog.currentlyWorking')}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('dialog.descriptionLabel')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('dialog.descriptionHolder')}
                        className="min-h-[100px] focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex flex-col-reverse sm:flex-row justify-start sm:justify-end pt-5 gap-2.5">
                <Button type="button" variant="outline" onClick={closeDialog}>
                  {t('cancelBtn')}
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !form.formState.isDirty}
                >
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
