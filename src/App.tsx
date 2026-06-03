import React, { Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { useScrollToContact } from './hooks/useScrollToContact';
import { SmoothScroll } from './components/SmoothScroll';
import { SEO } from './components/SEO';
import { Preloader } from './components/Preloader';
import { SkipToContent } from './components/SkipToContent';
import { CaseStudyModal } from './components/CaseStudyModal';

const ProcessSection = React.lazy(() => 
  import('./components/ProcessSection').then(module => ({ default: module.ProcessSection }))
);
const PortfolioSection = React.lazy(() => 
  import('./components/PortfolioSection').then(module => ({ default: module.PortfolioSection }))
);
const ContactSection = React.lazy(() => 
  import('./components/ContactSection').then(module => ({ default: module.ContactSection }))
);

export default function App() {
  const { pulseTrigger, scrollToContact } = useScrollToContact();
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(null);

  return (
    <>
      <Preloader />
      <SmoothScroll>
        <SkipToContent />
        <SEO />
        <main id="main-content" className="bg-light-bg dark:bg-black text-light-text dark:text-primary min-h-screen transition-colors duration-500">
          <HeroSection onContactHighlight={scrollToContact} />
          <ServicesSection onServiceSelect={scrollToContact} />
          <Suspense fallback={<div className="min-h-[50vh] bg-light-bg dark:bg-black flex items-center justify-center text-light-text dark:text-primary text-sm tracking-widest transition-colors duration-500">LOADING...</div>}>
            <ProcessSection />
            <PortfolioSection onOpenCaseStudy={setActiveCaseStudyId} />
            <ContactSection pulseTrigger={pulseTrigger} />
          </Suspense>
        </main>
      </SmoothScroll>

      <AnimatePresence>
        {activeCaseStudyId && (
          <CaseStudyModal
            caseStudyId={activeCaseStudyId}
            onClose={() => setActiveCaseStudyId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
