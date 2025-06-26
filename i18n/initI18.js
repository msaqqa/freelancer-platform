'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18N_RESOURCES } from './config';

const initI18 = (lang) => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: I18N_RESOURCES,
      lng: lang,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
    return i18n;
  }
};

export default initI18;
