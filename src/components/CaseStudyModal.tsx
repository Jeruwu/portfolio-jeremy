import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { tx } from '../i18n';
import { portfolioItems, caseStudies } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

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

// Colors that are too light on the sand light-mode background (Used in PortfolioSection, not needed here)

/* ── Tag Badge (modal version – always on dark image bg) ─────────────── */
function TagBadge({ tag, color }: { tag: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-3.5 py-1.5 rounded-full text-xs font-mono text-white/75 select-none cursor-default"
      style={{
        transition: 'color 250ms ease, border-color 250ms ease, background-color 250ms ease, box-shadow 250ms ease',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: hovered ? `${color}BB` : 'rgba(255,255,255,0.2)',
        backgroundColor: hovered ? `${color}25` : 'rgba(0,0,0,0.2)',
        color: hovered ? color : undefined,
        boxShadow: hovered ? `0 0 14px ${color}50` : 'none',
        backdropFilter: 'blur(8px)',
      }}
    >
      {tag}
    </span>
  );
}

interface CaseStudyModalProps {
  caseStudyId: string;
  onClose: () => void;
}

export function CaseStudyModal({ caseStudyId, onClose }: CaseStudyModalProps) {
  const { lang } = useLanguage();
  const data = caseStudies[caseStudyId];
  
  // Find project data for tags, image, etc.
  const projectItem = portfolioItems.find(i => i.caseStudyId === caseStudyId);

  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!data || !projectItem) return null;

  return (
    <m.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-3 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <m.div
        className="relative w-full h-full max-w-[90rem] bg-light-bg dark:bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-black/10 dark:border-white/10 flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-white/50 hover:bg-white/80 dark:bg-black/40 dark:hover:bg-black/60 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center transition-colors z-[110] backdrop-blur-md"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5 text-black dark:text-primary" />
        </button>

        <div 
          className="w-full h-full overflow-y-auto scroll-smooth"
          data-lenis-prevent
        >
          <article className="w-full text-black dark:text-primary pb-32">
          
          {/* Hero Section */}
          <div className="relative w-full h-[50vh] min-h-[400px] md:h-[65vh] md:min-h-[500px] mb-12 md:mb-24 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]">
            <m.img 
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              src={(projectItem as any).modalImageSrc || projectItem.imageSrc} 
              alt={tx(projectItem.title, lang)}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-light-bg from-0% via-light-bg/60 via-[25%] to-transparent to-[50%] dark:from-black dark:from-0% dark:via-black/60 dark:via-[25%] dark:to-transparent dark:to-[50%] flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-20">
              <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                {projectItem.tags.map(tag => {
                  const color = BRAND_COLORS[tag] ?? '#6B7280';
                  return <TagBadge key={tag} tag={tag} color={color} />;
                })}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-8 max-w-4xl">
                {tx(projectItem.title, lang)}
              </h1>
              {projectItem.projectUrl && (
                <a 
                  href={projectItem.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white dark:bg-primary dark:text-black rounded-full font-medium hover:scale-105 transition-transform w-fit"
                >
                  {lang === 'en' ? 'Visit Live Site' : 'Ver Sitio en Vivo'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="px-6 md:px-16">
            <div className="flex flex-col gap-16 md:gap-24">
              
              {/* Brief */}
              <section className="max-w-6xl">
                <h2 className="text-xs uppercase tracking-widest text-black/40 dark:text-primary/40 mb-6 font-mono">
                  {lang === 'en' ? 'The Brief' : 'El Resumen'}
                </h2>
                <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-light text-black dark:text-primary">
                  {tx(data.brief, lang)}
                </p>
              </section>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <section>
                  <h2 className="text-xs uppercase tracking-widest text-black/40 dark:text-primary/40 mb-6 font-mono">
                    {lang === 'en' ? 'The Challenge' : 'El Reto'}
                  </h2>
                  <p className="text-lg md:text-xl leading-relaxed text-black/70 dark:text-primary/70">
                    {tx(data.challenge, lang)}
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xs uppercase tracking-widest text-black/40 dark:text-primary/40 mb-6 font-mono">
                    {lang === 'en' ? 'The Solution' : 'La Solución'}
                  </h2>
                  <div className="text-lg md:text-xl leading-relaxed text-black/70 dark:text-primary/70 whitespace-pre-wrap">
                    {tx(data.solution, lang)}
                  </div>
                </section>
              </div>

              {/* Impact Bento Grid */}
              <section>
                <h2 className="text-xs uppercase tracking-widest text-black/40 dark:text-primary/40 mb-6 font-mono">
                  {lang === 'en' ? 'The Impact' : 'El Impacto'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.impact.map((point, i) => {
                    const content = tx(point, lang);
                    const [boldPart, rest] = content.includes(':') ? content.split(/:(.*)/) : [content, ''];
                    
                    return (
                      <div key={i} className="bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 hover:bg-cyan-500/[0.02] hover:border-cyan-400/30 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)] transition-all duration-300 group flex flex-col h-full">
                        {rest ? (
                          <>
                            <div className="text-4xl mb-4 text-black dark:text-primary opacity-20 group-hover:opacity-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-all duration-300 font-light font-mono group-hover:-translate-y-1">
                              0{i + 1}
                            </div>
                            <span className="block text-black dark:text-primary font-medium mb-3 text-xl group-hover:text-cyan-700 dark:group-hover:text-cyan-100 transition-colors duration-300">{boldPart}</span>
                            <span className="text-black/60 dark:text-primary/60 leading-relaxed text-base block">{rest}</span>
                          </>
                        ) : (
                          <span className="text-black/60 dark:text-primary/60 leading-relaxed text-base block mt-auto">{content}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>
          </div>
          </article>
        </div>
      </m.div>
    </m.div>
  );
}
