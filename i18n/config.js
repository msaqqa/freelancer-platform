// src/config/languages.ts
import authAr from '../public/locales/ar/auth.json';
import commonAr from '../public/locales/ar/common.json';
import authEn from '../public/locales/en/auth.json';
import commonEn from '../public/locales/en/common.json';

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
  {
    code: 'es',
    name: 'Spanish',
    shortName: 'ES',
    direction: 'ltr',
    flag: '/media/flags/spain.svg',
  },
  {
    code: 'de',
    name: 'German',
    shortName: 'DE',
    direction: 'ltr',
    flag: '/media/flags/germany.svg',
  },
  {
    code: 'ch',
    name: 'Chinese',
    shortName: 'CH',
    direction: 'ltr',
    flag: '/media/flags/china.svg',
  },
];

export const I18N_RESOURCES = {
  en: {
    auth: authEn,
    common: commonEn,
  },
  ar: {
    auth: authAr,
    common: commonAr,
  },
};
