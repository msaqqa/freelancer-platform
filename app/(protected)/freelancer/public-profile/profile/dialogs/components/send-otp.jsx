import React from 'react';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { sendOtp } from '@/services/freelancer/profile';
import { getCountries } from '@/services/general';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinners';

export const SendOtp = ({ handleNextStep, handleBackStep, setMobile }) => {
  // Form initialization
  const form = useForm({
    defaultValues: {
      country: '1',
      mobile: '',
    },
    mode: 'onSubmit',
  });

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

  const isProcessing = mutation.isPending || false;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 h-full flex flex-col justify-center"
      >
        <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-5">
          <h2 className="text-xl font-semibold text-mono">
            Let’s set up your Mobile!
          </h2>
          <p className="text-sm text-secondary-foreground leading-5.5 text-center">
            What Mobile number would you like to use for verification?
          </p>
        </div>
        {/* Phone Number */}
        <div
          className={`flex items-center border rounded-md ${form?.formState?.errors?.mobile ? 'border-destructive focus:border-destructive ring-destructive' : 'border-input'} `}
        >
          {/* Country Code and Flag inside the input */}
          <div className="w-fit">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field?.value} onValueChange={field.onChange}>
                      <SelectTrigger className="border-0 focus-visible:outline-none focus-visible:ring-0">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {countriesLoading && (
                          <SelectItem>loading...</SelectItem>
                        )}
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
          </div>
          {/* Phone Number Input */}
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      maxLength="15"
                      {...field}
                      className="ps-0 border-0 focus-visible:outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={handleBackStep}>
            Cancel
          </Button>

          <Button disabled={isProcessing}>
            {isProcessing && <Spinner className="animate-spin" />}
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
};
