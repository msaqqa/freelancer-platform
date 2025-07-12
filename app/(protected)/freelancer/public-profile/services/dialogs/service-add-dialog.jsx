'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  addFreelancerPortfolio,
  updateFreelancerPortfolio,
} from '@/services/freelancer/portfolio';
import { getFreelancerServiceById } from '@/services/freelancer/services';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinners';
import { PriceScope, Process, ProjectOverview, Steps } from './components';
import Gallery from './components/gallery';

const ServiceAddDialog = ({ open, closeDialog, serviceId }) => {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();

  const handleNextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  // get freelancer service from api
  // const { data: serviceData, isLoading: serviceLoading } = useQuery({
  //   queryKey: ['serviceId', serviceId],
  //   queryFn: () => getFreelancerServiceById(serviceId),
  // });
  // const portfolio = serviceData?.data ?? {};

  // Form initialization with React Hook Form
  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      attributes: [],
      addOns: [],
    },
    mode: 'onSubmit',
  });

  // Reset form values when dialog is opened
  // useEffect(() => {
  //   if (open) {
  //     form.reset({
  //       title: portfolio?.title,
  //       projectFields: portfolio?.content_blocks,
  //       tags: portfolio?.tags,
  //       projectCover: portfolio?.main_image,
  //     });
  //   }
  // }, [form, open, portfolio]);

  const handleSubmit = (values) => {
    // const updateValues = {};
    console.log('updateValues', values);
    mutation.mutate(values);
  };

  // Define the mutation for deleting the project
  const mutation = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'projectFields' && Array.isArray(values.projectFields)) {
          formData.append('content_blocks', values.projectFields);
        } else if (key !== 'projectFields') {
          formData.append(key, values[key]);
        }
      });

      let response;
      serviceId
        ? (response = await updateFreelancerPortfolio(serviceId, formData))
        : (response = await addFreelancerPortfolio(formData));
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

      queryClient.invalidateQueries({ queryKey: ['user-projects'] }); // Refetch projects list
      closeDialog();
    },
  });

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent variant="fullscreen" className="w-full max-w-4xl mx-auto">
        <DialogHeader className="pb-5 border-b border-border">
          <DialogTitle>
            {serviceId ? 'Edit Service' : 'Add Service'}
          </DialogTitle>
        </DialogHeader>
        <Steps currentStep={0} />
        <ScrollArea className="grow pe-3 -me-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {step === 1 && <ProjectOverview />}
              {/* Add button */}
              {step === 2 && <PriceScope />}
              {step === 3 && <Gallery />}
              {step === 4 && <Process />}

              {/* <div className="flex justify-end">
                <Button
                  disabled={mutation.status === 'pending'}
                  className="text-end"
                >
                  {mutation.status === 'pending' && (
                    <Spinner className="animate-spin" />
                  )}
                  Continue
                </Button>
              </div> */}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          {step === 1 ? (
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
          ) : (
            <Button variant="outline" onClick={handleBackStep}>
              Back
            </Button>
          )}
          <Button type="submit" onClick={handleNextStep}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceAddDialog;
