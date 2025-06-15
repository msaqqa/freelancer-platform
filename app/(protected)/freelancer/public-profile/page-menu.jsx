'use client';

import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { FREELANCER_MENU_SIDEBAR } from '@/config/freelancer-menu.config';

const PageMenu = () => {
  const accountMenuConfig = FREELANCER_MENU_SIDEBAR?.['2']?.children;

  if (accountMenuConfig) {
    return <NavbarMenu items={accountMenuConfig} />;
  } else {
    return <></>;
  }
};

export { PageMenu };
