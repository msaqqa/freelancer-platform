'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinners';
import { Switch } from '@/components/ui/switch';
import { FreelancerAboutSchema } from '../forms/about-schema';

export const AboutDialog = ({ open, closeDialog, about }) => {
  const [categoryId, setCategoryId] = useState(null);
  const queryClient = useQueryClient();

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
    form.setValue('subcategory', null);
    form.trigger('category');
  };

  // Form initialization
  const form = useForm({
    resolver: zodResolver(FreelancerAboutSchema()),
    defaultValues: {
      hourlyRate: '',
      availability: '',
      category: '',
      subcategory: '',
      experience: '',
      country: '',
    },
    mode: 'onBlur',
  });

  // Reset form values when dialog is opened
  // useEffect(() => {
  //   if (open) {
  //     form.reset({
  //       hourlyRate: about?.hourlyRate || '',
  //       availability: about?.availability || '',
  //     });
  //   }
  // }, [form, open, about]);

  // Mutation for creating/updating about
  const mutation = useMutation({
    mutationFn: saveFreelancerAbout,
    onSuccess: () => {
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

      queryClient.invalidateQueries({ queryKey: ['user-abouts'] });
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
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle>{about ? 'Edit About' : 'Add About'}</DialogTitle>
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
                    Ready To Work?
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FormLabel
                        htmlFor="auto-update"
                        className="text-foreground text-sm"
                      >
                        Available To Hire
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
                  <FormLabel>hourly Rate</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="text"
                        id="hourlyRate"
                        placeholder="0.00"
                        className="focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <img
                      src={toAbsoluteUrl('/media/app/dollar-square.svg')}
                      className="bg-background absolute right-0 top-1/2 transform -translate-1/2 text-sm text-muted-foreground h-[20px]"
                      alt=""
                    />
                  </div>
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
                  <FormLabel>Industry</FormLabel>
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
                        <SelectValue placeholder="Design" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesLoading && (
                          <SelectItem>loading...</SelectItem>
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
                  <FormLabel>Specialty</FormLabel>
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
                          <SelectValue placeholder="Graphic Design" />
                        </SelectTrigger>
                        <SelectContent>
                          {subcategoriesLoading && (
                            <SelectItem>loading...</SelectItem>
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

            {/* Work Experience */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="experience"
                      placeholder="0"
                      className="focus-visible:ring-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country Select */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>country</FormLabel>
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
                          <SelectValue placeholder="Palestine" />
                        </SelectTrigger>
                        <SelectContent>
                          {countriesLoading && (
                            <SelectItem>loading...</SelectItem>
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
                    <FormMessage />
                  </div>
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
      </DialogContent>
    </Dialog>
  );
};
