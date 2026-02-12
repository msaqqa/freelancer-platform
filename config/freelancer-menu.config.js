import i18n from 'i18next';
import { LayoutGrid, UserCircle } from 'lucide-react';

export const FREELANCER_MENU_SIDEBAR_FUNCTION = () => {
  const t = (key) => {
    return i18n.isInitialized ? i18n.t(`${key}`, { ns: 'menuSidebar' }) : key;
  };
  const menu = [
    {
      title: t('dashboards'),
      icon: LayoutGrid,
      children: [
        { title: t('lightSidebar'), path: '/freelancer' },
        { title: t('darkSidebar'), path: '/freelancer/dark-sidebar' },
      ],
    },
    {
      title: t('profile'),
      icon: UserCircle,
      children: [
        {
          title: t('profile'),
          path: '/freelancer/profile',
        },
        {
          title: t('portfolio'),
          path: '/freelancer/portfolio',
        },
        {
          title: t('services'),
          path: '/freelancer/services',
        },
        {
          title: t('experience'),
          path: '/freelancer/experience',
        },
        {
          title: t('workHistory'),
          path: '/freelancer/work-history',
        },
      ],
    },
  ];
  return menu;
};

export const FREELANCER_MENU_SIDEBAR = FREELANCER_MENU_SIDEBAR_FUNCTION();

export const FREELANCER_MENU_MEGA = [
  { title: 'Profile', path: '/freelancer/profile' },
  { title: 'Portfolio', path: '/freelancer/portfolio' },
  { title: 'Services', path: '/freelancer/services' },
  { title: 'Experience', path: '/freelancer/experience' },
  { title: 'Work History', path: '/freelancer/work-history' },
];

export const FREELANCER_MENU_MEGA_MOBILE = [
  { title: 'Profile', path: '/freelancer/profile' },
  { title: 'Portfolio', path: '/freelancer/portfolio' },
  { title: 'Services', path: '/freelancer/services' },
  { title: 'Experience', path: '/freelancer/experience' },
  { title: 'Work History', path: '/freelancer/work-history' },
];
