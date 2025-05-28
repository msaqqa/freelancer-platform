'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { I18N_LANGUAGES } from '@/i18n/config';
import i18n from '@/i18n/i18n';
import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

const LanguageContext = createContext(undefined);

function I18nProvider({ children }) {
  const [languageCode, setLanguageCode] = useState(() => {
    if (typeof window !== 'undefined') {
      // Only access localStorage in the browser
      return localStorage.getItem('language') || 'en';
    }
    return 'en'; // Default language if running on the server
  });

  // Find the current language configuration based on the language code
  const language =
    I18N_LANGUAGES.find((lang) => lang.code === languageCode) ||
    I18N_LANGUAGES[0];

  useEffect(() => {
    i18next.changeLanguage(localStorage.getItem('language'));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only access localStorage in the browser
      localStorage.setItem('language', languageCode);
    }
    if (language?.direction) {
      document.documentElement.setAttribute('dir', language.direction);
      document.cookie = `language=${languageCode}; path=/;`;
    }
  }, [languageCode, language]);

  const changeLanguage = (code) => {
    setLanguageCode(code);
    i18next.changeLanguage(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', code);
    }
  };

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
