export type Lang = 'en' | 'es';

export const t = {
  nav: {
    services: { en: 'Services',  es: 'Servicios'  },
    portfolio: { en: 'Portfolio', es: 'Portafolio' },
    contact:   { en: 'Contact',   es: 'Contacto'   },
  },
  hero: {
    title: {
      en: 'High-Performance Websites for Businesses that Want to Grow.',
      es: 'Sitios Web de Alto Rendimiento para Negocios que Buscan Crecer.',
    },
    subtitle: {
      en: "Hi, I'm Jeremy Canarte. I design and develop fast, modern, and scalable websites tailored to your business goals.",
      es: 'Hola, soy Jeremy Cañarte. Diseño y desarrollo webs rápidas, modernas y escalables, adaptadas a los objetivos de tu negocio.',
    },
    cta: { en: "Let's work together", es: 'Trabajemos juntos' },
  },
  services: {
    sectionTitle: { en: 'What I Do',  es: 'Lo que Hago' },
    sectionSub: {
      en: 'End-to-end web solutions crafted with precision.',
      es: 'Soluciones web completas creadas con precisión.',
    },
    items: [
      {
        title: { en: 'Custom Corporate Websites', es: 'Sitios Web Corporativos a Medida' },
        desc: {
          en: 'Bespoke, professional websites built to establish a powerful online presence, optimized for local SEO, credibility, and brand growth.',
          es: 'Sitios web profesionales creados a medida para establecer una presencia online poderosa, optimizados para SEO local, credibilidad y crecimiento de marca.',
        },
        number: '01',
        iconType: 'code' as const,
      },
      {
        title: { en: 'High-Converting Landing Pages', es: 'Landing Pages de Alta Conversión' },
        desc: {
          en: 'Performance-driven, single-page sites strategically designed to capture high-quality leads, promote specific products, and maximize your ad campaign ROI.',
          es: 'Páginas únicas orientadas al rendimiento, diseñadas estratégicamente para capturar leads de alta calidad, promover productos y maximizar el ROI de tus campañas.',
        },
        number: '02',
        iconType: 'cursor' as const,
      },
      {
        title: { en: 'Automated Booking Systems', es: 'Sistemas de Reservas Automatizados' },
        desc: {
          en: 'Smart, seamless web solutions integrated with real-time calendars and automated reminders to streamline client appointments and save hours of manual coordination.',
          es: 'Soluciones web inteligentes integradas con calendarios en tiempo real y recordatorios automáticos para optimizar citas y ahorrar horas de coordinación manual.',
        },
        number: '03',
        iconType: 'calendar' as const,
      },
    ],
  },
  portfolio: {
    sectionTitle: { en: 'Featured Projects',        es: 'Proyectos Destacados'        },
    sectionSub:   { en: 'A selection of recent work.', es: 'Una selección de trabajos recientes.' },
    cta:          { en: 'View Project',              es: 'Ver Proyecto'                },
    items: [
      {
        title: { en: 'EcoGlow – Botanic Skincare', es: 'EcoGlow – Skincare Botánico' },
        desc: {
          en: 'A full e-commerce experience for a sustainable skincare brand — featuring product filtering, animated cart, and a Stripe-powered checkout.',
          es: 'Una experiencia e-commerce completa para una marca de skincare sostenible, con filtros de producto, carrito animado y checkout con Stripe.',
        },
        tags: ['React', 'TypeScript', 'Node.js'],
        imageSrc: '/images/ecoglow-mockup.webp',
        color: '#1a2e1a',
        accent: '#DEDBC8',
        projectUrl: 'https://ecoglow.example.com',
      },
      {
        title: { en: 'Ápice – Business Consulting', es: 'Ápice – Consultoría Empresarial' },
        desc: {
          en: 'A high-trust corporate website for a consulting firm, built for conversion with clear CTAs, case studies, and a Stripe-powered service booking flow.',
          es: 'Sitio corporativo de alta credibilidad para una consultora, optimizado para conversión con CTAs claros, casos de éxito y reserva de servicios con Stripe.',
        },
        tags: ['Next.js', 'Tailwind', 'Stripe'],
        imageSrc: '/images/apice-mockup.webp',
        color: '#1a1a2e',
        accent: '#DEDBC8',
        projectUrl: 'https://apice.example.com',
      },
      {
        title: { en: 'Mantra – Yoga Studio', es: 'Mantra – Estudio de Yoga' },
        desc: {
          en: 'A serene booking platform for a yoga studio — with real-time class schedules, instructor profiles, and Supabase-backed seat reservations.',
          es: 'Plataforma de reservas para un estudio de yoga con horarios en tiempo real, perfiles de instructores y reservas de plazas con Supabase.',
        },
        tags: ['Vue.js', 'Supabase', 'GSAP'],
        imageSrc: '/images/mantra-mockup.webp',
        color: '#2e1a1a',
        accent: '#DEDBC8',
        projectUrl: 'https://musical-kitsune-cee5b0.netlify.app/',
      },
    ],
  },
  contact: {
    title:    { en: 'Ready to upgrade your online presence?', es: '¿Listo para mejorar tu presencia online?' },
    subtitle: {
      en: "Let's discuss your next project. Drop me a message!",
      es: 'Hablemos de tu próximo proyecto. ¡Envíame un mensaje!',
    },
    name:       { en: 'Name',                    es: 'Nombre'                       },
    email:      { en: 'Email',                   es: 'Correo'                       },
    message:    { en: 'Tell me about your project', es: 'Cuéntame sobre tu proyecto' },
    submit:     { en: 'Send Message',            es: 'Enviar mensaje'               },
    submitting: { en: 'Sending...',              es: 'Enviando...'                  },
    submitted:  { en: 'Message Sent!',           es: '¡Mensaje enviado!'            },
  },
} as const;

/** Type-safe translation helper */
export function tx<T extends { en: string; es: string }>(obj: T, lang: Lang): string {
  return obj[lang];
}
