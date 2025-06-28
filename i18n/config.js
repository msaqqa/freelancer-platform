// src/config/languages.ts
import authAr from '../public/locales/ar/auth.json';
import commonAr from '../public/locales/ar/common.json';
import menuSidebarAr from '../public/locales/ar/freelancer/menu-sidebar.json';
import freelancerProfileAr from '../public/locales/ar/freelancer/profile.json';
import requiredDataAr from '../public/locales/ar/required-data.json';
import validationAr from '../public/locales/ar/validation.json';
import authEn from '../public/locales/en/auth.json';
import commonEn from '../public/locales/en/common.json';
import menuSidebarEn from '../public/locales/en/freelancer/menu-sidebar.json';
import freelancerProfileEn from '../public/locales/en/freelancer/profile.json';
import requiredDataEn from '../public/locales/en/required-data.json';
import validationEn from '../public/locales/en/validation.json';

export const I18N_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    shortName: 'EN',
    direction: 'ltr',
    flag: '/media/flags/united-states.svg',
  },
  {
    code: 'ar',
    name: 'Arabic',
    shortName: 'AR',
    direction: 'rtl',
    flag: '/media/flags/saudi-arabia.svg',
  },
];

export const I18N_RESOURCES = {
  en: {
    common: commonEn,
    auth: authEn,
    requiredData: requiredDataEn,
    freelancerProfile: freelancerProfileEn,
    menuSidebar: menuSidebarEn,
    validation: validationEn,
  },
  ar: {
    common: commonAr,
    auth: authAr,
    requiredData: requiredDataAr,
    freelancerProfile: freelancerProfileAr,
    menuSidebar: menuSidebarAr,
    validation: validationAr,
  },
};
