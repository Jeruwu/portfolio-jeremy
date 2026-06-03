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

    // 1. Calculate the center position based on actual content (ignoring outer padding)
    const contentEl = el.querySelector('.max-w-7xl') || el;
    const rect = contentEl.getBoundingClientRect();
    const y = rect.top + window.scrollY;
    
    let offset = window.innerHeight / 2 - contentEl.clientHeight / 2;
    
    // Si el contenido es más alto que la pantalla, lo alineamos arriba
    if (contentEl.clientHeight > window.innerHeight) {
      offset = 80;
    }
    
    const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const targetScrollY = y - offset;
    const effectiveTargetY = Math.min(targetScrollY, maxScrollY);

    // Si ya estamos exactamente en el lugar (o al final de la página), el navegador no disparará evento.
    if (Math.abs(window.scrollY - effectiveTargetY) < 5) {
      setPulseTrigger((prev) => prev + 1);
      return;
    }

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });

    // 2. Vigilante inteligente para saber exactamente cuándo llegamos
    let hasTriggeredPulse = false;

    function onScroll() {
      if (hasTriggeredPulse) return;

      const rect = el!.getBoundingClientRect();

      // Condición A: El formulario ya entró bastante en la pantalla
      const isVisible = rect.top <= window.innerHeight * 0.7;

      // Condición B: Llegamos al límite absoluto de la página (para monitores grandes)
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

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
