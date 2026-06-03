import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { t, tx } from '../i18n';

export function SEO() {
  const { lang } = useLanguage();

  const title = lang === 'en' 
    ? 'Jeremy Canarte | Premium Frontend Developer' 
    : 'Jeremy Canarte | Desarrollador Frontend Premium';
    
  const description = tx(t.hero.subtitle, lang);

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'es_ES'} />
      <meta property="og:url" content="https://jeremycanarte.com/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://jeremycanarte.com/images/hero-poster.webp" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://jeremycanarte.com/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://jeremycanarte.com/images/hero-poster.webp" />
    </Helmet>
  );
}
