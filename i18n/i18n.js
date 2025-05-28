'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import authAr from '../public/locales/ar/auth.json';
import commonAr from '../public/locales/ar/common.json';
import authEn from '../public/locales/en/auth.json';
import commonEn from '../public/locales/en/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { auth: authEn, common: commonEn },
    ar: { auth: authAr, common: commonAr },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
