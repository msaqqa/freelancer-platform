'use client';

import { useTranslation } from 'react-i18next';
import { ScrollspyMenu } from './scrollspy-menu';

export function RequiredDataSidebar({
  accountType,
  clientType,
  activeSection,
  setActiveSection,
  handleClickBtn,
}) {
  const { t } = useTranslation('requiredData');
  const clientItems = [
    {
      title: t('sidebarAccounType'),
      target: 'account_type',
    },
    {
      title: 'Personal Details',
      target: 'personal_details',
    },
    {
      title: 'Company Details',
      target: 'company_details',
    },
    // clientType === 'personal' && {
    //   title: 'Personal Details',
    //   target: 'personal_details',
    // },
    // clientType === 'company' && {
    //   title: 'Company Details',
    //   target: 'company_details',
    // },
  ];
  const freelancerItems = [
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
  const items = accountType === 'client' ? clientItems : freelancerItems;

  return (
    <ScrollspyMenu
      items={items}
      setActiveSection={setActiveSection}
      activeSection={activeSection}
    />
  );
}
