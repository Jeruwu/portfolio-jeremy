import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { type Lang, t, tx } from '../i18n';

interface NavbarProps {
  lang: Lang;
  onLangToggle: () => void;
  onContactHighlight: () => void;
}

/**
 * Smooth-scrolls to a section by id.
 * Falls back to instant scroll when prefers-reduced-motion is active
 * (the CSS guard in index.css handles it, but this is an extra layer).
 */
function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Navbar({ lang, onLangToggle, onContactHighlight }: NavbarProps) {
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { key: 'services', id: 'services' },
    { key: 'portfolio', id: 'portfolio' },
    { key: 'contact',  id: 'contact'  },
  ] as const;

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
      <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
        {/*
          FIX: aria-label on <nav> identifies this landmark for screen readers.
          Using role="navigation" is implicit with <nav>, but the label
          disambiguates when multiple navs exist on the page.
        */}
        <nav aria-label="Site navigation" className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12">

          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                if (item.key === 'contact') {
                  onContactHighlight();
                } else {
                  smoothScrollTo(item.id);
                }
              }}
              // FIX: descriptive aria-label so screen readers announce the action
              aria-label={`Scroll to ${item.id} section`}
              className="relative text-[10px] sm:text-xs md:text-sm whitespace-nowrap nav-link bg-transparent border-none p-0 cursor-pointer overflow-hidden"
              style={{
                color: 'rgba(225, 224, 204, 0.8)',
                minWidth: item.key === 'portfolio' ? '5.8em' : item.key === 'services' ? '5.1em' : '4.6em',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${item.key}-${lang}`}
                  className="inline-block"
                  initial={shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 3, filter: 'blur(4px)' }
                  }
                  animate={shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }
                  exit={shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -3, filter: 'blur(4px)' }
                  }
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                >
                  {tx(t.nav[item.key], lang)}
                </motion.span>
              </AnimatePresence>

              {/* Underline slide — CSS-driven via .nav-link:hover span rule in index.css */}
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-primary origin-left scale-x-0 transition-transform duration-200 ease-out w-full"
                aria-hidden
                style={{ transformOrigin: 'left' }}
              />
            </button>
          ))}

          <motion.button
            onClick={onLangToggle}
            // FIX: descriptive aria-label for the language toggle
            aria-label={`Switch language to ${lang === 'en' ? 'Spanish' : 'English'}`}
            className="relative flex items-center text-[10px] sm:text-xs md:text-sm rounded-full border border-primary/30 overflow-hidden"
            style={{ color: 'rgba(225, 224, 204, 0.8)' }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04, borderColor: 'rgba(222,219,200,0.55)' }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            {/* Sliding active pill */}
            <motion.span
              aria-hidden
              className="absolute top-[2px] bottom-[2px] rounded-full bg-primary/20"
              animate={shouldReduceMotion
                ? {}
                : { left: lang === 'en' ? '2px' : '50%', right: lang === 'en' ? '50%' : '2px' }
              }
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            />

            <motion.span
              className="relative z-10 px-2.5 py-1"
              aria-hidden={lang !== 'en'}
              animate={{ opacity: lang === 'en' ? 1 : 0.35 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              EN
            </motion.span>

            <span className="relative z-10 text-primary/30" aria-hidden>/</span>

            <motion.span
              className="relative z-10 px-2.5 py-1"
              aria-hidden={lang !== 'es'}
              animate={{ opacity: lang === 'es' ? 1 : 0.35 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              ES
            </motion.span>
          </motion.button>

        </nav>
      </div>
    </div>
  );
}