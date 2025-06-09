'use client';

import { useRouter } from 'next/navigation';
import { AvatarInput } from '@/partials/common/avatar-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { saveClientRequiredData } from '@/services/client/required-data';
import { getCountries } from '@/services/general';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const router = useRouter();
  const { t } = useTranslation('requiredData');
  const cpd = (key) => t(`clientPersonalDetails.${key}`);

  const form = useForm({
    resolver: zodResolver(ClientCompanyDataSchema),
    mode: 'onTouched',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = form;

  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
  const countries = data?.data ?? [];

  const mutation = useMutation({
    mutationFn: saveClientRequiredData,
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
      // redirect to client main dashboard
      setTimeout(() => {
        router.push('/client');
      }, 1500);
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
            <div className="flex items-center flex-wrap gap-2.5">
              <Label className="flex w-full max-w-56"> {cpd('photo')}</Label>
              <div className="flex items-center justify-between flex-wrap grow gap-2.5">
                <span className="text-sm text-secondary-foreground">
                  800x800px JPEG, PNG
                </span>
                <Controller
                  name="photo"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <AvatarInput
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        trigger('photo');
                      }}
                      aria-invalid={errors.photo ? 'true' : 'false'}
                    />
                  )}
                />
              </div>
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="w-full">
              <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                <Label className="flex w-full items-center gap-1 max-w-56">
                  {cpd('name')}
                </Label>
                <div className="flex flex-col flex-grow">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder={cpd('nameHolder')}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description (bio) */}
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <Label className="flex w-full max-w-56">{t('description')}</Label>
              <div className="flex flex-col flex-grow">
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      placeholder={t('descriptionHolder')}
                      className="text-sm text-secondary-foreground font-normal rounded-md border border-input px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      rows={5}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            {/* Country Select */}
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <Label className="flex w-full max-w-56">{cpd('country')}</Label>
              <div className="flex flex-col flex-grow">
                <Controller
                  control={control}
                  name="country"
                  defaultValue="1"
                  render={({ field }) => (
                    <Select
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
                      <SelectTrigger
                        aria-invalid={errors.gender ? 'true' : 'false'}
                        className={
                          errors.gender
                            ? 'border-destructive focus:border-destructive'
                            : ''
                        }
                      >
                        <SelectValue placeholder={cpd('countryHolder')} />
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
                  )}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            {/* Website */}
            <div className="w-full">
              <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                <Label className="flex w-full items-center gap-1 max-w-56">
                  {cpd('website')}
                </Label>
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={cpd('websiteHolder')}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

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
