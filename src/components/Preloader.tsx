import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence (fonts, assets)
    // and give the user a minimum display time for the premium feel.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <m.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100vh', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
        >
          {/* Subtle noise overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.03]" />
          
          <div className="relative flex flex-col items-center">
            {/* Progress Bar Container */}
            <div className="w-[200px] h-px bg-white/10 relative overflow-hidden mt-8">
              <m.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>

            {/* Title */}
            <div className="overflow-hidden mt-4">
              <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                className="text-primary tracking-[0.2em] text-xs sm:text-sm font-medium"
              >
                JEREMY CANARTE
              </m.div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
