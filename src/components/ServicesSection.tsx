import { useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { CalendarDays, MousePointerClick } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { type Lang, t, tx } from '../i18n';
import { useMouse3D } from '../hooks/useMouse3D';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

/* ── Types ────────────────────────────────────────────────────────────── */
type IconType = 'code' | 'cursor' | 'calendar';

/* ── Floating Particles ───────────────────────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  alpha: number;
}

function FloatingParticles({ isVisible }: { isVisible: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  /*
   * FIX: moved particle generation into useState lazy initializer so it is:
   * 1. Stable across re-renders (same particle set per card mount).
   * 2. SSR/hydration safe — no module-level Math.random() that diverges
   *    between server and client when/if this is ever run in Next.js.
   * 3. Not re-created on every render cycle.
   */
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 12 + 8,
      // Positive delays only — negative delays break Framer Motion's
      // `animate` prop on Safari/iOS (causes glitched first frame).
      delay: Math.random() * 20,
      alpha: Math.random() * 0.3 + 0.15,
    })),
  );

  if (shouldReduceMotion) return null;

  return (
    <m.div
      className="absolute inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {particles.map((p, i) => {
        const color = theme === 'light' 
          ? `rgba(34, 211, 238, ${Math.min(1, p.alpha * 1.6)})` // Cyan for light mode
          : `rgba(245, 158, 11, ${p.alpha})`; // Glowing amber for dark mode
          
        return (
          <m.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
            animate={{ y: [0, -60, 0], x: [0, 30, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            }}
          />
        );
      })}
    </m.div>
  );
}

/* ── Icons ────────────────────────────────────────────────────────────── */
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

function ServiceIcon({ type, className }: { type: IconType; className?: string }) {
  if (type === 'code') return <CodeBracketsIcon className={className} />;
  if (type === 'cursor') return <MousePointerClick className={className} />;
  return <CalendarDays className={className} />;
}

/* ── Service Card ─────────────────────────────────────────────────────── */
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
  const shouldReduceMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);

  const {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave: resetMouse3D,
  } = useMouse3D(ref, !!shouldReduceMotion);

  function handleMouseLeave() {
    setIsHovered(false);
    resetMouse3D();
  }

  return (
    <m.div
      ref={ref}
      onClick={onServiceSelect}
      role="button"
      tabIndex={0}
      aria-label={tx(item.title, lang)}
      onKeyDown={(e) => e.key === 'Enter' && onServiceSelect()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white dark:bg-[#101010] rounded-2xl p-6 md:p-8 flex flex-col gap-5 group cursor-pointer overflow-hidden border border-black/[0.04] dark:border-white/[0.04] hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-[#141414] hover:border-cyan-400/30 dark:hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15),0_8px_24px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.07),0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300"
      style={shouldReduceMotion ? {} : { rotateX, rotateY, transformPerspective: 800 }}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingParticles isVisible={isHovered} />

      {/* Ambient bloom */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-cyan-400/[0.05] dark:bg-amber-500/[0.05] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between">
        <m.div
          className="w-11 h-11 rounded-xl bg-cyan-400/[0.08] dark:bg-primary/[0.08] border border-cyan-400/[0.12] dark:border-primary/[0.08] flex items-center justify-center group-hover:bg-cyan-400/[0.15] dark:group-hover:bg-amber-500/[0.10] group-hover:border-cyan-400/30 dark:group-hover:border-amber-500/20 transition-colors duration-300"
          whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        >
          <ServiceIcon type={item.iconType} className="w-[18px] h-[18px] text-blue-900 dark:text-primary" />
        </m.div>
        <span className="text-gray-400 dark:text-gray-700 text-[10px] font-mono tracking-wider pt-1">
          {item.number}
        </span>
      </div>

      <h3 className="relative z-10 text-black dark:text-primary font-medium text-lg md:text-xl leading-snug">
        {tx(item.title, lang)}
      </h3>

      <div className="relative z-10 h-px bg-black/[0.05] dark:bg-white/[0.05] group-hover:bg-cyan-400/[0.15] dark:group-hover:bg-amber-500/[0.08] transition-colors duration-300" />

      <p className="relative z-10 text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">
        {tx(item.desc, lang)}
      </p>
    </m.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
interface ServicesSectionProps {
  onServiceSelect: () => void;
}

export function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const { lang } = useLanguage();
  const labelRef = useRef<HTMLParagraphElement>(null);
  const isLabelInView = useInView(labelRef, { once: true, margin: '-60px' });

  return (
    <section id="services" className="bg-light-bg dark:bg-black min-h-[100svh] flex flex-col justify-center py-20 md:py-32 px-4 md:px-8 relative transition-colors duration-500">
      <div className="bg-noise absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="mb-14 md:mb-20">
          <m.p
            ref={labelRef}
            className="text-black dark:text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 6 }}
            animate={isLabelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {tx(t.services.sectionTitle, lang)}
          </m.p>

          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[0.95] text-center">
            <WordsPullUpMultiStyle
              key={`svc-title-${lang}`}
              segments={[{ text: tx(t.services.sectionSub, lang), className: 'text-black dark:text-primary' }]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-2">
          {t.services.items.map((item, i) => (
            <ServiceCard
              key={i}
              item={item}
              index={i}
              lang={lang}
              onServiceSelect={onServiceSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
