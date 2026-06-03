import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function SkipToContent() {
  const [isFocused, setIsFocused] = useState(false);
  const { lang } = useLanguage();

  return (
    <a
      href="#main-content"
      className={`fixed top-4 left-4 z-[9999] bg-[#E1E0CC] text-black px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
        isFocused ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {lang === 'en' ? 'Skip to content' : 'Saltar al contenido'}
    </a>
  );
}
