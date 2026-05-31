import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useAnimation, useReducedMotion } from 'framer-motion';
import { Globe, Link2, Mail, CalendarDays, ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { type Lang, t, tx } from '../i18n';

type SubmitState = 'idle' | 'loading' | 'success';

interface ContactSectionProps {
  lang:          Lang;
  pulseTrigger?: number;
}

/* ── Spinner ──────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="w-3.5 h-3.5 animate-spin flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" className="opacity-20" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

/* ── FormField ────────────────────────────────────────────────────────── */
/**
 * FIX: children typed as React.ReactElement to avoid the impossible
 * intersection `HTMLInputElement & HTMLTextAreaElement` which caused
 * silent TypeScript narrowing failures.
 */
interface FormFieldProps {
  label: string;
  children: React.ReactElement;
}

const FOCUS_ON:  Partial<CSSStyleDeclaration> = {
  borderColor: 'rgba(222,219,200,0.3)',
  boxShadow:   '0 0 0 3px rgba(245,158,11,0.12)',
};
const FOCUS_OFF: Partial<CSSStyleDeclaration> = {
  borderColor: 'rgba(255,255,255,0.08)',
  boxShadow:   'none',
};

function applyStyles(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  Object.assign(el.style, styles);
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-primary/50 text-[10px] tracking-widest uppercase">{label}</label>
      {children}
    </div>
  );
}

/** Shared props injected into every <input> / <textarea> */
function inputProps(extraClass = ''): React.HTMLAttributes<HTMLElement> {
  return {
    className: `bg-[#101010] border border-white/[0.08] rounded-xl px-4 py-3 text-primary text-sm placeholder-gray-600 focus:outline-none transition-[border-color,box-shadow] ${extraClass}`,
    onFocus:  (e) => applyStyles(e.currentTarget as HTMLElement, FOCUS_ON),
    onBlur:   (e) => applyStyles(e.currentTarget as HTMLElement, FOCUS_OFF),
  };
}

/* ── Validation ───────────────────────────────────────────────────────── */
/** Basic client-side guard before hitting the API */
function isValidForm(form: { name: string; email: string; message: string }): boolean {
  if (form.name.trim().length < 2)    return false;
  if (form.message.trim().length < 10) return false;
  // RFC-5322 simplified check — good enough for UI feedback
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return false;
  return true;
}

/* ── Socials ──────────────────────────────────────────────────────────── */
const SOCIALS = [
  { icon: Globe,        label: 'GitHub',              href: 'https://github.com/Jeruwu' },
  { icon: Link2,        label: 'LinkedIn',             href: 'https://www.linkedin.com/in/jeremycanarte/' },
  { icon: CalendarDays, label: 'Book a Call',          href: 'https://calendly.com/jeryruben58/30min' },
  { icon: Mail,         label: 'jeryruben58@gmail.com', href: 'mailto:jeryruben58@gmail.com' },
] as const;

