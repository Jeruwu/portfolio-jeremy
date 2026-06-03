import { useState, useEffect } from 'react';
import { type Lang } from '../i18n';

export function useLanguage(initialLang: Lang = 'en') {
  const [lang, setLang] = useState<Lang>(initialLang);

  const toggleLang = () => setLang((l) => (l === 'en' ? 'es' : 'en'));

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, toggleLang };
}
