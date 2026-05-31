import { useState } from 'react';
import { type Lang } from './i18n';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';
import { useScrollToContact } from './hooks/useScrollToContact';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'));

  const { pulseTrigger, scrollToContact } = useScrollToContact();

  return (
    <main className="bg-black">
      <HeroSection lang={lang} onLangToggle={toggle} onContactHighlight={scrollToContact} />
      <ServicesSection lang={lang} onServiceSelect={scrollToContact} />
      <PortfolioSection lang={lang} />
      <ContactSection lang={lang} pulseTrigger={pulseTrigger} />
    </main>
  );
}