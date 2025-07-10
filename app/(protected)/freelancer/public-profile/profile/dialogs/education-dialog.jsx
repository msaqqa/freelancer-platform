'use client';

import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinners';
import EducationDeleteDialog from './education-delete-dialog';
import { FreelancerEducationSchema } from './forms';

// get freelancer education by id
export const EducationDialog = ({ open, closeDialog, educationId }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { t } = useTranslation('freelancerProfile');
  const { t: tv } = useTranslation('validation');
  const fp = (key) => t(`education.${key}`);
  const queryClient = useQueryClient();

  // get getEducationDegree data from api
  const { data: educationData, isLoading: educationLoading } = useQuery({
    queryKey: ['freelancer-educationById', educationId],
    queryFn: () => getFreelancerEducationById(educationId),
    enabled: !!educationId,
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
    resolver: zodResolver(FreelancerEducationSchema(tv)),
    defaultValues: {
      stillStudying: false,
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
    if (open && !educationId) {
      form.reset({
        university: '',
        study: '',
        grade: '',
        degree: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        stillStudying: false,
      });
    }

    if (open && education && !educationLoading) {
      const startDate = formatDate(education?.start_date);
      const endDate = formatDate(education?.end_date);
      form.reset({
        university: education?.university,
        study: education?.field_of_study,
        degree: education?.degree?.id?.toString(),
        grade: education?.grade?.id?.toString(),
        startMonth: startDate?.month,
        startYear: startDate?.year,
        endMonth: endDate?.month,
        endYear: endDate?.year,
        stillStudying: educationId
          ? education?.end_date
            ? false
            : true
          : false,
      });
    }
  }, [form, open, educationId, educationLoading]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => getYears(), [currentYear]);

  // Mutation for creating/updating about
  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = educationId
        ? await updateFreelancerEducationById(educationId, values)
        : await addFreelancerEducation(values);
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
      queryClient.invalidateQueries({ queryKey: ['freelancer-educations'] });
      educationId &&
        queryClient.invalidateQueries({
          queryKey: ['freelancer-educationById', educationId],
        });
      closeDialog();
    },
  });

  // Derive the loading state from the mutation status
  const isLoading = mutation.status === 'pending';

  // Handle form submission
  const handleSubmit = (values) => {
    const { startMonth, startYear, endMonth, endYear } = form.getValues();
    let startCombinedValue, endCombinedValue;
    if (startMonth && startYear) {
      startCombinedValue = `${startMonth}-${startYear}`;
    }
    if (endMonth && endYear) {
      if (!form.watch('stillStudying')) {
        endCombinedValue = `${endMonth}-${endYear}`;
      }
    }

    const updateValues = {
      university: values.university,
      field_of_study: values.study,
      grade: values.grade,
      education_level_id: values.degree,
      start_date: startCombinedValue,
      end_date: endCombinedValue,
    };
    console.log('updateValues', updateValues);
    mutation.mutate(updateValues);
  };

  const Loading = () => {
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex-1 w-full space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
        {[...Array(2)].map((_, index) => (
          <div className="flex flex-col md:flex-row gap-2.5">
            <div key={index} className="flex-1 w-full space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div key={index} className="flex-1 w-full space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-start sm:justify-between pt-5 gap-2.5">
          <Skeleton className="h-10 w-36" />
          <div className="flex flex-col-reverse sm:flex-row gap-2.5">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="mx-auto grow w-full max-w-xl p-0 gap-0"
      >
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle>{fp('educationTitle')}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="py-0 mb-5 ps-6 pe-3 me-3">
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
                          {degreeOptions.length > 0 &&
                            degreeOptions.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item?.id?.toString()}
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
                          {gradesOptions.length > 0 &&
                            gradesOptions.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item?.id.toString()}
                              >
                                {item.label}
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
                <div className="flex flex-col md:flex-row gap-2.5">
                  {/* Month Select */}
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
                      <FormItem className="flex-1 w-full">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val);
                              form.trigger('startYear');
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
                <div className="flex flex-col md:flex-row gap-2.5">
                  {/* Month Select */}
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
                            onOpenChange={(isOpen) => {
                              if (!isOpen) {
                                form.trigger('endMonth');
                              }
                            }}
                            disabled={form.watch('stillStudying')}
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
                      <FormItem className="flex-1 w-full">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(val) => {
                              field.onChange(val);
                              form.trigger('endYear');
                            }}
                            onOpenChange={(isOpen) => {
                              if (!isOpen) {
                                form.trigger('endYear');
                              }
                            }}
                            disabled={form.watch('stillStudying')}
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

              {/* Still Studying */}
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="stillStudying"
                  render={({ field }) => (
                    <FormItem className="flex-row items-center">
                      <FormControl>
                        <Checkbox
                          id="still-studying"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(!!checked);
                            if (checked) {
                              form.clearErrors(['endYear', 'endMonth']);
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel htmlFor="still-studying">
                        {fp('stillStudying')}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter
                className={`flex flex-col-reverse sm:flex-row justify-start  ${educationId ? 'sm:justify-between' : 'sm:justify-end'} pt-5 gap-2.5`}
              >
                {educationId && (
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    {fp('deleteEducation')}
                  </Button>
                )}
                <div className="flex flex-col-reverse sm:flex-row gap-2.5">
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
                </div>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
        <EducationDeleteDialog
          open={openDeleteDialog}
          closeDialog={() => {
            setOpenDeleteDialog(false);
            closeDialog();
          }}
          educationId={educationId}
        />
      </DialogContent>
    </Dialog>
  );
};
