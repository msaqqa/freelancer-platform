'use client';

import { useEffect, useMemo } from 'react';
import { useUserStore } from '@/stores/user-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { MONTH as months } from '@/config/dateConfig';
import { getYears } from '@/lib/date';
import {
  addFreelancerEducation,
  getFreelancerEducationById,
  updateFreelancerEducationById,
} from '@/services/freelancer/profile';
import { getEducationDegree, getEducationGrades } from '@/services/general';
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
import { FreelancerEducationSchema } from '../forms/education-schema';

// Get freelancer education by id from an existing array of educations
export function getEducationById(educations, educationId) {
  const education = educations.find((item) => item.id === educationId);
  if (!education) {
    throw new Error('Education not found');
  }
  return education;
}

// get freelancer education by id
export const EducationDialog = ({ open, closeDialog, educationId }) => {
  const { user, setUser } = useUserStore();
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`education.${key}`);

  // get getEducationDegree data from api
  const { data: educationData, isLoading: educationLoading } = useQuery({
    queryKey: ['educationById'],
    queryFn: () => getFreelancerEducationById(educationId),
  });
  const education = educationData?.data ?? {};

  // get getEducationDegree data from api
  const { data: DegreeData, isLoading: degreeLoading } = useQuery({
    queryKey: ['educationDegree'],
    queryFn: getEducationDegree,
  });
  const degreeOptions = DegreeData?.data ?? [];

  // get getEducationGrades data from api
  const { data: gradesData, isLoading: gradesLoading } = useQuery({
    queryKey: ['educationGrades'],
    queryFn: getEducationGrades,
  });
  const gradesOptions = gradesData?.data ?? [];

  // Form initialization
  const form = useForm({
    resolver: zodResolver(FreelancerEducationSchema()),
    defaultValues: {
      university: '',
      study: '',
      grade: '',
      degree: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    },
    mode: 'onBlur',
  });

  const formatDate = (date) => {
    if (date) {
      const dateParts = date.split('-');
      const month = dateParts[0];
      const year = dateParts[1];
      return { month, year };
    }
  };

  // Reset form values when dialog is opened
  useEffect(() => {
    const startDate = formatDate(education?.start_date);
    const endDate = formatDate(education?.end_date);
    if (open) {
      form.reset({
        university: education?.university ?? '',
        study: education?.field_of_study ?? '',
        degree: education?.education_level_id ?? '',
        grade: education?.grade ?? '',
        startMonth: startDate?.month ?? '',
        startYear: startDate?.year ?? '',
        endMonth: endDate?.month ?? '',
        endYear: endDate?.year ?? '',
      });
    }
  }, [form, open, educationId]);

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
  const years = useMemo(() => getYears(), [currentYear]);

  // Mutation for creating/updating about
  const mutation = useMutation({
    mutationFn: async () => {
      educationId
        ? await updateFreelancerEducationById(educationId)
        : await addFreelancerEducation();
    },
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
    const updateValues = {
      university: values.university,
      field_of_study: values.study,
      grade: values.grade,
      education_level_id: values.degree,
      start_date: values.startDate,
      end_date: values.endDate,
    };
    console.log('updateValues', updateValues);
    // mutation.mutate(updateValues);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="w-full max-w-[600px] mx-auto"
      >
        <DialogHeader className="py-5 border-b border-border">
          <DialogTitle>{fp('educationTitle')}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="grow pe-3 -me-3">
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
                          {degreeLoading && (
                            <SelectItem>{t('loading')}</SelectItem>
                          )}
                          {degreeOptions.length &&
                            degreeOptions.map((cat) => (
                              <SelectItem
                                key={cat.id}
                                value={cat.id.toString()}
                              >
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
                          {gradesLoading && (
                            <SelectItem>{t('loading')}</SelectItem>
                          )}
                          {gradesOptions.length &&
                            gradesOptions.map((cat) => (
                              <SelectItem
                                key={cat.id}
                                value={cat.id.toString()}
                              >
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

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name=" stillStudying"
                  render={({ field }) => (
                    <>
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <FormLabel className="">{fp('stillStudying')}</FormLabel>
                    </>
                  )}
                />
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
