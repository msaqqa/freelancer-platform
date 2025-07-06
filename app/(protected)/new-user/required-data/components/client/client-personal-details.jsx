'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AvatarInput } from '@/partials/common/avatar-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { saveClientRequiredData } from '@/services/client/required-data';
import { getCountries } from '@/services/general';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { ClientCompanyDataSchema } from '../../forms/client-company-data-schema';

const ClientPersonalDetails = () => {
  const [bioChar, setBioCahr] = useState(0);
  const router = useRouter();
  const { t } = useTranslation('requiredData');
  const cv = (key) => t(`clientValidation.${key}`);
  const cpd = (key) => t(`clientPersonalDetails.${key}`);

  const handleBioChange = (e) => {
    const val = e.target.value;
    const charLength = val.length;
    console.log('charLength', e.target.value);
    setBioCahr(charLength);
  };

  const clientDefaultData = {
    photo: null,
    name: '',
    bio: '',
    country: '1',
    website: '',
  };

  const form = useForm({
    resolver: zodResolver(ClientCompanyDataSchema(cv)),
    defaultValues: clientDefaultData,
    mode: 'onBlur',
  });

  const { control, handleSubmit, trigger } = form;

  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
  const countries = data?.data ?? [];

  const mutation = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'photo' && values.photo instanceof File) {
          formData.append('photo', values.photo);
        } else if (key !== 'photo') {
          formData.append(key, values[key]);
        }
      });
      const response = saveClientRequiredData(formData);
      return response;
    },
    onSuccess: async (data) => {
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
      // redirect to client main dashboard
      setTimeout(() => {
        router.replace('/client');
      }, 1000);
    },
    onError: (error) => {
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    },
  });

  const onSubmit = (values) => {
    console.log('values', values);
    const updataData = {
      ...values,
      country_id: values?.country,
    };
    mutation.mutate(updataData);
  };

  const isProcessing = mutation.isPending || false;

  return (
    <Card className="pb-2.5">
      <CardHeader id="personal_details">
        <CardTitle>{cpd('personalDetailsTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="block w-full space-y-5"
          >
            {/* Photo */}
            <FormField
              control={control}
              name="photo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-baseline flex-wrap gap-2.5">
                  <FormLabel className="flex w-full max-w-56">
                    {cpd('photo')}
                  </FormLabel>
                  <div className="flex justify-between items-center flex-wrap grow gap-2.5">
                    <span className="text-sm text-secondary-foreground">
                      800x800px JPG or PNG
                    </span>
                    <div className="flex justify-between items-center gap-2.5">
                      <FormControl>
                        <AvatarInput
                          {...field}
                          onChange={(val) => {
                            field.onChange(val);
                            trigger('photo');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <FormLabel className="flex w-full items-center gap-1 max-w-56">
                    {cpd('name')}
                  </FormLabel>
                  <div className="flex flex-col flex-grow">
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder={cpd('nameHolder')}
                        className="focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-1" />
                  </div>
                </FormItem>
              )}
            />

            {/* Description (bio) */}
            <FormField
              control={control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <FormLabel className="flex w-full items-center gap-1 max-w-56">
                    {t('bio')}
                  </FormLabel>
                  <div className="flex flex-col flex-grow">
                    <div className="relative">
                      <FormControl>
                        <Textarea
                          id="bio"
                          rows={5}
                          className="focus-visible:ring-0"
                          value={field.value}
                          onChange={(val) => {
                            field.onChange(val);
                            handleBioChange(val);
                          }}
                          placeholder={t('descriptionHolder')}
                        />
                      </FormControl>
                      <span className="absolute right-3 bottom-3 text-sm text-muted-foreground/80">
                        {bioChar}/4000
                      </span>
                    </div>
                    <FormMessage className="mt-1" />
                  </div>
                </FormItem>
              )}
            />

            {/* Country Select */}
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <FormLabel className="flex w-full items-center gap-1 max-w-56">
                    {cpd('country')}
                  </FormLabel>
                  <div className="flex flex-col flex-grow">
                    <FormControl>
                      <Select
                        {...field}
                        defaultValue="1"
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          trigger('country');
                        }}
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            trigger('country');
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('countryHolder')} />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading && <SelectItem>{t('loading')}</SelectItem>}
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

            {/* Website */}
            <FormField
              control={control}
              name="website"
              render={({ field }) => (
                <FormItem className="w-full flex flex-row items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <FormLabel className="flex w-full items-center gap-1 max-w-56">
                    {cpd('website')}
                  </FormLabel>
                  <div className="flex flex-col flex-grow">
                    <FormControl>
                      <Input
                        type="url"
                        id="website"
                        className="focus-visible:ring-0"
                        placeholder={cpd('websiteHolder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-1" />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2.5">
              <Button type="submit" disabled={isProcessing}>
                {isProcessing && <Spinner className="animate-spin" />}
                {t('saveBtn')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { ClientPersonalDetails };
