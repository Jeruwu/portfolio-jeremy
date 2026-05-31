import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ArrowRight, Globe, ExternalLink, Link2, Mail } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { type Lang, t, tx } from '../i18n';

type SubmitState = 'idle' | 'loading' | 'success';

interface ContactSectionProps {
  lang: Lang;
  highlight?: boolean;
}

function Spinner() {
  return (
    <svg
      className="w-3.5 h-3.5 animate-spin flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" className="opacity-20" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

// Variant keyframe arrays drive the full in→peak→out heartbeat
// within a single animate call — no mid-animation React state reset needed.
const formVariants: Variants = {
  idle: {
    borderColor: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 0px rgba(245, 158, 11, 0)',
    background: 'rgba(0, 0, 0, 0)',
  },
  active: {
    borderColor: [
      'rgba(255, 255, 255, 0.05)',
      'rgba(245, 158, 11, 0.40)',
      'rgba(255, 255, 255, 0.05)',
    ],
    boxShadow: [
      '0 0 0px rgba(245,158,11,0)',
      '0 0 70px rgba(245,158,11,0.18), 0 0 28px rgba(245,158,11,0.10), inset 0 0 50px rgba(245,158,11,0.06)',
      '0 0 0px rgba(245,158,11,0)',
    ],
    background: [
      'rgba(0,0,0,0)',
      'rgba(245,158,11,0.05)',
      'rgba(0,0,0,0)',
    ],
  },
};

export function ContactSection({ lang, highlight = false }: ContactSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitState !== 'idle') return;
    setSubmitState('loading');
    setTimeout(() => {
      setSubmitState('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitState('idle'), 4000);
    }, 1500);
  }

  const socials = [
    { icon: Globe,        label: 'GitHub',          href: '#' },
    { icon: Link2,        label: 'LinkedIn',         href: '#' },
    { icon: ExternalLink, label: 'Twitter / X',      href: '#' },
    { icon: Mail,         label: '[your@email.com]', href: '#' },
  ];

  const isIdle    = submitState === 'idle';
  const isLoading = submitState === 'loading';
  const isSuccess = submitState === 'success';

  return (
    <section id="contact" className="bg-black py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="bg-noise absolute inset-0 opacity-[0.1] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left — copy + socials ─────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-5">
                {lang === 'en' ? 'Get in touch' : 'Hablemos'}
              </p>
              <div className="text-3xl sm:text-4xl md:text-5xl font-normal max-w-lg leading-[0.95] mb-5">
                <WordsPullUpMultiStyle
                  key={`ct-title-${lang}`}
                  segments={[{ text: tx(t.contact.title, lang), className: 'text-primary' }]}
                />
              </div>
              <motion.p
                key={`ct-sub-${lang}`}
                className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {tx(t.contact.subtitle, lang)}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-gray-500 hover:text-primary transition-colors duration-300 group w-fit"
                >
                  <span className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs sm:text-sm">{label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right — entry fade wrapper (separate from pulse) ───── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Pulse wrapper — owns ONLY the border/glow/bg pulse ── */}
            <motion.div
              className="relative rounded-2xl p-6 md:p-8 border"
              variants={formVariants}
              animate={highlight ? 'active' : 'idle'}
              transition={
                highlight
                  ? { duration: 2.2, ease: 'easeInOut', times: [0, 0.45, 1] }
                  : { duration: 1.0, ease: 'easeInOut' }
              }
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-primary/50 text-[10px] tracking-widest uppercase">
                      {tx(t.contact.name, lang)}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="bg-[#101010] border border-white/[0.08] rounded-xl px-4 py-3 text-primary text-sm placeholder-gray-600 focus:outline-none focus:border-primary/30 transition-colors duration-200"
                      placeholder={tx(t.contact.name, lang)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-primary/50 text-[10px] tracking-widest uppercase">
                      {tx(t.contact.email, lang)}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="bg-[#101010] border border-white/[0.08] rounded-xl px-4 py-3 text-primary text-sm placeholder-gray-600 focus:outline-none focus:border-primary/30 transition-colors duration-200"
                      placeholder={tx(t.contact.email, lang)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-primary/50 text-[10px] tracking-widest uppercase">
                    {tx(t.contact.message, lang)}
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="bg-[#101010] border border-white/[0.08] rounded-xl px-4 py-3 text-primary text-sm placeholder-gray-600 focus:outline-none focus:border-primary/30 transition-colors duration-200 resize-none"
                    placeholder={tx(t.contact.message, lang)}
                  />
                </div>

                {/* ── Submit button ───────────────────────────────────── */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={submitState !== 'idle'}
                    className="relative h-12 w-56 rounded-full bg-[#DEDBC8] text-black font-medium text-sm transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {/* IDLE STATE */}
                    <div
                      className={`absolute inset-0 flex items-center justify-between pl-6 pr-1.5 transition-opacity duration-300 ${
                        isIdle ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <span className="flex-1 text-center font-semibold tracking-wide whitespace-nowrap">
                        {tx(t.contact.submit, lang)}
                      </span>
                      <span className="bg-black rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <ArrowRight className="w-4 h-4 text-[#DEDBC8]" />
                      </span>
                    </div>

                    {/* LOADING STATE */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center gap-2.5 transition-opacity duration-300 ${
                        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <Spinner />
                      <span className="font-semibold tracking-wide whitespace-nowrap">
                        {tx(t.contact.submitting, lang)}
                      </span>
                    </div>

                    {/* SUCCESS STATE */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        isSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <span className="font-semibold tracking-wide whitespace-nowrap">
                        {tx(t.contact.submitted, lang)}
                      </span>
                    </div>
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div className="mt-20 md:mt-28 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} Jeremy Canarte. All rights reserved.
          </span>
          <span className="text-gray-700 text-[10px] font-mono">
            {lang === 'en' ? 'Designed & built with precision.' : 'Diseñado y construido con precisión.'}
          </span>
        </div>
      </div>
    </section>
  );
}
