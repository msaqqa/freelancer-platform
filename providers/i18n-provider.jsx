'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { I18N_LANGUAGES } from '@/i18n/config';
import initI18 from '@/i18n/initI18';
import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import { useQueryClient } from '@tanstack/react-query';
import i18next from 'i18next';
import Cookies from 'js-cookie';
import { I18nextProvider } from 'react-i18next';

const LanguageContext = createContext(undefined);

function I18nProvider({ lang = 'ar', children }) {
  const [languageCode, setLanguageCode] = useState(lang);
  const queryClient = useQueryClient();

  // Find the current language configuration based on the language code
  const language =
    I18N_LANGUAGES.find((lang) => lang.code === languageCode) ||
    I18N_LANGUAGES[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only access cookies in the browser
      Cookies.set('language', languageCode);
    }
    if (language?.direction) {
      document.documentElement.setAttribute('dir', language.direction);
    }
  }, [languageCode, language]);

  const changeLanguage = (code) => {
    setLanguageCode(code);
    i18next.changeLanguage(code);
    queryClient.invalidateQueries();
    if (typeof window !== 'undefined') {
      Cookies.set('language', code);
    }
  };

  const i18n = initI18(languageCode);

  return (
    <LanguageContext.Provider
      value={{ languageCode, changeLanguage, language }}
    >
      <RadixDirectionProvider dir={language.direction}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </RadixDirectionProvider>
    </LanguageContext.Provider>
  );
}

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within an I18nProvider');
  }
  return context;
};

export { I18nProvider, useLanguage };
