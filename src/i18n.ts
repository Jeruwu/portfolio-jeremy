export type Lang = 'en' | 'es';



export const t = {
  nav: {
    services: { en: 'Services', es: 'Servicios' },
    process: { en: 'Process', es: 'Proceso' },
    portfolio: { en: 'Success Stories', es: 'Casos de Éxito' },
    contact: { en: 'Start Scaling', es: 'Empezar a Escalar' },
  },
  hero: {
    title: {
      en: 'Stop Losing Clients to Slow, Outdated Websites.',
      es: 'Deja de Perder Clientes por una Web Lenta y Obsoleta.',
    },
    subtitle: {
      en: "You are leaving money on the table. I build high-converting web platforms and automated systems that turn your visitors into paying customers on autopilot, giving you your time back.",
      es: 'Estás dejando dinero sobre la mesa. Construyo plataformas de alta conversión y sistemas automatizados que convierten visitantes en clientes en piloto automático, devolviéndote tu tiempo libre.',
    },
    cta: { en: "Start Automating Today", es: 'Empieza a Escalar Hoy' },
  },
  services: {
    sectionTitle: { en: 'How I help you scale', es: 'Cómo te ayudo a escalar' },
    sectionSub: {
      en: 'Systems designed to increase your revenue and eliminate manual work.',
      es: 'Sistemas diseñados para multiplicar tus ingresos y eliminar el trabajo manual.',
    },
    items: [
      {
        title: { en: 'Unbreakable Digital Authority', es: 'Autoridad Digital Inquebrantable' },
        desc: {
          en: "Are your competitors stealing your clients because their website looks better? We design premium digital ecosystems that project elite status, close sales for you, and position your brand as the only logical choice in the market.",
          es: '¿Tu competencia se lleva a tus clientes porque su web se ve mejor? Diseñamos ecosistemas digitales premium que proyectan estatus, cierran ventas por ti y posicionan a tu marca como la única opción lógica del mercado.',
        },
        number: '01',
        iconType: 'code' as const,
      },
      {
        title: { en: 'Unstoppable Sales Funnels', es: 'Embudos de Conversión Imparables' },
        desc: {
          en: 'Paying for ads that lead to a generic website is burning money. We build psychologically-driven, magnetic Landing Pages designed specifically to capture high-quality leads and squeeze maximum ROI from your campaigns.',
          es: 'Pagar por anuncios que dirigen a una web genérica es quemar dinero. Creamos Landing Pages magnéticas diseñadas psicológicamente para capturar leads de alta calidad y exprimir al máximo el ROI de tus campañas.',
        },
        number: '02',
        iconType: 'cursor' as const,
      },
      {
        title: { en: 'Business on Autopilot', es: 'Negocio en Piloto Automático' },
        desc: {
          en: 'Forget the stress of coordinating appointments via WhatsApp. We implement intelligent systems that schedule, process payments, and send automated reminders 24/7, so you can focus exclusively on scaling your business.',
          es: 'Olvídate del estrés de coordinar citas por WhatsApp. Implementamos sistemas inteligentes que agendan, cobran y envían recordatorios automáticos 24/7, para que tú solo te dediques a facturar y escalar.',
        },
        number: '03',
        iconType: 'calendar' as const,
      },
    ],
  },
  process: {
    sectionTitle: { en: 'My Working Process', es: 'Mi Proceso de Trabajo' },
    sectionSub: { 
      en: 'A transparent, engineered methodology to ensure flawless delivery and zero friction.', 
      es: 'Una metodología transparente y técnica para asegurar una entrega impecable y cero fricción.' 
    },
    items: [
      {
        title: { en: 'Discovery & Audit', es: 'Diagnóstico y Descubrimiento' },
        desc: {
          en: '15-30 min initial call. We analyze your business needs and define the best digital strategy for your website.',
          es: 'Llamada inicial de 15-30 min. Analizamos las necesidades de tu negocio y definimos la mejor estrategia digital para tu web.'
        },
        number: '01'
      },
      {
        title: { en: 'Proposal & Design', es: 'Propuesta y Diseño' },
        desc: {
          en: 'Sitemap creation. Delivery of a detailed proposal with exact development timelines and budget. No hidden fees.',
          es: 'Creación del mapa de sitio. Entrega de propuesta detallada con tiempos exactos de desarrollo y presupuesto. Sin costos ocultos.'
        },
        number: '02'
      },
      {
        title: { en: 'Build & Iterate', es: 'Desarrollo Iterativo' },
        desc: {
          en: 'Programming with constant communication. Regular check-ins to ensure the design and functionalities meet your expectations.',
          es: 'Programación con comunicación constante. Revisiones periódicas para asegurar que el diseño y las funcionalidades cumplen tus expectativas.'
        },
        number: '03'
      },
      {
        title: { en: 'Launch & Delivery', es: 'Lanzamiento y Entrega' },
        desc: {
          en: 'Deployment on the final domain. Speed testing, mobile adaptation, and delivery of a 100% operational project.',
          es: 'Despliegue en el dominio final. Pruebas de velocidad, adaptación a móviles y entrega del proyecto 100% operativo.'
        },
        number: '04'
      }
    ]
  },
  portfolio: {
    sectionTitle: { en: 'Businesses Already Dominating', es: 'Negocios que ya Dominan su Sector' },
    sectionSub: { en: 'From operational chaos to automated growth.', es: 'Del caos operativo al crecimiento automatizado.' },
    cta: { en: 'See the Transformation', es: 'Ver la Transformación' },
  },
  contact: {
    title: {
      en: 'Your business is ready for the next level. Are\u00A0you?',
      es: 'Tu negocio está listo para el siguiente nivel. ¿Y\u00A0tú?',
    },
    subtitle: {
      en: "Stop putting out daily fires. Drop me a message and let's architect the system that will automate your growth.",
      es: 'Deja de apagar incendios diarios. Escríbeme y diseñemos el sistema que automatizará tu crecimiento.',
    },
    name: { en: 'Name', es: 'Nombre' },
    email: { en: 'Email', es: 'Correo' },
    message: { en: 'Tell me about your business goals', es: 'Cuéntame sobre los objetivos de tu negocio' },
    submit: { en: 'Book your Free Scalability Session', es: 'Reserva tu Sesión de Escalamiento Gratis' },
    submitting: { en: 'Sending...', es: 'Enviando...' },
    submitted: { en: 'Message Sent!', es: '¡Mensaje enviado!' },
    copyright: {
      en: 'Jeremy Canarte. All rights reserved.',
      es: 'Jeremy Canarte. Todos los derechos reservados.',
    },
    designed: {
      en: 'Architected for growth.',
      es: 'Diseñado para el crecimiento.',
    },
  },
} as const;



/** Type-safe translation helper */
export function tx<T extends { en: string; es: string }>(obj: T, lang: Lang): string {
  return obj[lang];
}
