'use client';

import { useEffect, useState } from 'react';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  addFreelancerService,
  getFreelancerServiceById,
  updateFreelancerService,
} from '@/services/freelancer/services';
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
import {
  Description,
  PriceScope,
  Process,
  Review,
  ServiceOverview,
  Steps,
} from './components';
import Gallery from './components/gallery';

const TOTAL_STEPS = 6;

const ServiceAddDialog = ({ open, closeDialog, serviceId }) => {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();

  const isLastStep = step === TOTAL_STEPS;

  const handleContinue = () => {
    if (isLastStep) {
      form.handleSubmit(handleSubmit)();
      return;
    }
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      attributes: [],
      addOns: [],
      description: '',
      legalConfirm: false,
      agreeTerms: false,
      privacyAck: false,
    },
    mode: 'onSubmit',
  });

  // Fetch the service when editing.
  const { data: serviceData } = useQuery({
    queryKey: ['serviceId', serviceId],
    queryFn: () => getFreelancerServiceById(serviceId),
    enabled: !!serviceId && open,
  });
  const service = serviceData?.data ?? null;

  // Prefill the form in edit mode (reverse of the service-layer mapping).
  useEffect(() => {
    if (!open || !serviceId || !service?.id) return;

    form.reset({
      service: service.title ?? '',
      description: service.description ?? '',
      category: service.category_id ? String(service.category_id) : '',
      specialty: service.subcategory_id ? String(service.subcategory_id) : '',
      skills: service.skills ?? [],
      'Project price': service.price ?? '',
      'delivery-Days': service.delivery_days ?? '',
      revisions: service.pricing?.revisions ?? '',
      addOns: service.pricing?.addOns ?? [],
      customAddOns: service.pricing?.customAddOns ?? [],
      requirements: service.requirements ?? [],
      images: service.images ?? [],
      legalConfirm: false,
      agreeTerms: false,
      privacyAck: false,
    });
  }, [form, open, serviceId, service?.id]);

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  // Create / update the service. The service layer uploads gallery images and
  // posts the payload to the API (Supabase-backed route handlers).
  const mutation = useMutation({
    mutationFn: async (values) =>
      serviceId
        ? await updateFreelancerService(serviceId, values)
        : await addFreelancerService(values),
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

      queryClient.invalidateQueries({ queryKey: ['freelancer-services'] });
      if (serviceId) {
        queryClient.invalidateQueries({ queryKey: ['serviceId', serviceId] });
      }
      setStep(1);
      form.reset();
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
        <Steps currentStep={step - 1} />
        <ScrollArea className="grow pe-3 -me-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {step === 1 && <ServiceOverview />}
              {step === 2 && <PriceScope />}
              {step === 3 && <Gallery />}
              {step === 4 && <Process />}
              {step === 5 && <Description />}
              {step === 6 && <Review />}
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
          <Button
            type="button"
            onClick={handleContinue}
            disabled={mutation.status === 'pending'}
          >
            {isLastStep ? 'Submit for Review' : 'Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceAddDialog;
