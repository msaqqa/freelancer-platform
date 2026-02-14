import i18n from 'i18next';
import { LayoutGrid, UserCircle } from 'lucide-react';

export const CLIENT_MENU_SIDEBAR_FUNCTION = () => {
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
      path: '/client',
    },
  ];
  return menu;
};

export const CLIENT_MENU_SIDEBAR = CLIENT_MENU_SIDEBAR_FUNCTION();

export const CLIENT_MENU_MEGA_FUNCTION = () => {
  const t = (key) => {
    return i18n.isInitialized ? i18n.t(`${key}`, { ns: 'menuSidebar' }) : key;
  };
  const menu = [
    { title: t('postJob'), path: '#' },
    { title: t('findTalent'), path: '#' },
    { title: t('findService'), path: '#' },
    { title: t('findJobs'), path: '#' },
    { title: t('myDashboard'), path: '/client' },
  ];
  return menu;
};

export const CLIENT_MENU_MEGA = CLIENT_MENU_MEGA_FUNCTION();

export const CLIENT_MENU_MEGA_MOBILE = CLIENT_MENU_MEGA_FUNCTION();
