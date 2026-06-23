'use client';

import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { CLIENT_MENU_SIDEBAR } from '@/config/client-menu.config';
import { useMenuTranslation } from '@/hooks/use-menu-translation';

const PageMenu = () => {
  const translatedMenu = useMenuTranslation(CLIENT_MENU_SIDEBAR);
  const accountMenuConfig = translatedMenu?.['2']?.children;

  if (accountMenuConfig) {
    return <NavbarMenu items={accountMenuConfig} />;
  } else {
    return <></>;
  }
};

export { PageMenu };
