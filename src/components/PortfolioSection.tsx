import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { type Lang, t, tx } from '../i18n';

/* ── Browser Chrome Header ────────────────────────────────────────────── */
function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-2.5 border-b border-white/[0.06] flex-shrink-0">
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]/70" />
      </div>
      {/* Address bar */}
      <div className="flex-1 mx-2 bg-black/40 rounded-md px-2.5 py-1 flex items-center gap-1.5 min-w-0">
        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-gray-600 flex-shrink-0" fill="currentColor">
          <path d="M6 1a4 4 0 100 8A4 4 0 006 1zM0 6a6 6 0 1112 0A6 6 0 010 6z" />
          <path d="M6 3.5c-.8 0-1.5.3-2 .8L5.3 5.6c.2-.2.4-.3.7-.3s.5.1.7.3l1.3-1.3C7.5 3.8 6.8 3.5 6 3.5z" fillOpacity="0.4" />
        </svg>
        <span className="text-[9px] text-gray-600 font-mono truncate">{url}</span>
      </div>
    </div>
  );
}

/* ── Image Preview with Duotone Effect ────────────────────────────────── */
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
    /* Outer wrapper — drives the group hover for duotone removal */
    <div className="relative w-full h-full overflow-hidden">
      {/* 1. The actual project screenshot — swap src when you have the real image */}
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        style={{
          /* Desaturated at rest, animated by JS inline style below */
          filter: 'saturate(0) brightness(0.65) contrast(1.15)',
          transition: 'filter 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLImageElement).style.filter =
            'saturate(1) brightness(1) contrast(1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLImageElement).style.filter =
            'saturate(0) brightness(0.65) contrast(1.15)';
        }}
      />

      {/* 2. Colour duotone overlay — shadows (dark tinted layer) — fades on hover */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
        style={{
          background: `linear-gradient(160deg, #000000 0%, ${color} 100%)`,
          mixBlendMode: 'color',
        }}
      />

      {/* 3. Highlight tint — cream screen overlay — fades on hover */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"
        style={{
          background: 'rgba(222,219,200,0.06)',
          mixBlendMode: 'screen',
        }}
      />

      {/* 4. Bottom fade to card bg — always present, softens the cut */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0e0e0e] to-transparent z-20 pointer-events-none" />

      {/* 5. Ring shimmer on hover */}
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

  // Derive a short display URL from the image filename
  const displayUrl = project.imageSrc.replace('-mockup.webp', '').replace('-', '') + '.com';

  return (
    <motion.div
      ref={ref}
      className="bg-[#0e0e0e] rounded-2xl overflow-hidden flex flex-col group border border-white/[0.04] hover:border-white/[0.09] transition-colors duration-400"
      initial={{ scale: 0.95, opacity: 0, y: 24 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Browser frame */}
      <BrowserChrome url={displayUrl} />

      {/* Project screenshot area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <ProjectImagePreview
          imageSrc={project.imageSrc}
          title={tx(project.title, lang)}
          color={project.color}
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 md:p-6 gap-3">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-primary/45 border border-primary/[0.12] rounded-full px-2 py-[2px] tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-primary font-medium text-base md:text-[17px] leading-snug">
          {tx(project.title, lang)}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed flex-1">
          {tx(project.desc, lang)}
        </p>

        {/* CTA */}
        <div className="pt-3 border-t border-white/[0.05]">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-primary/50 hover:text-primary text-xs transition-colors duration-300 group/btn"
          >
            {ctaText}
            <ArrowRight
              className="w-3.5 h-3.5 -rotate-45 transition-transform duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]"
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
  return (
    <section id="portfolio" className="bg-black py-20 md:py-32 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4">
            {tx(t.portfolio.sectionTitle, lang)}
          </p>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal max-w-2xl leading-[0.95]">
            <WordsPullUpMultiStyle
              key={`ptf-title-${lang}`}
              segments={[{ text: tx(t.portfolio.sectionSub, lang), className: 'text-primary' }]}
            />
          </div>
        </div>

        {/* Cards */}
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
