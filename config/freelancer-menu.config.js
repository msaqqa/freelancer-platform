import { LayoutGrid, UserCircle } from 'lucide-react';

export const FREELANCER_MENU_SIDEBAR = [
  {
    title: 'postJob',
    icon: LayoutGrid,
    path: '#',
  },
  {
    title: 'findTalent',
    icon: UserCircle,
    path: '#',
  },
  {
    title: 'findService',
    icon: UserCircle,
    path: '#',
  },
  {
    title: 'findJobs',
    icon: UserCircle,
    path: '#',
  },
  {
    title: 'myDashboard',
    icon: UserCircle,
    path: '/freelancer',
  },
];

export const FREELANCER_MENU_MEGA = [
  { title: 'postJob', path: '#' },
  { title: 'findTalent', path: '#' },
  { title: 'findService', path: '#' },
  { title: 'findJobs', path: '#' },
  { title: 'myDashboard', path: '/freelancer' },
];

export const FREELANCER_MENU_MEGA_MOBILE = FREELANCER_MENU_MEGA;
