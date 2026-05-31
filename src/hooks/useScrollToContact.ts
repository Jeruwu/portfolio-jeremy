import { useState, useCallback } from 'react';

interface UseScrollToContactReturn {
  pulseTrigger: number;
  scrollToContact: () => void;
}

export function useScrollToContact(): UseScrollToContactReturn {
  const [pulseTrigger, setPulseTrigger] = useState(0);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact');
    if (!el) return;

    // Calculamos la posición Y exacta del elemento en el documento
    const y = el.getBoundingClientRect().top + window.scrollY;

    // Forzamos al navegador a ir a esa coordenada exacta
    window.scrollTo({ top: y, behavior: 'smooth' });

    setTimeout(() => {
      setPulseTrigger((prev) => prev + 1);
    }, 800);

  }, []);

  return { pulseTrigger, scrollToContact };
}