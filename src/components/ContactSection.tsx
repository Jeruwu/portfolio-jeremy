import { useRef, useState, useEffect, useCallback } from 'react';
import { m, useInView, useAnimation, useReducedMotion } from 'framer-motion';
import { Globe, Link2, Mail, CalendarDays, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { t, tx } from '../i18n';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface ContactSectionProps {
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

const FOCUS_ON: Partial<CSSStyleDeclaration> = {
  borderColor: 'rgba(222,219,200,0.3)',
  boxShadow: '0 0 0 3px rgba(245,158,11,0.12)',
};
const FOCUS_OFF: Partial<CSSStyleDeclaration> = {
  borderColor: 'rgba(255,255,255,0.08)',
  boxShadow: 'none',
};

function applyStyles(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  Object.assign(el.style, styles);
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-black/50 dark:text-primary/50 text-[10px] tracking-widest uppercase">{label}</label>
      {children}
    </div>
  );
}

/** Shared props injected into every <input> / <textarea> */
function inputProps(extraClass = ''): React.HTMLAttributes<HTMLElement> {
  return {
    className: `bg-white dark:bg-[#101010] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-primary text-sm placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 transition-[border-color,box-shadow,background-color] duration-500 ${extraClass}`,
    onFocus: (e) => applyStyles(e.currentTarget as HTMLElement, FOCUS_ON),
    onBlur: (e) => applyStyles(e.currentTarget as HTMLElement, FOCUS_OFF),
  };
}

/* ── Validation ───────────────────────────────────────────────────────── */
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').regex(/^[^<]*$/, 'Invalid characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ── Socials ──────────────────────────────────────────────────────────── */
const SOCIALS = [
  { icon: Globe, label: 'GitHub', href: 'https://github.com/Jeruwu' },
  { icon: Link2, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeremycanarte/' },
  { icon: CalendarDays, label: 'Book a Call', href: 'https://calendly.com/jeryruben58/30min' },
  { icon: Mail, label: 'jeryruben58@gmail.com', href: 'mailto:jeryruben58@gmail.com' },
] as const;

/* ── Section ──────────────────────────────────────────────────────────── */
export function ContactSection({ pulseTrigger = 0 }: ContactSectionProps) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLabelInView = useInView(labelRef, { once: true, margin: '-60px' });
  const pulseControls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  /* Pulse animation on scroll-to highlight */
  useEffect(() => {
    if (pulseTrigger === 0) return;

    let cancelled = false;
    
    // Use Amber (245, 158, 11) for dark mode, Cyan (34, 211, 238) for light mode
    const rgb = theme === 'dark' ? '245, 158, 11' : '34, 211, 238';
    const defaultBorder = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    (async () => {
      await pulseControls.start({
        borderColor: `rgba(${rgb}, 0.38)`,
        boxShadow:
          `0 0 72px rgba(${rgb},0.16), 0 0 28px rgba(${rgb},0.09), inset 0 0 48px rgba(${rgb},0.05)`,
        backgroundColor: `rgba(${rgb}, 0.04)`,
        transition: { duration: 1, ease: 'easeOut' },
      });
      if (cancelled) return;
      await pulseControls.start({
        borderColor: defaultBorder,
        boxShadow: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        transition: { duration: 1, ease: 'easeIn' },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [pulseTrigger, pulseControls, theme]);

  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const {
    register,
    handleSubmit: handleHookFormSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
  });

  const onSubmit = useCallback(
    async (data: ContactFormData) => {
      if (submitState === 'loading') return;

      const now = Date.now();
      if (now - lastSubmitTime < 30000) {
        alert(
          lang === 'en'
            ? 'Please wait before sending another message.'
            : 'Por favor espera antes de enviar otro mensaje.',
        );
        return;
      }

      setSubmitState('loading');
      setLastSubmitTime(now);

      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          console.warn('EmailJS keys are missing. Simulating success...');
          await new Promise((r) => setTimeout(r, 1000));
        } else {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: data.name,
              reply_to: data.email,
              message: data.message,
            },
            publicKey
          );
        }

        setSubmitState('success');
        reset();
        setTimeout(() => setSubmitState('idle'), 4000);
      } catch (err) {
        console.error('Failed to send email', err);
        setSubmitState('idle');
        alert(lang === 'en' ? 'Failed to send message. Please try again later.' : 'Error al enviar el mensaje. Inténtalo más tarde.');
      }
    },
    [lang, lastSubmitTime, submitState, reset],
  );

  const isIdle = submitState === 'idle';
  const isLoading = submitState === 'loading';
  const isSuccess = submitState === 'success';

  return (
    <section id="contact" className="bg-light-bg dark:bg-black py-20 md:py-32 px-4 md:px-8 relative overflow-hidden transition-colors duration-500">
      <div className="bg-noise absolute inset-0 opacity-[0.1] pointer-events-none" aria-hidden />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Left ── */}
          <div className="flex flex-col gap-8">
            <div>
              <m.p
                ref={labelRef}
                className="text-black dark:text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-5"
                initial={{ opacity: 0, y: 6 }}
                animate={isLabelInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {lang === 'en' ? 'Get in touch' : 'Hablemos'}
              </m.p>

              <div className="text-3xl sm:text-4xl md:text-5xl font-normal max-w-lg leading-[0.95] mb-5">
                <WordsPullUpMultiStyle
                  key={`ct-title-${lang}`}
                  segments={[{ text: tx(t.contact.title, lang), className: 'text-black dark:text-primary' }]}
                />
              </div>

              <m.p
                key={`ct-sub-${lang}`}
                className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {tx(t.contact.subtitle, lang)}
              </m.p>
            </div>

            {/* Socials */}
            <m.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <m.a
                  key={label}
                  href={href}
                  rel="noopener noreferrer"
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  aria-label={label}
                  className="flex items-center gap-3 text-gray-600 hover:text-black dark:text-gray-500 dark:hover:text-primary transition-colors duration-300 group w-fit"
                  whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{ originX: 0 }}
                >
                  <m.span
                    className="w-8 h-8 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 dark:group-hover:bg-primary/10 transition-colors duration-300"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden />
                  </m.span>
                  <span className="text-xs sm:text-sm">{label}</span>
                </m.a>
              ))}
            </m.div>
          </div>

          {/* ── Right — Form ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <m.div
              className="relative rounded-2xl p-6 md:p-8 border border-black/[0.05] dark:border-white/[0.05] bg-white/40 dark:bg-white/5 shadow-sm"
              animate={pulseControls}
            >
              <form onSubmit={handleHookFormSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={tx(t.contact.name, lang)}>
                    <>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder={tx(t.contact.name, lang)}
                        {...register('name')}
                        {...inputProps(errors.name ? 'border-red-500/50' : '')}
                      />
                      {errors.name && <span className="text-[#800020] dark:text-red-400 text-[10px] mt-1">{errors.name.message}</span>}
                    </>
                  </FormField>

                  <FormField label={tx(t.contact.email, lang)}>
                    <>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder={tx(t.contact.email, lang)}
                        {...register('email')}
                        {...inputProps(errors.email ? 'border-red-500/50' : '')}
                      />
                      {errors.email && <span className="text-[#800020] dark:text-red-400 text-[10px] mt-1">{errors.email.message}</span>}
                    </>
                  </FormField>
                </div>

                <FormField label={tx(t.contact.message, lang)}>
                  <>
                    <textarea
                      rows={6}
                      placeholder={tx(t.contact.message, lang)}
                      {...register('message')}
                      {...inputProps(`resize-none ${errors.message ? 'border-red-500/50' : ''}`)}
                    />
                    {errors.message && <span className="text-[#800020] dark:text-red-400 text-[10px] mt-1">{errors.message.message}</span>}
                  </>
                </FormField>

                {Object.keys(errors).length > 0 && (
                  <div className="text-[#800020] dark:text-red-400 text-xs text-center font-medium">
                    {lang === 'en' ? 'Please fix the errors above before submitting.' : 'Por favor corrige los errores de arriba antes de enviar.'}
                  </div>
                )}

                <div className="pt-1 flex justify-center w-full">
                  <m.button
                    type="submit"
                    disabled={!isIdle}
                    aria-label={
                      isLoading
                        ? tx(t.contact.submitting, lang)
                        : isSuccess
                          ? tx(t.contact.submitted, lang)
                          : tx(t.contact.submit, lang)
                    }
                    className="relative h-12 w-full sm:w-[380px] rounded-full bg-white dark:bg-primary text-black font-medium text-sm disabled:cursor-not-allowed overflow-hidden shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-black"
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
                      <m.span
                        className="bg-black rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0"
                        whileHover={shouldReduceMotion ? {} : { x: 2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <ArrowRight className="w-4 h-4 text-[#DEDBC8]" aria-hidden />
                      </m.span>
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
                  </m.button>
                </div>
              </form>
            </m.div>
          </m.div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-20 md:mt-28 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-gray-500 dark:text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} {tx(t.contact.copyright, lang)}
          </span>
          <span className="text-gray-400 dark:text-gray-700 text-[10px] font-mono">
            {tx(t.contact.designed, lang)}
          </span>
        </div>
      </div>
    </section>
  );
}
