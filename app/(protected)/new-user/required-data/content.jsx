'use client';

import { useEffect, useRef, useState } from 'react';
import { useClientStore } from '@/stores/clientStore';
import { useUserStore } from '@/stores/userStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { useSettings } from '@/providers/settings-provider';
import { addRequiredDataFreelancer } from '@/services/freelancer/required-data';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Scrollspy } from '@/components/ui/scrollspy';
import {
  ClientPersonalDetails,
  PersonalDetails,
  ProfessionalDetails,
} from './components';
import { CompanyDetails } from './components/client/company-details';
import { FreelancerRequiredDataSchema } from './forms/freelancer-required-data-schema';
import { RequiredDataSidebar } from './required-data-sidebar';

const stickySidebarClasses = {
  'demo1-layout': 'top-[calc(var(--header-height)+1rem)]',
  'demo2-layout': 'top-[calc(var(--header-height)+1rem)]',
  'demo3-layout': 'top-[calc(var(--header-height)+var(--navbar-height)+1rem)]',
  'demo4-layout': 'top-[3rem]',
  'demo5-layout': 'top-[calc(var(--header-height)+1.5rem)]',
  'demo6-layout': 'top-[3rem]',
  'demo7-layout': 'top-[calc(var(--header-height)+1rem)]',
  'demo8-layout': 'top-[3rem]',
  'demo9-layout': 'top-[calc(var(--header-height)+1rem)]',
  'demo10-layout': 'top-[1.5rem]',
};

export function AccountSettingsSidebarContent() {
  const accountType = useUserStore((state) => state.accountType);
  const clientType = useClientStore((state) => state.clientType);
  const isMobile = useIsMobile();
  const { settings } = useSettings();
  const [sidebarSticky, setSidebarSticky] = useState(false);
  const [activeSection, setActiveSection] = useState(
    clientType === 'company' ? 'company_details' : 'personal_details',
  );
  const { t } = useTranslation('requiredData');

  // Initialize ref for parentEl
  const parentRef = useRef(document); // Default to document
  const scrollPosition = useScrollPosition({ targetRef: parentRef });

  // Effect to update parentRef after the component mounts
  useEffect(() => {
    const scrollableElement = document.getElementById('scrollable_content');
    if (scrollableElement) {
      parentRef.current = scrollableElement;
    }
  }, []); // Run only once on component mount

  // Handle scroll position and sidebar stickiness
  useEffect(() => {
    setSidebarSticky(scrollPosition > 100);
  }, [scrollPosition]);

  // Get the sticky class based on the current layout, provide a default if not found
  const stickyClass = settings?.layout
    ? stickySidebarClasses[settings?.layout] ||
      'top-[calc(var(--header-height)+1rem)]'
    : 'top-[calc(var(--header-height)+1rem)]';

  // start form
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(FreelancerRequiredDataSchema),
    mode: 'onTouched',
  });

  const handleClickBtn = async () => {
    const isValid = await form.trigger([
      'name',
      'photo',
      'birthDate',
      'gender',
      'country',
      'mobile',
    ]);
    if (isValid) {
      setActiveSection('professional_details');
    }
  };

  function convertToBinary(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  const mutation = useMutation({
    // apiFetch(formData)
    mutationFn: async (values) => {
      const formData = new FormData();
      const promises = Object.keys(values).map(async (key) => {
        if (key === 'photo' && values.photo instanceof File) {
          const photoBinary = await convertToBinary(values.photo);
          const photoBlob = new Blob([photoBinary]);
          formData.append('photo', photoBlob, values.photo.name);
        } else if (key !== 'photo') {
          formData.append(key, values[key] && values[key]);
        }
      });

      // Wait for all promises to resolve
      await Promise.all(promises);

      // Send the formData using the custom Axios instance
      await addRequiredDataFreelancer(formData);
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['account-profile'] });
      toast.custom(() => (
        <Alert variant="mono" icon="success">
          <AlertIcon>
            <RiCheckboxCircleFill />
          </AlertIcon>
          <AlertTitle>{t('alertSuccess')}</AlertTitle>
        </Alert>
      ));
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
    };
    mutation.mutate(updataData);
  };

  const isProcessing = mutation.isPending || false;

  return (
    <div className="flex grow gap-5 lg:gap-7.5">
      {!isMobile && (
        <div className="w-[230px] shrink-0">
          <div
            className={cn(
              'w-[230px]',
              sidebarSticky && `fixed z-10 start-auto ${stickyClass}`,
            )}
          >
            <Scrollspy offset={100}>
              <RequiredDataSidebar
                accountType={accountType}
                clientType={clientType}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                handleClickBtn={handleClickBtn}
              />
            </Scrollspy>
          </div>
        </div>
      )}
      <div className="flex flex-col items-stretch grow gap-5 lg:gap-7.5">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {accountType == 'freelancer' && (
              <>
                {activeSection === 'personal_details' && (
                  <PersonalDetails setActiveSection={setActiveSection} />
                )}
                {activeSection === 'professional_details' && (
                  <ProfessionalDetails isProcessing={isProcessing} />
                )}
              </>
            )}
            {accountType == 'client' && (
              <>
                <CompanyDetails />
                <ClientPersonalDetails />
                {/* {clientType === 'personal' &&
                  activeSection === 'personal_details' && (
                    <ClientPersonalDetails />
                  )}
                {clientType === 'company' &&
                  activeSection === 'company_details' && <CompanyDetails />} */}
              </>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
