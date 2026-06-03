import { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { t, tx } from '../i18n';
import { WordsPullUpMultiStyle } from './WordsPullUp';

export function ProcessSection() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="bg-light-bg dark:bg-black py-20 md:py-32 px-4 md:px-8 relative overflow-hidden transition-colors duration-500">
      <div className="bg-noise absolute inset-0 opacity-[0.1] pointer-events-none" aria-hidden />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="max-w-3xl flex flex-col items-center">
            <m.p
              className="text-black dark:text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {tx(t.process.sectionTitle, lang)}
            </m.p>

            <div className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.1] text-center">
              <WordsPullUpMultiStyle
                key={`process-title-${lang}`}
                segments={[{ text: tx(t.process.sectionSub, lang), className: 'text-black dark:text-primary' }]}
              />
            </div>
          </div>
        </div>

        {/* Process Steps Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
          {t.process.items.map((item, index) => (
            <m.div
              key={item.number}
              className="relative group bg-white/40 dark:bg-white/5 border border-black/[0.05] dark:border-white/5 rounded-3xl p-8 md:p-10 flex flex-col h-full overflow-hidden transition-colors duration-500 hover:bg-white/60 dark:hover:bg-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Background gradient on hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 dark:from-amber-500/0 dark:via-amber-500/0 dark:to-amber-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent dark:group-hover:from-amber-500/5 transition-all duration-700 pointer-events-none" 
              />
              
              <div className="flex-1 relative z-10 flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-4xl md:text-5xl font-mono font-light text-black/10 dark:text-primary/20 group-hover:text-cyan-600/30 dark:group-hover:text-amber-500/40 transition-colors duration-500">
                    {item.number}
                  </span>
                  
                  {/* Subtle decorative dot indicating status/flow */}
                  <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-primary/20 group-hover:bg-cyan-500 dark:group-hover:bg-amber-500 transition-colors duration-500 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.6)] dark:group-hover:shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
                </div>

                <h3 className="text-xl md:text-2xl font-medium text-black dark:text-primary mb-4 leading-snug">
                  {tx(item.title, lang)}
                </h3>
                
                <p className="text-black/60 dark:text-primary/60 text-sm md:text-base leading-relaxed mt-auto">
                  {tx(item.desc, lang)}
                </p>
              </div>

              {/* Hover outline effect */}
              {!shouldReduceMotion && (
                <div className="absolute inset-0 border border-cyan-500/0 dark:border-amber-500/0 group-hover:border-cyan-500/20 dark:group-hover:border-amber-500/20 rounded-3xl transition-colors duration-700 pointer-events-none" />
              )}
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
