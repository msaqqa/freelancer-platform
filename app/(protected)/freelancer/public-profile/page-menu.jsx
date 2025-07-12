'use client';

import { useEffect, useState } from 'react';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { useTranslation } from 'react-i18next';
import {
  FREELANCER_MENU_SIDEBAR,
  FREELANCER_MENU_SIDEBAR_FUNCTION,
} from '@/config/freelancer-menu.config';

const PageMenu = () => {
  const [menu, setMenu] = useState(FREELANCER_MENU_SIDEBAR);
  const accountMenuConfig = menu?.[2]?.children;
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.isInitialized) {
      setMenu(FREELANCER_MENU_SIDEBAR_FUNCTION());
    }
  }, [i18n.language]);

  if (accountMenuConfig) {
    return <NavbarMenu items={accountMenuConfig} />;
  } else {
    return <></>;
  }
};

export { PageMenu };
