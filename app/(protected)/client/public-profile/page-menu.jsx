'use client';

import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { CLIENT_MENU_SIDEBAR } from '@/config/client-menu.config';

const PageMenu = () => {
  const accountMenuConfig = CLIENT_MENU_SIDEBAR?.['2']?.children;

  if (accountMenuConfig) {
    return <NavbarMenu items={accountMenuConfig} />;
  } else {
    return <></>;
  }
};

export { PageMenu };
