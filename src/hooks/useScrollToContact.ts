import { useState, useCallback } from 'react';

interface UseScrollToContactReturn {
  pulseTrigger: number;
  scrollToContact: () => void;
}

/**
 * Scrolls to #contact with the same native smooth-scroll used in the Navbar,
 * then fires the pulse highlight once the section is within 100 px of the
 * viewport top.
 */
export function useScrollToContact(): UseScrollToContactReturn {
  const [pulseTrigger, setPulseTrigger] = useState(0);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact');
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Watch scroll progress and trigger the glow when we're close enough.
    let hasTriggeredPulse = false;

    function onScroll() {
      if (hasTriggeredPulse) return;

      const rect = el!.getBoundingClientRect();
      // Fire when the top of the section is within 100 px of the viewport top.
      if (rect.top <= 100) {
        hasTriggeredPulse = true;
        setPulseTrigger((prev) => prev + 1);
        window.removeEventListener('scroll', onScroll);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Safety cleanup: remove the listener after 5 s regardless.
    setTimeout(() => window.removeEventListener('scroll', onScroll), 5000);
  }, []);

  return { pulseTrigger, scrollToContact };
}