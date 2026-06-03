import { useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { type Lang, t, tx } from '../i18n';
import { portfolioItems } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

/* ── Brand Colors ─────────────────────────────────────────────────────── */
const BRAND_COLORS: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  'Node.js': '#5FA04E',
  'Next.js': '#A8A8A8',
  'Vue.js': '#4FC08D',
  Tailwind: '#38B2AC',
  Stripe: '#008CDD',
  Supabase: '#3ECF8E',
  GSAP: '#88CE02',
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  JavaScript: '#D4A500',
  Figma: '#F24E1E',
  i18n: '#7C5CBF',
  Lenis: '#5B8FA8',
  Framer: '#CC44FF',
  'Framer Motion': '#CC44FF',
  Firebase: '#FFA000',
  MongoDB: '#4DB33D',
  PostgreSQL: '#336791',
  Python: '#3776AB',
  Redux: '#764ABC',
  GraphQL: '#E10098',
  Docker: '#2496ED',
};

// Darker variants for colors that are too light on the sand/white light-mode background
const LIGHT_SAFE_COLORS: Record<string, string> = {
  React: '#086A80',
  'Next.js': '#444444',
  GSAP: '#4A7000',
  Supabase: '#167050',
  'Vue.js': '#1F6B45',
  Framer: '#6A0FAA',
  'Framer Motion': '#6A0FAA',
};

/* ── Tag Badge ────────────────────────────────────────────────────────── */
function TagBadge({ tag, color }: { tag: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-[10px] font-mono text-black/35 dark:text-primary/45 rounded-full px-2.5 py-[3px] tracking-wide select-none cursor-default"
      style={{
        transition: 'color 250ms ease, border-color 250ms ease, background-color 250ms ease, box-shadow 250ms ease',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: hovered ? `${color}BB` : 'currentColor',
        color: hovered ? color : undefined,
        boxShadow: hovered ? `0 0 12px ${color}40` : 'none',
        backgroundColor: hovered ? `${color}1A` : 'transparent',
      }}
    >
      {tag}
    </span>
  );
}

