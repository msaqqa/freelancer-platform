// src/config/languages.ts
import authAr from '../public/locales/ar/auth.json';
import commonAr from '../public/locales/ar/common.json';
import requiredDataAr from '../public/locales/ar/required-data.json';
import authEn from '../public/locales/en/auth.json';
import commonEn from '../public/locales/en/common.json';
import freelancerProfileEn from '../public/locales/en/freelancer/profile.json';
import requiredDataEn from '../public/locales/en/required-data.json';

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
    auth: authEn,
    common: commonEn,
    requiredData: requiredDataEn,
    freelancerProfile: freelancerProfileEn,
  },
  ar: {
    auth: authAr,
    common: commonAr,
    requiredData: requiredDataAr,
  },
};
