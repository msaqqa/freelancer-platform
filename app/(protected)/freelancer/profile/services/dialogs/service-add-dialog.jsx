'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import { Spinner } from '@/components/ui/spinners';
import {
  Description,
  PriceScope,
  Process,
  Review,
  ServiceOverview,
  Steps,
} from './components';
import Gallery from './components/gallery';
import { ServiceSchema } from './forms';

const TOTAL_STEPS = 6;

// Fields validated when leaving each step.
const STEP_FIELDS = {
  1: ['service', 'category', 'specialty'],
  2: ['delivery-Days', 'Project price'],
  3: ['images'],
  4: ['requirements'],
  5: ['description'],
  6: ['legalConfirm', 'agreeTerms', 'privacyAck'],
};

const ServiceAddDialog = ({ open, closeDialog, serviceId }) => {
  const { t } = useTranslation('services');
  const { t: tv } = useTranslation('validation');
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();

  const isLastStep = step === TOTAL_STEPS;

  // Validate the current step's fields (zod). Errors render under each field and
  // clear automatically on edit (reValidateMode: onChange).
  const handleContinue = async () => {
    const valid = await form.trigger(STEP_FIELDS[step]);
    if (!valid) return;
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
    resolver: zodResolver(ServiceSchema(tv)),
    defaultValues: {
      service: '',
      category: '',
      specialty: '',
      skills: [],
      'delivery-Days': '',
      'Project price': '',
      attributes: [],
      addOns: [],
      images: [],
      requirements: [],
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
            {serviceId ? t('dialog.editTitle') : t('dialog.addTitle')}
          </DialogTitle>
        </DialogHeader>
        <Steps currentStep={step - 1} />
        <ScrollArea className="grow pe-3 -me-3">
          <Form {...form}>
            {/* All steps stay mounted (hidden when inactive) so every field
                keeps its value across steps and is captured on submit. */}
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className={step === 1 ? 'space-y-5' : 'hidden'}>
                <ServiceOverview />
              </div>
              <div className={step === 2 ? 'space-y-5' : 'hidden'}>
                <PriceScope />
              </div>
              <div className={step === 3 ? 'space-y-5' : 'hidden'}>
                <Gallery />
              </div>
              <div className={step === 4 ? 'space-y-5' : 'hidden'}>
                <Process />
              </div>
              <div className={step === 5 ? 'space-y-5' : 'hidden'}>
                <Description />
              </div>
              <div className={step === 6 ? 'space-y-5' : 'hidden'}>
                <Review />
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          {step === 1 ? (
            <Button variant="outline" onClick={closeDialog}>
              {t('cancelBtn')}
            </Button>
          ) : (
            <Button variant="outline" onClick={handleBackStep}>
              {t('backBtn')}
            </Button>
          )}
          <Button
            type="button"
            onClick={handleContinue}
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' && (
              <Spinner className="animate-spin" />
            )}
            {isLastStep ? t('dialog.submitBtn') : t('continueBtn')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceAddDialog;
