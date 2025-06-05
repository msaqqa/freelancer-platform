'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useClientStore } from '@/stores/clientStore';
import { useTranslation } from 'react-i18next';
import TypeComponent from '../components/type-component';

export default function ClientType() {
  const clientType = useClientStore((state) => state.clientType);
  const setClientType = useClientStore((state) => state.setClientType);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation('requiredData');

  const handleChange = (value) => {
    setClientType(value);
  };

  const handleSubmit = () => {
    router.push(`/new-user/required-data`);
  };

  const clientTypeOptions = [
    {
      name: 'Personal Profile',
      lightImg: '/media/illustrations/39.svg',
      darkImg: '',
      active: clientType === 'personal',
      value: 'personal',
    },
    {
      name: 'Company Profile',
      lightImg: '/media/illustrations/40.svg',
      darkImg: '',
      active: clientType === 'company',
      value: 'company',
    },
  ];

  return (
    <div className="grow-1">
      <TypeComponent
        img={{
          light: '/media/illustrations/38.svg',
          dark: '/media/illustrations/38-dark.svg',
        }}
        title="I Want To Hire New Talent."
        desc="Find the right people faster and grow your business with ease."
        options={clientTypeOptions}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
