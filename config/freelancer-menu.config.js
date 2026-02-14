import i18n from 'i18next';
import { LayoutGrid, UserCircle } from 'lucide-react';

export const FREELANCER_MENU_SIDEBAR_FUNCTION = () => {
  const t = (key) => {
    return i18n.isInitialized ? i18n.t(`${key}`, { ns: 'menuSidebar' }) : key;
  };
  const menu = [
    {
      title: t('postJob'),
      icon: LayoutGrid,
      path: '#',
    },
    {
      title: t('findTalent'),
      icon: UserCircle,
      path: '#',
    },
    {
      title: t('findService'),
      icon: UserCircle,
      path: '#',
    },
    {
      title: t('findJobs'),
      icon: UserCircle,
      path: '#',
    },
    {
      title: t('myDashboard'),
      icon: UserCircle,
      path: '/freelancer',
    },
  ];
  return menu;
};

export const FREELANCER_MENU_SIDEBAR = FREELANCER_MENU_SIDEBAR_FUNCTION();

export const FREELANCER_MENU_MEGA_FUNCTION = () => {
  const t = (key) => {
    return i18n.isInitialized ? i18n.t(`${key}`, { ns: 'menuSidebar' }) : key;
  };
  const menu = [
    { title: t('postJob'), path: '#' },
    { title: t('findTalent'), path: '#' },
    { title: t('findService'), path: '#' },
    { title: t('findJobs'), path: '#' },
    { title: t('myDashboard'), path: '/freelancer' },
  ];
  return menu;
};

export const FREELANCER_MENU_MEGA = FREELANCER_MENU_MEGA_FUNCTION();

export const FREELANCER_MENU_MEGA_MOBILE = FREELANCER_MENU_MEGA_FUNCTION();
