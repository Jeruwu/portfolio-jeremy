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

    // 1. Iniciamos el scroll a prueba de móviles
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'smooth' });

    // 2. Vigilante inteligente para saber exactamente cuándo llegamos
    let hasTriggeredPulse = false;

    function onScroll() {
      if (hasTriggeredPulse) return;

      const rect = el!.getBoundingClientRect();
      
      // Condición A: El formulario ya entró bastante en la pantalla
      const isVisible = rect.top <= window.innerHeight * 0.7;
      
      // Condición B: Llegamos al límite absoluto de la página (para monitores grandes)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isVisible || isAtBottom) {
        hasTriggeredPulse = true;
        
        // Esperamos una fracción de segundo para que el scroll termine de frenar suavemente
        setTimeout(() => {
          setPulseTrigger((prev) => prev + 1);
        }, 200);
        
        window.removeEventListener('scroll', onScroll);
      }
    }

    // Activamos el vigilante
    window.addEventListener('scroll', onScroll, { passive: true });

    // Limpieza de seguridad por si el usuario cancela el scroll
    setTimeout(() => window.removeEventListener('scroll', onScroll), 5000);
  }, []);

  return { pulseTrigger, scrollToContact };
}