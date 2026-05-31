import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarDays, MousePointerClick } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { type Lang, t, tx } from '../i18n';

function CodeBracketsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

type IconType = 'code' | 'cursor' | 'calendar';

function ServiceIcon({ type, className }: { type: IconType; className?: string }) {
  if (type === 'code') return <CodeBracketsIcon className={className} />;
  if (type === 'cursor') return <MousePointerClick className={className} />;
  return <CalendarDays className={className} />;
}

interface ServicesSectionProps {
  lang: Lang;
  onServiceSelect: () => void;
}

export function ServicesSection({ lang, onServiceSelect }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-black py-20 md:py-32 px-4 md:px-8 relative">
      <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14 md:mb-20">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4">
            {tx(t.services.sectionTitle, lang)}
          </p>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal max-w-2xl leading-[0.95]">
            <WordsPullUpMultiStyle
              key={`svc-title-${lang}`}
              segments={[{ text: tx(t.services.sectionSub, lang), className: 'text-primary' }]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2">
          {t.services.items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} lang={lang} onServiceSelect={onServiceSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  item,
  index,
  lang,
  onServiceSelect,
}: {
  item: (typeof t.services.items)[number];
  index: number;
  lang: Lang;
  onServiceSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      onClick={onServiceSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onServiceSelect()}
      className="relative bg-[#101010] rounded-2xl p-6 md:p-8 flex flex-col gap-5 group cursor-pointer overflow-hidden border border-white/[0.04] hover:-translate-y-1 hover:bg-[#141414] hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.07),0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out"
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Warm ambient bloom */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-amber-500/[0.05] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Icon + number row */}
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-primary/[0.08] border border-primary/[0.08] flex items-center justify-center group-hover:bg-amber-500/[0.10] group-hover:border-amber-500/20 transition-all duration-300">
          <ServiceIcon type={item.iconType} className="w-[18px] h-[18px] text-primary" />
        </div>
        <span className="text-gray-700 text-[10px] font-mono tracking-wider pt-1">{item.number}</span>
      </div>

      {/* Title */}
      <h3 className="text-primary font-medium text-lg md:text-xl leading-snug">
        {tx(item.title, lang)}
      </h3>

      {/* Divider */}
      <div className="h-px bg-white/[0.05] group-hover:bg-amber-500/[0.08] transition-colors duration-300" />

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed flex-1">{tx(item.desc, lang)}</p>
    </motion.div>
  );
}