import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { type Lang, t, tx } from '../i18n';

/* ── Brand Colors ─────────────────────────────────────────────────────── */
const BRAND_COLORS: Record<string, string> = {
  React:      '#61DAFB',
  TypeScript: '#3178C6',
  'Node.js':  '#5FA04E',
  'Next.js':  '#FFFFFF',
  'Vue.js':   '#4FC08D',
  Tailwind:   '#38B2AC',
  Stripe:     '#008CDD',
  Supabase:   '#3ECF8E',
  GSAP:       '#88CE02',
  HTML5:      '#E34F26',
  CSS3:       '#1572B6',
  JavaScript: '#F7DF1E',
  Figma:      '#F24E1E',
};

/* ── Browser Chrome ───────────────────────────────────────────────────── */
function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2.5 border-b border-white/[0.06] flex-shrink-0 group/chrome">
      <div className="flex items-center gap-1.5">
        {(
          [
            'bg-[#FF5F57]/70 group-hover/chrome:bg-[#FF5F57]',
            'bg-[#FFBD2E]/70 group-hover/chrome:bg-[#FFBD2E]',
            'bg-[#28CA42]/70 group-hover/chrome:bg-[#28CA42]',
          ] as const
        ).map((colorClass, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${colorClass}`}
            style={{ transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </div>

      <div className="flex-1 mx-2 bg-black/40 rounded-md px-2.5 py-1 flex items-center gap-1.5 min-w-0">
        <svg
          viewBox="0 0 12 12"
          className="w-2.5 h-2.5 text-gray-600 flex-shrink-0"
          fill="currentColor"
          aria-hidden
        >
          <path d="M6 1a4 4 0 100 8A4 4 0 006 1zM0 6a6 6 0 1112 0A6 6 0 010 6z" />
          <path
            d="M6 3.5c-.8 0-1.5.3-2 .8L5.3 5.6c.2-.2.4-.3.7-.3s.5.1.7.3l1.3-1.3C7.5 3.8 6.8 3.5 6 3.5z"
            fillOpacity="0.4"
          />
        </svg>
        <span className="text-[9px] text-gray-600 font-mono truncate">{url}</span>
      </div>
    </div>
  );
}

/* ── Image Preview ────────────────────────────────────────────────────── */
/*
 * FIX: Replaced inline onMouseEnter/Leave style mutations with CSS-driven
 * approach. The `group` class on the parent <a> drives filter transitions
 * via `group-hover:` utilities. This is:
 * 1. Cleaner — no imperative DOM mutations.
 * 2. More reliable — transitions compose correctly with each other.
 * 3. Consistent — no risk of stale style after rapid mouse in/out.
 *
 * Note: Tailwind does not ship `saturate-0`, `brightness-65`, `contrast-115`
 * as named utilities, so we keep the `filter` value as a CSS custom property
 * via arbitrary values. The transition is still CSS-native and GPU-accelerated.
 */
function ProjectImagePreview({
  imageSrc,
  title,
  color,
}: {
  imageSrc: string;
  title: string;
  color: string;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={imageSrc}
        alt={title}
        className={[
          'w-full h-full object-cover object-top',
          'transition-[filter,transform] duration-500 ease-out',
          // default: desaturated / dimmed
          '[filter:saturate(0)_brightness(0.65)_contrast(1.15)]',
          // on group hover: full colour
          'group-hover:[filter:saturate(1)_brightness(1)_contrast(1)]',
          'group-hover:scale-[1.04]',
        ].join(' ')}
      />
      {/* Duotone colour wash */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
        style={{
          background:   `linear-gradient(160deg, #000000 0%, ${color} 100%)`,
          mixBlendMode: 'color',
        }}
      />
      {/* Subtle screen overlay */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
        style={{ background: 'rgba(222,219,200,0.06)', mixBlendMode: 'screen' }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0e0e0e] to-transparent z-20 pointer-events-none" />
      {/* Inset ring on hover */}
      <div className="absolute inset-0 z-30 ring-1 ring-inset ring-white/0 group-hover:ring-white/[0.07] transition-all duration-500 pointer-events-none" />
    </div>
  );
}

/* ── Project Card ─────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  lang,
  ctaText,
}: {
  project: (typeof t.portfolio.items)[number];
  index: number;
  lang: Lang;
  ctaText: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  /**
   * FIX: use a global regex to strip all hyphens and the mockup suffix.
   * e.g. '/images/ecoglow-mockup.webp' → 'ecoglow.com'
   */
  const slug = project.imageSrc
    .replace(/\/images\//g, '')
    .replace(/-mockup\.webp$/, '')
    .toLowerCase();
  const displayUrl = `${slug}.com`;

  return (
    <motion.div
      ref={ref}
      className="bg-[#0e0e0e] rounded-2xl overflow-hidden flex flex-col group border border-white/[0.04] hover:border-white/[0.09] transition-colors duration-400"
      initial={{ scale: 0.95, opacity: 0, y: 24 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.05, 0.95, 0.1, 1] }}
    >
      <BrowserChrome url={displayUrl} />

      <a
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden block cursor-pointer"
        style={{ aspectRatio: '16/10' }}
        aria-label={`Open ${tx(project.title, lang)}`}
      >
        <ProjectImagePreview
          imageSrc={project.imageSrc}
          title={tx(project.title, lang)}
          color={project.color}
        />
      </a>

      <div className="flex flex-col flex-1 p-5 md:p-6 gap-3">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => {
            const color = BRAND_COLORS[tag] ?? '#E1E0CC';
            return (
              <motion.span
                key={tag}
                className="text-[10px] font-mono text-primary/45 border border-primary/[0.12] rounded-full px-2 py-[2px] tracking-wide transition-colors duration-200 select-none cursor-default"
                whileHover={{
                  color,
                  borderColor: color,
                  boxShadow: `0 0 12px ${color}30`,
                  backgroundColor: `${color}0A`,
                }}
              >
                {tag}
              </motion.span>
            );
          })}
        </div>

        <h3 className="text-primary font-medium text-base md:text-[17px] leading-snug">
          {tx(project.title, lang)}
        </h3>

        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed flex-1">
          {tx(project.desc, lang)}
        </p>

        {/* CTA */}
        <div className="pt-3 border-t border-white/[0.05]">
          {/*
            FIX: clip-path reveal is now driven by the CSS rule
            `.portfolio-cta:hover .arrow-reveal` in index.css.
            This works reliably across all browsers (incl. Safari) because
            the parent selector is CSS, not a Tailwind group variant driving
            an inline style — the previous approach never actually animated.
          */}
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-cta inline-flex items-center gap-1.5 text-primary/50 hover:text-primary text-xs transition-colors duration-300 group/btn"
          >
            <span className="transition-transform duration-200 ease-out group-hover/btn:translate-x-1">
              {ctaText}
            </span>

            {!shouldReduceMotion && (
              /*
               * FIX: className "arrow-reveal" is what the CSS rule targets.
               * Initial state: fully clipped (invisible). On .portfolio-cta:hover
               * the CSS rule sets clip-path to inset(0 0% 0 0) revealing it.
               */
              <span
                className="arrow-reveal overflow-hidden inline-flex"
                style={{
                  clipPath:   'inset(0 100% 0 0)',
                  transition: 'clip-path 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                <ArrowRight className="w-3.5 h-3.5 -rotate-45" aria-hidden />
              </span>
            )}

            {/* Accessible fallback arrow (visible for reduced-motion users) */}
            <ArrowRight
              className="w-3.5 h-3.5 -rotate-45 transition-transform duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]"
              aria-hidden
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */
interface PortfolioSectionProps {
  lang: Lang;
}

export function PortfolioSection({ lang }: PortfolioSectionProps) {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const isLabelInView = useInView(labelRef, { once: true, margin: '-60px' });

  return (
    <section id="portfolio" className="bg-black py-20 md:py-32 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-20">
          <motion.p
            ref={labelRef}
            className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 6 }}
            animate={isLabelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {tx(t.portfolio.sectionTitle, lang)}
          </motion.p>

          <div className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[0.95]">
            <WordsPullUpMultiStyle
              key={`ptf-title-${lang}`}
              segments={[{ text: tx(t.portfolio.sectionSub, lang), className: 'text-primary' }]}
              className="w-full justify-start"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {t.portfolio.items.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              lang={lang}
              ctaText={tx(t.portfolio.cta, lang)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
