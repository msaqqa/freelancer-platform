'use client';

import { useTranslation } from 'react-i18next';
import { ScrollspyMenu } from './scrollspy-menu';

export function RequiredDataSidebar({ setActiveSection, activeSection }) {
  const { t } = useTranslation('requiredData');
  const items = [
    {
      title: t('sidebarAccounType'),
      target: 'account_type',
    },
    {
      title: t('sidebarPersonalDetails'),
      target: 'personal_details',
    },
    {
      title: t('sidebarProfessionalDetails'),
      target: 'professional_details',
    },
  ];

  return (
    <ScrollspyMenu
      items={items}
      setActiveSection={setActiveSection}
      activeSection={activeSection}
    />
  );
}
