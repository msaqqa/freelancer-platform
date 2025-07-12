'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation } from '@tanstack/react-query';
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
    mutationFn: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'photo' && values.photo instanceof File) {
          formData.append('photo', values.photo);
        }
        if (key === 'skills') {
          formData.append('skills', JSON.stringify(values.skills));
        } else if (key !== 'photo') {
          formData.append(key, values[key]);
        }
      });
      const response = addRequiredDataFreelancer(formData);
      return response;
    },
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
      // redirect to freelancer profile
      router.replace('/freelancer/public-profile/profile');
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
      available_hire: 1,
    };
    console.log('updataData', updataData);
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
