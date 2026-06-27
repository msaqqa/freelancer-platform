'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { addRequiredDataFreelancer } from '@/services/freelancer/required-data';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { FreelancerRequiredDataSchema } from '../../forms/freelancer-required-data-schema';
import { PersonalDetails } from './personal-details';
import { ProfessionalDetails } from './professional-details';

function FreelancerRequiredData({ activeSection, setActiveSection }) {
  const { t } = useTranslation('requiredData');
  const fv = (key) => t(`freelancerValidation.${key}`);
  const router = useRouter();
  const queryClient = useQueryClient();

  const freelancerDefaultData = {
    photo: null,
    name: '',
    birthDate: '',
    gender: 'male',
    country: '1',
    mobile: '',
    category: '',
    subcategory: '',
    skills: [],
    bio: '',
    hourlyRate: '',
    availability: true,
  };

  const form = useForm({
    resolver: zodResolver(FreelancerRequiredDataSchema(fv)),
    defaultValues: freelancerDefaultData,
    mode: 'onBlur',
  });

  const mutation = useMutation({
    mutationFn: (values) => addRequiredDataFreelancer(values),
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
      // Optimistically mark onboarding complete so the dashboard doesn't
      // bounce back to required-data, then navigate immediately.
      queryClient.setQueryData(['user-profile'], (prev) =>
        prev ? { data: { ...prev.data, save_data: true } } : prev,
      );
      router.replace('/freelancer');
      // Reconcile fresh profile data in the background (no loader).
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  const onSubmit = async (values) => {
    const updataData = {
      ...values,
      birth_date: values?.birthDate,
      country_id: values?.country,
      category_id: values?.category,
      skills: values?.skills.map((skill) => skill.id),
      sub_category_id: values?.subcategory,
      hourly_rate: values?.hourlyRate,
      available_hire: values?.availability ? 1 : 0,
    };
    mutation.mutate(updataData);
  };

  const isProcessing = mutation.isPending || false;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <>
          {activeSection === 'personal_details' && (
            <PersonalDetails setActiveSection={setActiveSection} />
          )}
          {activeSection === 'professional_details' && (
            <ProfessionalDetails isProcessing={isProcessing} />
          )}
        </>
      </form>
    </FormProvider>
  );
}

export { FreelancerRequiredData };
