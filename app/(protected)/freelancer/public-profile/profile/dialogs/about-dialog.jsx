'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { saveFreelancerAbout } from '@/services/freelancer/profile';
import {
  getCategories,
  getCountries,
  getSubcategories,
} from '@/services/general';
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
import { Input, InputWrapper } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinners';
import { Switch } from '@/components/ui/switch';
import { FreelancerAboutSchema } from './forms';

export const AboutDialog = ({ open, closeDialog, user }) => {
  const [categoryId, setCategoryId] = useState(null);
  const queryClient = useQueryClient();
  const { t } = useTranslation('freelancerProfile');
  const { t: tv } = useTranslation('validation');
  const fp = (key) => t(`about.${key}`);

  // get categoriesData data from api
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categories = categoriesData?.data ?? [];

  // get subcategoriesData data from api
  const { data: subcategoriesData, isLoading: subcategoriesLoading } = useQuery(
    {
      queryKey: ['subcategories', categoryId],
      queryFn: () => getSubcategories(categoryId),
      enabled: !!categoryId,
    },
  );
  const subcategories = subcategoriesData?.data ?? [];

  // get countries data from api
  const { data, isLoading: countriesLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
  const countries = data?.data ?? [];

  const handleCategoryChange = (val) => {
    setCategoryId(val);
    form.setValue('subcategory', '');
    form.trigger('category');
  };

  // Form initialization
  const form = useForm({
    resolver: zodResolver(FreelancerAboutSchema(tv)),
    defaultValues: {
      hourlyRate: '',
      availability: true,
      category: '1',
      subcategory: '',
      country: '1',
    },
    mode: 'onBlur',
  });

  // Reset form values when dialog is opened
  useEffect(() => {
    const category = user?.category?.id.toString();
    setCategoryId(category);
    if (open) {
      form.reset({
        hourlyRate: user?.hourly_rate,
        availability: user?.available_hire,
        category: category,
        subcategory: user?.sub_category?.id.toString(),
        country: user?.country?.id.toString(),
      });
    }
  }, [form, open, user]);

  // Mutation for creating/updating about
  const mutation = useMutation({
    mutationFn: saveFreelancerAbout,
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
  const submitLoading = mutation.status === 'pending';

  // Handle form submission
  const handleSubmit = (values) => {
    const updateValues = {
      available_hire: values.availability ? 1 : 0,
      hourly_rate: values.hourlyRate,
      category_id: values.category,
      sub_category_id: values.subcategory,
      country_id: values.country,
      experience: values.experience,
    };
    console.log('updateValues', updateValues);
    mutation.mutate(updateValues);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader className="pb-6 border-b border-border">
          <DialogTitle>{fp('dialogTitle')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Availability */}
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="w-full flex flex-row justify-between items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <FormLabel className="flex w-full items-center gap-1 max-w-56">
                    {fp('readyWork')}
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FormLabel
                        htmlFor="auto-update"
                        className="text-foreground text-sm"
                      >
                        {fp('availableHire')}
                      </FormLabel>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        size="sm"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* hourly Rate */}
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fp('hourlyRate')}</FormLabel>
                  <FormControl>
                    <InputWrapper>
                      <Input
                        type="text"
                        id="hourlyRate"
                        placeholder="0.00"
                        className="focus-visible:ring-0"
                        {...field}
                      />
                      <img
                        src={toAbsoluteUrl('/media/app/dollar-square.svg')}
                        className="bg-background h-[20px]"
                        alt="image"
                      />
                    </InputWrapper>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Industry Select */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fp('industry')}</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(val) => {
                        field.onChange(val);
                        handleCategoryChange(val);
                      }}
                      onOpenChange={(isOpen) => {
                        if (!isOpen) {
                          form.trigger('category');
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="" />
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

            {/* Subcategory Select */}
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fp('specialty')}</FormLabel>
                  <div className="flex flex-col flex-grow">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          form.trigger('subcategory');
                        }}
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            form.trigger('subcategory');
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={fp('specialtyHolder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategoriesLoading && (
                            <SelectItem>{t('loading')}</SelectItem>
                          )}
                          {subcategories.map((subcat) => (
                            <SelectItem
                              key={subcat.id}
                              value={subcat.id.toString()}
                            >
                              {subcat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="mt-1" />
                  </div>
                </FormItem>
              )}
            />

            {/* Country Select */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fp('country')}</FormLabel>
                  <div className="flex flex-col flex-grow">
                    <FormControl>
                      <Select
                        value={field?.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          form.trigger('country');
                        }}
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            form.trigger('country');
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={fp('countryHolder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {countriesLoading && (
                            <SelectItem>{t('loading')}</SelectItem>
                          )}
                          {countries.length &&
                            countries.map((country) => (
                              <SelectItem
                                key={country.id}
                                value={country.id.toString()}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="mt-1" />
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                {t('cancelBtn')}
              </Button>
              <Button
                type="submit"
                disabled={submitLoading || !form.formState.isDirty}
              >
                {submitLoading && <Spinner className="animate-spin" />}
                {t('saveBtn')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
