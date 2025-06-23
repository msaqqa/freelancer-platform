import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateIdentity } from '@/services/freelancer/profile';
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
import { Spinner } from '@/components/ui/spinners';
import { GalleryInput } from '@/app/components/partials/common/gallery-input';
import { FreelancerIdentitySchema } from '../../forms/identity-schema';

export const UpdateIdentity = ({ step, handleNextStep, handleBackStep }) => {
  // Form initialization
  const form = useForm({
    resolver: zodResolver(FreelancerIdentitySchema()),
    defaultValues: {
      firstName: '',
      fatherName: '',
      grandfatherName: '',
      familyName: '',
      IDNumber: '',
      fullAddress: '',
      image: null,
    },
    mode: 'onBlur',
  });

  // Mutation for creating/updating about
  const mutation = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'image' && values.photo instanceof File) {
          formData.append('image', values.photo);
        } else if (key !== 'image') {
          formData.append(key, values[key]);
        }
      });
      const response = updateIdentity(formData);
      return response;
    },
    onSuccess: async (data) => {
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

  // Derive the loading state from the mutation status
  const isProcessing = mutation.isPending || false;

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log('values', values);
    const updataData = {
      id_number: values.IDNumber,
      familyName: values.familyName,
      father_name: values.fatherName,
      first_name: values.firstName,
      full_address: values.fullAddress,
      grandfather_name: values.grandfatherName,
      image: values.image,
    };
    mutation.mutate(updataData);
  };

  const handleContinueBtn = async () => {
    const isValid = await form.trigger([
      'firstName',
      'fatherName',
      'grandfatherName',
      'familyName',
      'IDNumber',
      'fullAddress',
    ]);
    if (isValid) {
      handleNextStep();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 h-full flex flex-col justify-center"
      >
        {step === 4 && (
          <div>
            <div className="flex flex-col items-center gap-y-2.5 w-full md:w-[70%] mx-auto mb-10">
              <h2 className="text-xl font-semibold text-mono">
                Personal Information 
              </h2>
              <p className="text-sm text-secondary-foreground leading-5.5 text-center">
                Please enter your full legal name exactly as written on your
                official ID.
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
                  name="IDNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="IDNumber"
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-center mb-5">
                    Make sure all details are visible and sharp.
                  </FormLabel>
                  <FormControl>
                    <GalleryInput
                      multiple={false}
                      onChange={(val) => {
                        field.onChange(val);
                        form.trigger('image');
                      }}
                    />
                  </FormControl>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
          </div>
        )}

        {(step === 4 || step === 5) && (
          <div className="flex flex-col md:flex-row md:justify-end gap-2.5">
            <Button type="button" variant="outline" onClick={handleBackStep}>
              Cancel
            </Button>

            {step === 4 && (
              <Button type="button" onClick={handleContinueBtn}>
                Continue
              </Button>
            )}

            {step === 5 && (
              <Button disabled={isProcessing}>
                {isProcessing && <Spinner className="animate-spin" />}
                Send
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
};
