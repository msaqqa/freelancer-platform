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
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FreelancerRequiredDataSchema),
    mode: 'onTouched',
  });

  // function convertToBinary(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = reject;
  //     reader.readAsArrayBuffer(file);
  //   });
  // }
  // const formData = new FormData();
  // const promises = Object.keys(values).map(async (key) => {
  //   if (key === 'photo' && values.photo instanceof File) {
  //     const photoBinary = await convertToBinary(values.photo);
  //     const photoBlob = new Blob([photoBinary]);
  //     formData.append('photo', photoBlob, values.photo.name);
  //   } else if (key !== 'photo') {
  //     formData.append(key, values[key] && values[key]);
  //   }
  // });
  // Wait for all promises to resolve
  // await Promise.all(promises);
  // Send the formData using the custom Axios instance

  const mutation = useMutation({
    // apiFetch(formData)
    mutationFn: addRequiredDataFreelancer,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['account-profile'] });
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
      // redirect to freelancer main dashboard
      setTimeout(() => {
        router.push('/freelancer');
      }, 1500);
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

  const onSubmit = async (values) => {
    console.log('values', values);
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
