import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from './WordsPullUp';
import { Navbar } from './Navbar';
import { type Lang, t, tx } from '../i18n';

interface HeroSectionProps {
  lang: Lang;
  onLangToggle: () => void;
  onContactHighlight: () => void;
}

export function HeroSection({ lang, onLangToggle, onContactHighlight }: HeroSectionProps) {
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
          // FIX: aria-hidden so screen readers don't announce a decorative video
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/Hero.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none z-10" aria-hidden />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/75 z-10" aria-hidden />

        {/* Navbar */}
        <Navbar lang={lang} onLangToggle={onLangToggle} />

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
            <motion.p
              key={`hero-sub-${lang}`}
              className="text-primary/70 text-sm md:text-base max-w-sm leading-relaxed"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {tx(t.hero.subtitle, lang)}
            </motion.p>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={onContactHighlight}
                aria-label={tx(t.hero.cta, lang)}
                className="group flex items-center gap-2 bg-primary rounded-full pl-5 pr-1 py-1 w-fit cursor-pointer border-none outline-none"
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span className="text-black font-medium text-sm sm:text-base whitespace-nowrap">
                  {tx(t.hero.cta, lang)}
                </span>
                <motion.span
                  className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0"
                  whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <ArrowRight className="w-4 h-4 text-primary" aria-hidden />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
