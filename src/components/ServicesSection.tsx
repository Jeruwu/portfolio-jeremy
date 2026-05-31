import { useRef, useState, useMemo } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { CalendarDays, MousePointerClick } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { type Lang, t, tx } from '../i18n';

/* ── Types ────────────────────────────────────────────────────────────── */
type IconType = 'code' | 'cursor' | 'calendar';

/* ── Floating Particles ───────────────────────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function FloatingParticles({ isVisible }: { isVisible: boolean }) {
  // FIX: useReducedMotion must be called unconditionally (Rules of Hooks).
  const shouldReduceMotion = useReducedMotion();

  /*
   * FIX: moved particle generation into useMemo so it is:
   * 1. Stable across re-renders (same particle set per card mount).
   * 2. SSR/hydration safe — no module-level Math.random() that diverges
   *    between server and client when/if this is ever run in Next.js.
   * 3. Not re-created on every render cycle.
   */
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 20 }, () => ({
        x:        Math.random() * 100,
        y:        Math.random() * 100,
        size:     Math.random() * 8 + 4,
        duration: Math.random() * 12 + 8,
        // Positive delays only — negative delays break Framer Motion's
        // `animate` prop on Safari/iOS (causes glitched first frame).
        delay:    Math.random() * 20,
        color:    `rgba(245, 158, 11, ${(Math.random() * 0.3 + 0.15).toFixed(2)})`,
      })),
    [],
  );

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left:            `${p.x}%`,
            top:             `${p.y}%`,
            width:           p.size,
            height:          p.size,
            backgroundColor: p.color,
            boxShadow:       `0 0 ${p.size * 2}px ${p.color}`,
          }}
          animate={{ y: [0, -60, 0], x: [0, 30, 0] }}
          transition={{
            duration: p.duration,
            repeat:   Infinity,
            ease:     'linear',
            delay:    p.delay,
          }}
        />
      ))}
    </motion.div>
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
  if (type === 'code')   return <CodeBracketsIcon className={className} />;
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping:   25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping:   25,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onClick={onServiceSelect}
      role="button"
      tabIndex={0}
      aria-label={tx(item.title, lang)}
      onKeyDown={(e) => e.key === 'Enter' && onServiceSelect()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#101010] rounded-2xl p-6 md:p-8 flex flex-col gap-5 group cursor-pointer overflow-hidden border border-white/[0.04] hover:-translate-y-1 hover:bg-[#141414] hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.07),0_8px_24px_rgba(0,0,0,0.35)] transition-colors duration-300"
      style={shouldReduceMotion ? {} : { rotateX, rotateY, transformPerspective: 800 }}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <FloatingParticles isVisible={isHovered} />

      {/* Ambient bloom */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-amber-500/[0.05] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between">
        <motion.div
          className="w-11 h-11 rounded-xl bg-primary/[0.08] border border-primary/[0.08] flex items-center justify-center group-hover:bg-amber-500/[0.10] group-hover:border-amber-500/20 transition-colors duration-300"
          whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        >
          <ServiceIcon type={item.iconType} className="w-[18px] h-[18px] text-primary" />
        </motion.div>
        <span className="text-gray-700 text-[10px] font-mono tracking-wider pt-1">
          {item.number}
        </span>
      </div>

      <h3 className="relative z-10 text-primary font-medium text-lg md:text-xl leading-snug">
        {tx(item.title, lang)}
      </h3>

      <div className="relative z-10 h-px bg-white/[0.05] group-hover:bg-amber-500/[0.08] transition-colors duration-300" />

      <p className="relative z-10 text-gray-400 text-sm leading-relaxed flex-1">
        {tx(item.desc, lang)}
      </p>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
interface ServicesSectionProps {
  lang: Lang;
  onServiceSelect: () => void;
}

export function ServicesSection({ lang, onServiceSelect }: ServicesSectionProps) {
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const isLabelInView = useInView(labelRef, { once: true, margin: '-60px' });

  return (
    <section id="services" className="bg-black py-20 md:py-32 px-4 md:px-8 relative">
      <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14 md:mb-20">
          <motion.p
            ref={labelRef}
            className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 6 }}
            animate={isLabelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {tx(t.services.sectionTitle, lang)}
          </motion.p>

          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[0.95] text-center">
            <WordsPullUpMultiStyle
              key={`svc-title-${lang}`}
              segments={[{ text: tx(t.services.sectionSub, lang), className: 'text-primary' }]}
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
