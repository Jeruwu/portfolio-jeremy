import { motion } from 'framer-motion';
import { type Lang, t, tx } from '../i18n';

interface NavbarProps {
  lang: Lang;
  onLangToggle: () => void;
}

export function Navbar({ lang, onLangToggle }: NavbarProps) {
  const navItems = [
    { key: 'services', href: '#services' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' },
  ] as const;

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
      <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
        <nav className="flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200 whitespace-nowrap"
              style={{ color: 'rgba(225, 224, 204, 0.8)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
            >
              {tx(t.nav[item.key], lang)}
            </a>
          ))}

          {/* Language toggle */}
          <button
            onClick={onLangToggle}
            className="relative flex items-center gap-1 text-[10px] sm:text-xs md:text-sm rounded-full border border-primary/30 px-2.5 py-1 transition-all duration-300 hover:border-primary/60"
            style={{ color: 'rgba(225, 224, 204, 0.8)' }}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-primary/10"
              layoutId="lang-bg"
            />
            <span className={`relative z-10 transition-opacity duration-200 ${lang === 'en' ? 'opacity-100' : 'opacity-40'}`}>EN</span>
            <span className="relative z-10 text-primary/30">/</span>
            <span className={`relative z-10 transition-opacity duration-200 ${lang === 'es' ? 'opacity-100' : 'opacity-40'}`}>ES</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
