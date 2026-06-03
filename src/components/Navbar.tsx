import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { t, tx } from '../i18n';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { MagneticWrapper } from './MagneticWrapper';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onContactHighlight: () => void;
}

export function Navbar({ onContactHighlight }: NavbarProps) {
  const { lang, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { key: 'services', id: 'services' },
    { key: 'process', id: 'process' },
    { key: 'portfolio', id: 'portfolio' },
    { key: 'contact', id: 'contact' },
  ] as const;

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95vw]">
      <div className="bg-white/90 dark:bg-[#111]/90 backdrop-blur-xl rounded-full px-5 py-3 md:px-8 md:py-4 transition-colors duration-500 shadow-lg border border-black/5 dark:border-white/10">
        {/*
          FIX: aria-label on <nav> identifies this landmark for screen readers.
          Using role="navigation" is implicit with <nav>, but the label
          disambiguates when multiple navs exist on the page.
        */}
        <nav
          aria-label="Site navigation"
          className="flex items-center"
        >
          {/* Logo / Name */}
          <MagneticWrapper>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Scroll to top"
              className={`inline-flex items-center font-semibold text-[10px] sm:text-xs md:text-sm tracking-tight whitespace-nowrap leading-none ${theme === 'light' ? 'text-black hover:text-black/70' : 'text-primary hover:text-primary/70'} transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 rounded-md px-1`}
            >
              Jeremy Cañarte
            </a>
          </MagneticWrapper>

          <div className="hidden sm:block w-px h-3 bg-black/10 dark:bg-white/20 mx-3 sm:mx-4 md:mx-5 lg:mx-6" aria-hidden />

          <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8">
            {navItems.map((item) => (
              <MagneticWrapper key={item.key}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.key === 'contact') {
                    onContactHighlight();
                  } else {
                    const el = document.getElementById(item.id);
                    if (el) {
                      const contentEl = el.querySelector('.max-w-7xl') || el;
                      const rect = contentEl.getBoundingClientRect();
                      const y = rect.top + window.scrollY;
                      
                      let offset = window.innerHeight / 2 - contentEl.clientHeight / 2;
                      
                      // Si el contenido es más alto que la pantalla, lo alineamos arriba
                      if (contentEl.clientHeight > window.innerHeight) {
                        offset = 80;
                      }
                      
                      window.scrollTo({ top: y - offset, behavior: 'smooth' });
                    }
                  }
                }}
                // FIX: descriptive aria-label so screen readers announce the action
                aria-label={`Scroll to ${item.id} section`}
                className={`relative inline-flex items-center justify-center text-[10px] sm:text-xs md:text-sm whitespace-nowrap nav-link bg-transparent border-none p-0 cursor-pointer overflow-hidden leading-none ${theme === 'light' ? 'text-black/70 hover:text-black' : 'text-primary/80 hover:text-primary'} transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 rounded-sm px-1`}
                style={{ textAlign: 'center' }}
              >
                <div className="grid place-items-center">
                  {/* Textos invisibles para forzar el ancho máximo */}
                  <span className="invisible col-start-1 row-start-1 whitespace-nowrap pointer-events-none" aria-hidden>
                    {tx(t.nav[item.key], 'en')}
                  </span>
                  <span className="invisible col-start-1 row-start-1 whitespace-nowrap pointer-events-none" aria-hidden>
                    {tx(t.nav[item.key], 'es')}
                  </span>

                  <AnimatePresence mode="wait" initial={false}>
                    <m.span
                      key={`${item.key}-${lang}`}
                      className="col-start-1 row-start-1 whitespace-nowrap"
                      initial={
                        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 3, filter: 'blur(4px)' }
                      }
                      animate={
                        shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }
                      }
                      exit={
                        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -3, filter: 'blur(4px)' }
                      }
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {tx(t.nav[item.key], lang)}
                    </m.span>
                  </AnimatePresence>
                </div>

                {/* Underline slide — CSS-driven via .nav-link:hover span rule in index.css */}
                <span
                  className="absolute -bottom-0.5 left-0 h-px bg-black/50 dark:bg-primary origin-left scale-x-0 transition-transform duration-200 ease-out w-full"
                  aria-hidden
                  style={{ transformOrigin: 'left' }}
                />
              </a>
            </MagneticWrapper>
          ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-4 sm:ml-5 md:ml-6 lg:ml-8">
            <MagneticWrapper>
              <m.button
              onClick={toggleLanguage}
              // FIX: descriptive aria-label for the language toggle
              aria-label={`Switch language to ${lang === 'en' ? 'Spanish' : 'English'}`}
              className={`relative flex items-center text-[10px] sm:text-xs md:text-sm rounded-full border overflow-hidden ${theme === 'light' ? 'border-black/20 text-black/80' : 'border-primary/30 text-primary/80'} transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20`}
              whileHover={
                shouldReduceMotion ? {} : { scale: 1.04, borderColor: theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(222,219,200,0.55)' }
              }
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            >
              {/* Sliding active pill */}
              <m.span
                aria-hidden
                className={`absolute left-0 top-[2px] bottom-[2px] w-1/2 rounded-full ${theme === 'light' ? 'bg-black/10' : 'bg-primary/20'}`}
                animate={
                  shouldReduceMotion
                    ? {}
                    : { x: lang === 'en' ? '2px' : 'calc(100% - 2px)' }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />

              <m.span
                className="relative z-10 px-2.5 py-1"
                aria-hidden={lang !== 'en'}
                animate={{ opacity: lang === 'en' ? 1 : 0.35 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                EN
              </m.span>

              <span className={`relative z-10 ${theme === 'light' ? 'text-black/30' : 'text-primary/30'}`} aria-hidden>
                /
              </span>

              <m.span
                className="relative z-10 px-2.5 py-1"
                aria-hidden={lang !== 'es'}
                animate={{ opacity: lang === 'es' ? 1 : 0.35 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              >
                ES
              </m.span>
            </m.button>
          </MagneticWrapper>

          <MagneticWrapper>
            <m.button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border overflow-hidden ${theme === 'light' ? 'border-black/20 text-black/80' : 'border-primary/30 text-primary'} transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20`}
              whileHover={
                shouldReduceMotion ? {} : { scale: 1.04, borderColor: theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(222,219,200,0.55)' }
              }
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  {theme === 'dark' ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black dark:text-primary" />}
                </m.div>
              </AnimatePresence>
            </m.button>
          </MagneticWrapper>
          </div>
        </nav>
      </div>
    </div>
  );
}
