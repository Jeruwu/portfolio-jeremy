import { m, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from './WordsPullUp';
import { Navbar } from './Navbar';
import { t, tx } from '../i18n';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onContactHighlight: () => void;
}

export function HeroSection({ onContactHighlight }: HeroSectionProps) {
  const { lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // FIX: aria-hidden so screen readers don't announce a decorative video
          aria-hidden
          poster="/images/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/Hero.webm" type="video/webm" />
          <source src="/videos/Hero.mp4" type="video/mp4" />
        </video>

        {/* Noise overlay */}
        <div
          className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none z-10"
          aria-hidden
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/75 z-10"
          aria-hidden
        />

        {/* Navbar */}
        <Navbar 
          onContactHighlight={onContactHighlight} 
        />
        {/* Hero Content — bottom aligned */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-10 pb-8 md:pb-12 flex flex-col gap-5">
          {/* Title */}
          <h1
            className="font-bold leading-[1] tracking-[-0.03em] text-[7vw] sm:text-[5.5vw] md:text-[4.5vw] lg:text-[4vw] max-w-4xl"
            style={{ color: '#E1E0CC' }}
          >
            <WordsPullUp key={`hero-title-${lang}`} text={tx(t.hero.title, lang)} />
          </h1>

          {/* Subtitle + CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10">
            <m.p
              key={`hero-sub-${lang}`}
              className="text-primary/70 text-sm md:text-base max-w-sm leading-relaxed"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {tx(t.hero.subtitle, lang)}
            </m.p>

            <m.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <m.button
                onClick={onContactHighlight}
                aria-label={tx(t.hero.cta, lang)}
                className="group flex items-center gap-2 bg-primary rounded-full pl-5 pr-1 py-1 w-fit cursor-pointer border-none outline-none"
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span className="text-black font-medium text-sm sm:text-base whitespace-nowrap">
                  {tx(t.hero.cta, lang)}
                </span>
                <m.span
                  className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0"
                  whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <ArrowRight className="w-4 h-4 text-primary" aria-hidden />
                </m.span>
              </m.button>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