/* ── Section ──────────────────────────────────────────────────────────── */
export function ContactSection({ lang, pulseTrigger = 0 }: ContactSectionProps) {
  const ref          = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLParagraphElement>(null);
  const isInView     = useInView(ref,      { once: true, margin: '-80px' });
  const isLabelInView= useInView(labelRef, { once: true, margin: '-60px' });
  const pulseControls      = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  /* Pulse animation on scroll-to highlight */
  useEffect(() => {
    if (pulseTrigger === 0) return;

    let cancelled = false;

    (async () => {
      await pulseControls.start({
        borderColor:     'rgba(245, 158, 11, 0.38)',
        boxShadow:       '0 0 72px rgba(245,158,11,0.16), 0 0 28px rgba(245,158,11,0.09), inset 0 0 48px rgba(245,158,11,0.05)',
        backgroundColor: 'rgba(245, 158, 11, 0.04)',
        transition:      { duration: 1, ease: 'easeOut' },
      });
      if (cancelled) return;
      await pulseControls.start({
        borderColor:     'rgba(255,255,255,0.05)',
        boxShadow:       'none',
        backgroundColor: 'rgba(0,0,0,0)',
        transition:      { duration: 1, ease: 'easeIn' },
      });
    })();

    return () => { cancelled = true; };
  }, [pulseTrigger, pulseControls]);

  /* Form state */
  const [form, setForm]               = useState({ name: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (submitState !== 'idle') return;

      // FIX: validate before sending
      if (!isValidForm(form)) return;

      setSubmitState('loading');

      /*
       * FIX: both timers are captured so cleanup can cancel either one.
       * Previously the inner clearTimeout was inside the outer callback's
       * return — which is a no-op because setTimeout callbacks' return
       * values are ignored.
       */
      let resetTimer: ReturnType<typeof setTimeout>;

      const submitTimer = setTimeout(() => {
        setSubmitState('success');
        setForm({ name: '', email: '', message: '' });
        resetTimer = setTimeout(() => setSubmitState('idle'), 4000);
      }, 1500);

      return () => {
        clearTimeout(submitTimer);
        clearTimeout(resetTimer);
      };
    },
    [submitState, form],
  );

  const isIdle    = submitState === 'idle';
  const isLoading = submitState === 'loading';
  const isSuccess = submitState === 'success';

  return (
    <section
      id="contact"
      className="bg-black py-20 md:py-32 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.1] pointer-events-none" aria-hidden />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left ── */}
          <div className="flex flex-col gap-8">
            <div>
              <motion.p
                ref={labelRef}
                className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-5"
                initial={{ opacity: 0, y: 6 }}
                animate={isLabelInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {lang === 'en' ? 'Get in touch' : 'Hablemos'}
              </motion.p>

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

            {/* Socials */}
            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  rel="noopener noreferrer"
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  aria-label={label}
                  className="flex items-center gap-3 text-gray-500 hover:text-primary transition-colors duration-300 group w-fit"
                  whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  whileTap={shouldReduceMotion   ? {} : { scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{ originX: 0 }}
                >
                  <motion.span
                    className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden />
                  </motion.span>
                  <span className="text-xs sm:text-sm">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right — Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative rounded-2xl p-6 md:p-8 border border-white/[0.05]"
              animate={pulseControls}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={tx(t.contact.name, lang)}>
                    <input
                      type="text"
                      required
                      minLength={2}
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder={tx(t.contact.name, lang)}
                      {...inputProps()}
                    />
                  </FormField>

                  <FormField label={tx(t.contact.email, lang)}>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder={tx(t.contact.email, lang)}
                      {...inputProps()}
                    />
                  </FormField>
                </div>

                <FormField label={tx(t.contact.message, lang)}>
                  <textarea
                    required
                    minLength={10}
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={tx(t.contact.message, lang)}
                    {...inputProps('resize-none')}
                  />
                </FormField>

                <div className="pt-1">
                  <motion.button
                    type="submit"
                    disabled={!isIdle}
                    aria-label={
                      isLoading ? tx(t.contact.submitting, lang)
                      : isSuccess ? tx(t.contact.submitted, lang)
                      : tx(t.contact.submit, lang)
                    }
                    className="relative h-12 w-56 rounded-full bg-[#DEDBC8] text-black font-medium text-sm disabled:cursor-not-allowed overflow-hidden"
                    whileTap={shouldReduceMotion || !isIdle ? {} : { scale: 0.97 }}
                    whileHover={shouldReduceMotion || !isIdle ? {} : { opacity: 0.92 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {/* Idle state */}
                    <div
                      className={`absolute inset-0 flex items-center justify-between pl-6 pr-1.5 transition-opacity duration-300 ${isIdle ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                      <span className="flex-1 text-center font-semibold tracking-wide whitespace-nowrap">
                        {tx(t.contact.submit, lang)}
                      </span>
                      <motion.span
                        className="bg-black rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0"
                        whileHover={shouldReduceMotion ? {} : { x: 2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <ArrowRight className="w-4 h-4 text-[#DEDBC8]" aria-hidden />
                      </motion.span>
                    </div>

                    {/* Loading state */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center gap-2.5 transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                      <Spinner />
                      <span className="font-semibold tracking-wide whitespace-nowrap">
                        {tx(t.contact.submitting, lang)}
                      </span>
                    </div>

                    {/* Success state */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isSuccess ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                      <span className="font-semibold tracking-wide whitespace-nowrap">
                        {tx(t.contact.submitted, lang)}
                      </span>
                    </div>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-20 md:mt-28 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} Jeremy Canarte. All rights reserved.
          </span>
          <span className="text-gray-700 text-[10px] font-mono">
            {lang === 'en'
              ? 'Designed & built with precision.'
              : 'Diseñado y construido con precisión.'}
          </span>
        </div>
      </div>
    </section>
  );
}
