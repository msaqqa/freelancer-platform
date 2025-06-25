'use client';

import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { MONTH as months } from '@/config/dateConfig';
import { saveFreelancerAbout } from '@/services/freelancer/profile';
import { getCategories } from '@/services/general';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinners';
import { FreelancerAboutSchema } from '../forms/about-schema';

export const EducationDialog = ({ open, closeDialog }) => {
  const { user, setUser } = useUserStore();
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`education.${key}`);

  // get categoriesData data from api
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categories = categoriesData?.data ?? [];

  // Form initialization
  const form = useForm({
    // resolver: zodResolver(FreelancerAboutSchema()),
    defaultValues: {
      startMonth: '',
      startYear: '',
    },
    mode: 'onBlur',
  });

  // Reset form values when dialog is opened
  // useEffect(() => {
  //   const category = user?.category?.id.toString();
  //   setCategoryId(category);
  //   if (open) {
  //     form.reset({
  //       hourlyRate: user?.hourly_rate,
  //       availability: user?.available_hire ? true : false,
  //       category: category,
  //       // subcategory: '',
  //       // country: '1',
  //     });
  //   }
  // }, [form, open, user]);

  // ======================

  useEffect(() => {
    const { startMonth, startYear } = form.getValues();
    if (startMonth && startYear) {
      const startCombinedValue = `${startMonth}-${startYear}`;
      form.setValue('startDate', startCombinedValue);
    }
  }, [form]);

  useEffect(() => {
    const { endMonth, endYear } = form.getValues();
    if (endMonth && endYear) {
      const endCombinedValue = `${endMonth}-${endYear}`;
      form.setValue('endDate', endCombinedValue);
    }
  }, [form]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const yearsArray = [];
    for (let i = currentYear; i >= 1950; i--) {
      yearsArray.push({ id: i, name: i.toString() });
    }
    return yearsArray;
  }, [currentYear]);

  // Mutation for creating/updating about
  const mutation = useMutation({
    mutationFn: saveFreelancerAbout,
    onSuccess: (data) => {
      setUser(data?.data);
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
      closeDialog();
    },
    onError: (error) => {
      const message = error?.message;
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
    // mutation.mutate(updateValues);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader className="py-5 border-b border-border">
          <DialogTitle>{fp('educationTitle')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* University */}
            <div className="flex-1 w-full">
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fp('universityLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="firstName"
                        placeholder={fp('universityHolder')}
                        className="focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Degree */}
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fp('degreeLabel')}</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(val) => {
                        field.onChange(val);
                      }}
                      onOpenChange={(isOpen) => {
                        if (!isOpen) {
                          form.trigger('category');
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={fp('degreeHolder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesLoading && (
                          <SelectItem>{t('loading')}</SelectItem>
                        )}
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />

            {/* Study */}
            <div className="flex-1 w-full">
              <FormField
                control={form.control}
                name="study"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fp('studyLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="firstName"
                        placeholder={fp('studyHolder')}
                        className="focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Grade */}
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fp('gradeLabel')}</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(val) => {
                        field.onChange(val);
                      }}
                      onOpenChange={(isOpen) => {
                        if (!isOpen) {
                          form.trigger('category');
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={fp('gradeHolder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesLoading && (
                          <SelectItem>{t('loading')}</SelectItem>
                        )}
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
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
                {fp('startDateLabel')}
              </FormLabel>
              <div className="flex flex-col md:flex-row items-center gap-2.5">
                {/* Month Select */}
                <FormField
                  control={form.control}
                  name="startMonth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(val);
                          }}
                          onOpenChange={(isOpen) => {
                            if (!isOpen) {
                              form.trigger('startMonth');
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={fp('month')} />
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

                {/* Year Select */}
                <FormField
                  control={form.control}
                  name="startYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(val);
                          }}
                          onOpenChange={(isOpen) => {
                            if (!isOpen) {
                              form.trigger('startYear');
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={fp('year')} />
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
                {fp('endDateLabel')}
              </FormLabel>
              <div className="flex flex-col md:flex-row items-center gap-2.5">
                {/* Month Select */}
                <FormField
                  control={form.control}
                  name="endMonth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(val);
                          }}
                          onOpenChange={(isOpen) => {
                            if (!isOpen) {
                              form.trigger('startMonth');
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={fp('month')} />
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

                {/* Year Select */}
                <FormField
                  control={form.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(val) => {
                            field.onChange(val);
                          }}
                          onOpenChange={(isOpen) => {
                            if (!isOpen) {
                              form.trigger('startYear');
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={fp('year')} />
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

            <DialogFooter>
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
      </DialogContent>
    </Dialog>
  );
};
