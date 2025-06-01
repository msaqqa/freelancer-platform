'use client';

import { ScrollspyMenu } from './scrollspy-menu';

export function AccountSettingsSidebar({ setActiveSection, activeSection }) {
  const items = [
    {
      title: 'Account Type',
      target: 'account_type',
    },
    {
      title: 'Personal Details',
      target: 'personal_details',
    },
    {
      title: 'Professional Details',
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