/* ── Browser Chrome ───────────────────────────────────────────────────── */
function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#1a1a1a] px-3 py-2.5 border-b border-black/[0.06] dark:border-white/[0.06] flex-shrink-0 group/chrome transition-colors duration-500">
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

      <div className="flex-1 mx-2 bg-black/5 dark:bg-black/40 rounded-md px-2.5 py-1 flex items-center gap-1.5 min-w-0 transition-colors duration-500">
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
        loading="lazy"
        decoding="async"
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
          background: `linear-gradient(160deg, #000000 0%, ${color} 100%)`,
          mixBlendMode: 'color',
        }}
      />
      {/* Subtle screen overlay */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
        style={{ background: 'rgba(222,219,200,0.06)', mixBlendMode: 'screen' }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-[#0e0e0e] to-transparent z-20 pointer-events-none transition-colors duration-500" />
      {/* Inset ring on hover */}
      <div className="absolute inset-0 z-30 ring-1 ring-inset ring-black/0 dark:ring-white/0 group-hover:ring-black/[0.07] dark:group-hover:ring-white/[0.07] transition-all duration-500 pointer-events-none" />
    </div>
  );
}

/* ── Project Card ─────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  lang,
  ctaText,
  onOpenCaseStudy,
}: {
  project: (typeof portfolioItems)[number] & { caseStudyId?: string };
  index: number;
  lang: Lang;
  ctaText: string;
  onOpenCaseStudy: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  /**
   * FIX: use a global regex to strip all hyphens and the mockup suffix.
   * e.g. '/images/ecoglow-mockup.webp' → 'ecoglow.com'
   */
  const slug = project.imageSrc
    .replace(/\/images\//g, '')
    .replace(/-mockup\.webp$/, '')
    .toLowerCase();
  const displayUrl = `${slug}.com`;

  const isCaseStudy = Boolean(project.caseStudyId);

  const cardClickProps = isCaseStudy
    ? {
        as: 'button' as const,
        onClick: () => project.caseStudyId && onOpenCaseStudy(project.caseStudyId),
        className: 'relative overflow-hidden block w-full text-left cursor-pointer',
      }
    : {
        as: 'a' as const,
        href: project.projectUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'relative overflow-hidden block cursor-pointer',
      };

  const Component = cardClickProps.as;

  return (
    <m.div
      ref={ref}
      className="bg-white dark:bg-[#0e0e0e] rounded-2xl overflow-hidden flex flex-col group border border-black/[0.04] dark:border-white/[0.04] hover:border-black/[0.09] dark:hover:border-white/[0.09] transition-colors duration-500"
      initial={{ scale: 0.95, opacity: 0, y: 24 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.05, 0.95, 0.1, 1] }}
    >
      <BrowserChrome url={displayUrl} />

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Component
        {...(cardClickProps as any)}
        style={{ aspectRatio: '16/10' }}
        aria-label={`Open ${tx(project.title, lang)}`}
      >
        <ProjectImagePreview
          imageSrc={project.imageSrc}
          title={tx(project.title, lang)}
          color={project.color}
        />
      </Component>

      <div className="flex flex-col flex-1 p-5 md:p-6 gap-3">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => {
            const darkColor = BRAND_COLORS[tag] ?? '#6B7280';
            const color = theme === 'light' ? (LIGHT_SAFE_COLORS[tag] ?? darkColor) : darkColor;
            return <TagBadge key={tag} tag={tag} color={color} />;
          })}
        </div>

        <h3 className="text-black dark:text-primary font-medium text-base md:text-[17px] leading-snug">
          {tx(project.title, lang)}
        </h3>

        <p className="text-gray-600 dark:text-gray-500 text-xs sm:text-sm leading-relaxed flex-1">
          {tx(project.desc, lang)}
        </p>

        {/* CTA */}
        <div className="pt-3 border-t border-black/[0.05] dark:border-white/[0.05] flex justify-between items-center">
          <Component
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(cardClickProps as any)}
            className="portfolio-cta inline-flex items-center gap-1.5 text-black/50 dark:text-primary/50 hover:text-black dark:hover:text-primary text-xs transition-colors duration-300 group/btn"
          >
            <span className="transition-transform duration-200 ease-out group-hover/btn:translate-x-1">
              {ctaText}
            </span>

            {!shouldReduceMotion && (
              <span
                className="arrow-reveal overflow-hidden inline-flex"
                style={{
                  clipPath: 'inset(0 100% 0 0)',
                  transition: 'clip-path 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                <ArrowRight className="w-3.5 h-3.5 -rotate-45" aria-hidden />
              </span>
            )}

            <ArrowRight
              className="w-3.5 h-3.5 -rotate-45 transition-transform duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]"
              aria-hidden
              style={{ opacity: shouldReduceMotion ? 1 : 0 }}
            />
          </Component>
          
          {project.projectUrl && isCaseStudy && (
            <m.a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-black hover:bg-primary/80 transition-colors text-xs sm:text-sm font-semibold shadow-sm"
              title={lang === 'en' ? 'Visit Live Site' : 'Ver Sitio en Vivo'}
              onClick={(e) => e.stopPropagation()}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <span>{lang === 'en' ? 'Live' : 'Web'}</span>
              <ExternalLink className="w-4 h-4" />
            </m.a>
          )}
        </div>
      </div>
    </m.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

interface PortfolioSectionProps {
  onOpenCaseStudy?: (id: string) => void;
}

export function PortfolioSection({ onOpenCaseStudy = () => {} }: PortfolioSectionProps) {
  const { lang } = useLanguage();
  const labelRef = useRef<HTMLParagraphElement>(null);
  const isLabelInView = useInView(labelRef, { once: true, margin: '-60px' });

  return (
    <section id="portfolio" className="bg-light-bg dark:bg-black py-20 md:py-32 px-4 md:px-8 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-20">
          <m.p
            ref={labelRef}
            className="text-black dark:text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 6 }}
            animate={isLabelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {tx(t.portfolio.sectionTitle, lang)}
          </m.p>

          <div className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[0.95]">
            <WordsPullUpMultiStyle
              key={`ptf-title-${lang}`}
              segments={[{ text: tx(t.portfolio.sectionSub, lang), className: 'text-black dark:text-primary' }]}
              className="w-full justify-start"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-5">
          {portfolioItems.map((project, i) => (
            <ProjectCard
              key={i}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              project={project as any}
              index={i}
              lang={lang}
              ctaText={tx(t.portfolio.cta, lang)}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
