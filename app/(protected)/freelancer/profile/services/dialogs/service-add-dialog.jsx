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

const TOTAL_STEPS = 6;

const ServiceAddDialog = ({ open, closeDialog, serviceId }) => {
  const [step, setStep] = useState(1);
  const queryClient = useQueryClient();

  // Clear a field's required error as soon as the user edits it.
  useEffect(() => {
    const subscription = form.watch((_values, { name }) => {
      if (name) form.clearErrors(name);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const isLastStep = step === TOTAL_STEPS;

  // Plain-text length inside the rich-text description.
  const textLength = (html) => {
    if (typeof document === 'undefined' || !html) return 0;
    const el = document.createElement('div');
    el.innerHTML = html;
    return (el.textContent || '').trim().length;
  };

  // Required-field gate per step. Sets inline errors and blocks advancing.
  const validateStep = (current) => {
    const v = form.getValues();
    form.clearErrors();
    const missing = [];
    const req = (name, ok, message) => {
      if (!ok) {
        form.setError(name, { type: 'manual', message });
        missing.push(name);
      }
    };

    if (current === 1) {
      req('service', !!v.service?.trim(), 'Service name is required');
      req('category', !!v.category, 'Industry is required');
      req('specialty', !!v.specialty, 'Specialty is required');
      req(
        'skills',
        Array.isArray(v.skills) && v.skills.length > 0,
        'Select at least one skill',
      );
    } else if (current === 2) {
      req(
        'delivery-Days',
        !!String(v['delivery-Days'] ?? '').trim(),
        'Delivery days is required',
      );
      req(
        'Project price',
        !!String(v['Project price'] ?? '').trim(),
        'Project price is required',
      );
    } else if (current === 3) {
      req(
        'images',
        Array.isArray(v.images) && v.images.length > 0,
        'Upload at least one image',
      );
    } else if (current === 4) {
      req(
        'requirements.0.requirementsDetails',
        Array.isArray(v.requirements) &&
          v.requirements.some((r) => r?.requirementsDetails?.trim()),
        'Add at least one requirement',
      );
    } else if (current === 5) {
      req(
        'description',
        textLength(v.description) >= 10,
        'Description must be at least 10 characters',
      );
    } else if (current === 6) {
      req(
        'legalConfirm',
        v.legalConfirm === true,
        'Please confirm your content is original or properly licensed',
      );
      req(
        'agreeTerms',
        v.agreeTerms === true,
        'You must agree to the Terms of Use, User Agreement, and Privacy Policy',
      );
      req(
        'privacyAck',
        v.privacyAck === true,
        'Please acknowledge the privacy notice to continue',
      );
    }

    return missing.length === 0;
  };

  const handleContinue = () => {
    if (!validateStep(step)) return;
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
            {serviceId ? 'Edit Service' : 'Add Service'}
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
            {mutation.status === 'pending' && (
              <Spinner className="animate-spin" />
            )}
            {isLastStep ? 'Submit for Review' : 'Continue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceAddDialog;
