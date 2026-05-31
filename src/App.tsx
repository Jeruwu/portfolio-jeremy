import { useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { type Lang } from './i18n';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';

const PULSE_DURATION = 2200; // ms — must exceed total transition duration

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [highlightContact, setHighlightContact] = useState(false);
  const isPulsingRef = useRef(false);

  const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'));

  function scrollToAndHighlightContact() {
    const el = document.getElementById('contact');
    if (!el) return;

    const targetY = window.scrollY + el.getBoundingClientRect().top;

    const controls = animate(window.scrollY, targetY, {
      duration: 1.8,
      ease: [0.08, 1, 0.15, 1],
      onUpdate: (v) => window.scrollTo(0, v),
      onComplete: () => {
        // Guard against spam — ignore if a pulse is already in flight
        if (isPulsingRef.current) return;
        isPulsingRef.current = true;
        setHighlightContact(true);

        setTimeout(() => {
          setHighlightContact(false);
          // Release the lock only after the exit transition fully settles
          setTimeout(() => {
            isPulsingRef.current = false;
          }, 1100);
        }, PULSE_DURATION);
      },
    });

    function interrupt() {
      controls.stop();
      window.removeEventListener('wheel', interrupt);
      window.removeEventListener('touchmove', interrupt);
    }

    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchmove', interrupt, { passive: true });
  }

  return (
    <main className="bg-black">
      <HeroSection lang={lang} onLangToggle={toggle} onContactHighlight={scrollToAndHighlightContact} />
      <ServicesSection lang={lang} onServiceSelect={scrollToAndHighlightContact} />
      <PortfolioSection lang={lang} />
      <ContactSection lang={lang} highlight={highlightContact} />
    </main>
  );
}
