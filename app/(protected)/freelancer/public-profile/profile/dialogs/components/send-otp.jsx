'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { sendOtp } from '@/services/freelancer/profile';
import { getCountries } from '@/services/general';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
import { MobileSchema } from '../forms';
import { Steps } from './';

export const SendOtp = ({ handleNextStep, closeDialog, setMobile, t }) => {
  const { t: tv } = useTranslation('validation');

  // Form initialization
  const form = useForm({
    resolver: zodResolver(MobileSchema(tv)),
    defaultValues: {
      country: '1',
      mobile: '',
    },
    mode: 'onBlur',
  });
  const { errors } = form?.formState;

  const { data, isLoading: countriesLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
  const countries = data?.data ?? [];

  const handleSubmit = async (values) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: async (data) => {
      const mobile = form.getValues('mobile');
      setMobile(mobile);
      handleNextStep();
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
    },
  });

  const isProcessing = mutation.isPending || false;

  return (
    <div className="h-full flex flex-col p-6">
      <Steps currentStep={0} t={t} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-5 w-full md:w-[80%] mx-auto">
            <div className="flex flex-col items-center gap-y-2.5 mb-5">
              <h2 className="text-xl font-semibold text-mono">
                {t('stepMobileTitle')}
              </h2>
              <p className="text-sm text-secondary-foreground leading-5.5 text-center">
                {t('stepMobileDesc')}
              </p>
            </div>
            {/* Phone Number */}
            <div>
              <FormLabel className="inline-block mb-2">
                {t('mobileLabel')}
              </FormLabel>
              <div
                className={`flex items-center border rounded-md mb-2 ${errors?.mobile ? 'border-destructive focus:border-destructive ring-destructive' : 'border-input'} `}
              >
                {/* Country Code and Flag inside the input */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex-shrink-0">
                      <FormControl>
                        <Select
                          value={field?.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-0 focus-visible:outline-none focus-visible:ring-0">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            {/* {countriesLoading && (
                            <SelectItem>loading...</SelectItem>
                          )} */}
                            {countries.length &&
                              countries.map((country) => (
                                <SelectItem
                                  key={country.id}
                                  value={country.id.toString()}
                                >
                                  <div className="flex items-center gap-1 h-8.5 bg-transparent">
                                    <img
                                      src={country?.flag}
                                      alt="Country Flag"
                                      className="w-6 h-4"
                                    />
                                    <span className="text-sm">
                                      {country?.number_code}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Phone Number Input */}
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          type="text"
                          maxLength="15"
                          className="ps-0 border-0 focus-visible:outline-none focus-visible:ring-0"
                          placeholder={t('mobileHolder')}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {errors.mobile && (
                <FormMessage>{errors.mobile.message}</FormMessage>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-end gap-2.5 mt-5">
            <Button type="button" variant="outline" onClick={closeDialog}>
              {t('closeBtn')}
            </Button>

            <Button disabled={isProcessing || !form.formState.isDirty}>
              {isProcessing && <Spinner className="animate-spin" />}
              {t('continueBtn')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
