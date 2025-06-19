'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { getCountries } from '@/services/general';
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GalleryInput } from '@/app/components/partials/common/gallery-input';
import { Steps } from '../components/steps';

export const IdentityVerificationDialog = ({ open, closeDialog, identity }) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const handleComplete = (val) => {
    console.log('val', val);
  };

  const { data, isLoading: countriesLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
  const countries = data?.data ?? [];

  useEffect(() => {
    setStep(1);
  }, [open]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  // Form initialization
  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      country: '1',
      mobile: '',
      firstName: '',
      fatherName: '',
      grandfatherName: '',
      familyName: '',
    },
    mode: 'onSubmit',
  });

  const editFreelancerAbout = () => {};

  // Mutation for creating/updating about
  const mutation = useMutation({
    mutationFn: editFreelancerAbout,
    onSuccess: () => {
      const isEdit = !!about?.id;
      const message = isEdit
        ? 'about updated successfully'
        : 'about added successfully';

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
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        variant="fullscreen"
        className="w-full max-w-[600px] mx-auto"
      >
        <DialogHeader className="py-5 border-b border-border">
          <DialogTitle>Identity Verification</DialogTitle>
        </DialogHeader>
        <ScrollArea className="grow pe-3 -me-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {step > 1 && step < 6 && <Steps currentStep={step - 2} />}
              {step === 1 && (
                <div className="flex flex-col justify-center gap-2.5">
                  <div className="flex flex-col justify-center mb-5">
                    <img
                      src={toAbsoluteUrl('/media/illustrations/42.svg')}
                      className="dark:hidden max-h-[140px]"
                      alt="image"
                    />

                    <img
                      src={toAbsoluteUrl('/media/illustrations/42.svg')}
                      className="light:hidden max-h-[140px]"
                      alt="image"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-5">
                    <h2 className="text-xl font-semibold text-mono">
                      Verify Your Identity
                    </h2>
                    <p className="text-sm text-secondary-foreground leading-5.5 text-center">
                      Verifying your identity helps unlock full platform access
                      and shows clients you're a trusted professional.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="button"
                      size="lg"
                      className="w-1/2"
                      onClick={handleNextStep}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
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
                              <Select
                                value={field?.value}
                                onValueChange={field.onChange}
                              >
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
                </div>
              )}
              {step === 3 && (
                <div>
                  <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-5">
                    <h2 className="text-xl font-semibold text-mono">
                      Enter the verification code
                    </h2>
                    <p className="text-sm text-secondary-foreground leading-5.5 text-center">
                      We’ve sent a 6-digit verification code to +972597803774.
                    </p>
                  </div>
                  <div className="w-full">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      onComplete={handleComplete}
                    >
                      <InputOTPGroup className="w-full flex justify-center gap-2">
                        <InputOTPSlot
                          index={0}
                          className="border border-input rounded-md"
                        />
                        <InputOTPSlot
                          index={1}
                          className="border border-input rounded-md"
                        />
                        <InputOTPSlot
                          index={2}
                          className="border border-input rounded-md"
                        />
                        <InputOTPSeparator />
                        <InputOTPSlot
                          index={3}
                          className="border border-input rounded-md"
                        />
                        <InputOTPSlot
                          index={4}
                          className="border border-input rounded-md"
                        />
                        <InputOTPSlot
                          index={5}
                          className="border border-input rounded-md"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-10">
                    <h2 className="text-xl font-semibold text-mono">
                      Personal Information 
                    </h2>
                    <p className="text-sm text-secondary-foreground leading-5.5 text-center">
                      Please enter your full legal name exactly as written on
                      your official ID.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4.5">
                    <div className="flex flex-col md:flex-row items-center gap-2.5">
                      {/* First Name */}
                      <div className="flex-1 w-full">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  id="firstName"
                                  placeholder="Enter your first name"
                                  className="focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Father’s Name */}
                      <div className="flex-1 w-full">
                        <FormField
                          control={form.control}
                          name="fatherName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Father’s Name</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  id="fatherName"
                                  placeholder="Enter your father’s name"
                                  className="focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2.5">
                      {/* Grandfather Name */}
                      <div className="flex-1 w-full">
                        <FormField
                          control={form.control}
                          name="grandfatherName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Grandfather’s Name</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  id="grandfatherName"
                                  placeholder="Enter your grandfather’s name"
                                  className="focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Family Name */}
                      <div className="flex-1 w-full">
                        <FormField
                          control={form.control}
                          name="familyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Family Name</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  id="familyName"
                                  placeholder="Enter your family name"
                                  className="focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* ID number */}
                    <div className="flex-1 w-full">
                      <FormField
                        control={form.control}
                        name="IDnumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID number</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                id="IDnumber"
                                placeholder="Enter your ID number"
                                className="focus-visible:ring-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Full address */}
                    <div className="flex-1 w-full">
                      <FormField
                        control={form.control}
                        name="fullAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full address</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                id="fullAddress"
                                placeholder="Enter your Full address"
                                className="focus-visible:ring-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              {step === 5 && (
                <div>
                  <div className="flex flex-col items-center gap-y-2.5 space-y-px w-full md:w-[70%] mx-auto mb-5">
                    <h2 className="text-xl font-semibold text-mono">
                      Upload ID photo
                    </h2>
                    <p className="text-sm text-secondary-foreground leading-5.5 text-center">
                      Upload a clear photo of your passport or national ID.
                    </p>
                  </div>
                  {/* Gallery */}
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground text-center mb-5">
                          Make sure all details are visible and sharp.
                        </FormLabel>
                        <FormControl>
                          <GalleryInput
                            multiple={false}
                            {...field}
                            onChange={(val) => {
                              field.onChange(val);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {step === 6 && (
                <div className="flex flex-col justify-center gap-2.5 ">
                  <div className="flex flex-col justify-center mb-5">
                    <img
                      src={toAbsoluteUrl('/media/illustrations/43.svg')}
                      className="dark:hidden max-h-[140px]"
                      alt="image"
                    />

                    <img
                      src={toAbsoluteUrl('/media/illustrations/43.svg')}
                      className="light:hidden max-h-[140px]"
                      alt="image"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-5">
                    <h2 className="text-xl font-semibold text-mono">
                      You’re all set!
                    </h2>
                    <p className="text-sm text-secondary-foreground leading-5.5 text-center">
                      Verification is under review. This may take up to 24
                      hours.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="mono"
                      size="lg"
                      className="w-1/2"
                      onClick={closeDialog}
                    >
                      Back to Profile
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </ScrollArea>
        {step > 1 && step < 6 && (
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleBackStep}>
              Cancel
            </Button>
            <Button type="button" onClick={handleNextStep}>
              Continue
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
