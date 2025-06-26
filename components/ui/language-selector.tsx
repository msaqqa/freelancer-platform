'use client';

import { I18N_LANGUAGES } from '@/i18n/config';
import { useLanguage } from '@/providers/i18n-provider';

function LanguageSelector() {
  const { languageCode, changeLanguage } = useLanguage();

  return (
    <select
      value={languageCode}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {I18N_LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
