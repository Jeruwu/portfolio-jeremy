
export type CaseStudyData = {
  id: string;
  brief: { en: string; es: string };
  challenge: { en: string; es: string };
  solution: { en: string; es: string };
  impact: { en: string; es: string }[];
};

export const portfolioItems = [
  {
    title: { en: 'Trattoria Nonna | Fine Dining', es: 'Trattoria Nonna | Alta Cocina' },
    desc: {
      en: 'Transitioned from administrative chaos to an infallible booking system, completely eliminating no-shows and lost reservations.',
      es: 'Pasó del caos administrativo a un sistema de reservas infalible, eliminando por completo los no-shows y las reservas perdidas.',
    },
    tags: ['React', 'TypeScript', 'Tailwind', 'i18n'],
    imageSrc: '/images/simplified-trattoria.webp', 
    modalImageSrc: '/images/trattoria-landing.webp',
    color: '#2a1b14', 
    accent: '#DEDBC8',
    projectUrl: 'https://dashing-sundae-dcaf90.netlify.app/',
    displayUrl: 'trattorianonna.com',
    caseStudyId: 'trattoria-nonna',
  },
  {
    title: { en: 'Bright Smile Dental | Medical Platform', es: 'Bright Smile Dental | Plataforma Médica' },
    desc: {
      en: 'Drastically reduced support calls with a transparent pricing simulator, allowing the clinic to book high-value patients in under 60 seconds.',
      es: 'Redujimos drásticamente las llamadas de soporte con un simulador de precios transparente, permitiendo a la clínica agendar pacientes de alto valor en menos de 60 segundos.',
    },
    tags: ['React', 'TypeScript', 'Framer Motion'],
    imageSrc: '/images/simplified-bright.webp', 
    modalImageSrc: '/images/bright-landing.webp',
    color: '#1a2936', 
    accent: '#DEDBC8',
    projectUrl: 'https://joyful-biscuit-9df55f.netlify.app/',
    displayUrl: 'brightsmiledental.com',
    caseStudyId: 'bright-smile-dental',
  },
  {
    title: { en: 'Vance Executive | Advisory', es: 'Vance Executive | Advisory' },
    desc: {
      en: 'Built an elite interactive diagnostic funnel that automatically qualifies High-Ticket prospects and fills the founder’s pipeline with premium leads.',
      es: 'Construimos un embudo diagnóstico interactivo de élite que cualifica prospectos High-Ticket automáticamente y llena el pipeline de la fundadora con leads premium.',
    },
    tags: ['React', 'TypeScript', 'Tailwind', 'Lenis'],
    imageSrc: '/images/simplified-Vance.webp', 
    modalImageSrc: '/images/vance-landing.webp',
    color: '#342621', 
    accent: '#DEDBC8',
    projectUrl: 'https://boisterous-phoenix-2b234d.netlify.app/',
    displayUrl: 'vanceexecutive.com',
    caseStudyId: 'vance-executive',
  },
  {
    title: { en: 'Apex Fitness | Premium Coaching', es: 'Apex Fitness | Coaching Premium' },
    desc: {
      en: 'Captured immediate attention and drove high-end conversions through an ultra-fast, cinematic digital experience that projects absolute authority.',
      es: 'Capturamos la atención inmediata y disparamos las conversiones de alto nivel a través de una experiencia digital cinematográfica que proyecta autoridad absoluta.',
    },
    tags: ['React', 'TypeScript', 'Vite'],
    imageSrc: '/images/simplified-apex.webp', 
    modalImageSrc: '/images/apex-landing.webp',
    color: '#111111', 
    accent: '#DEDBC8',
    projectUrl: 'https://incandescent-cendol-101a0a.netlify.app/',
    displayUrl: 'apexfitness.app',
    caseStudyId: 'apex-fitness',
  },
];

export const caseStudies: Record<string, CaseStudyData> = {
  'trattoria-nonna': {
    id: 'trattoria-nonna',
    brief: {
      en: 'Trattoria Nonna is a premium web application that redefined the digital presence of high-end Italian cuisine, merging an immersive editorial aesthetic with an infallible conversion engine.',
      es: 'Trattoria Nonna es una aplicación web premium que redefinió la presencia digital de la alta cocina italiana, fusionando una estética editorial inmersiva con un motor de conversión infalible.',
    },
    challenge: {
      en: 'The Pain: The restaurant projected elegance physically, but their outdated website caused severe friction. They were bleeding revenue through lost reservations, no-shows, and a frustrating user experience that drove high-ticket diners to competitors.',
      es: 'El Dolor: El restaurante proyectaba elegancia física, pero su web obsoleta causaba fricción severa. Estaban sangrando ingresos a través de reservas perdidas, no-shows y una experiencia de usuario frustrante que ahuyentaba a comensales de alto valor.',
    },
    solution: {
      en: 'The Fix: I architected a high-performance system featuring a flawless 60 FPS scrolling experience and a resilient hybrid booking engine with offline fallback capabilities, ensuring every single lead is captured instantly.',
      es: 'La Solución: Diseñé un sistema de alto rendimiento con una experiencia de scroll impecable a 60 FPS y un motor de reservas híbrido con respaldo offline, asegurando que cada lead se capture al instante.',
    },
    impact: [
      {
        en: '100% Booking Retention Rate: The offline fallback architecture completely eliminated the loss of conversions and customer data during network outages.',
        es: '100% Tasa de Retención: La arquitectura offline eliminó por completo la pérdida de conversiones durante interrupciones de red.',
      },
      {
        en: 'Flawless Performance: Perfect 100/100 Google Lighthouse score, dominating search rankings and guaranteeing instant load times.',
        es: 'Rendimiento Impecable: Puntuación perfecta de 100/100 en Google Lighthouse, dominando el SEO local y garantizando cargas instantáneas.',
      },
      {
        en: 'Frictionless Multilingual Sales: Instant language switches ensure a highly personalized, high-converting experience for local and international tourists.',
        es: 'Ventas Multilingües Sin Fricción: Cambios de idioma instantáneos aseguran una experiencia de alta conversión para turistas internacionales.',
      },
      {
        en: 'Premium Brand Perception: Fluid transitions and a luxurious UI elevated their digital status to match their Michelin-level cuisine.',
        es: 'Percepción Premium: Transiciones fluidas y una UI lujosa elevaron su estatus digital al nivel de su cocina.',
      },
    ],
  },
  'bright-smile-dental': {
    id: 'bright-smile-dental',
    brief: {
      en: 'Bright Smile Dental is a high-conversion medical platform that modernizes patient care by transforming the tedious scheduling process into a fluid, user-oriented digital experience.',
      es: 'Bright Smile Dental es una plataforma médica de alta conversión que moderniza la atención al paciente transformando el tedioso proceso de agendar citas en una experiencia digital fluida.',
    },
    challenge: {
      en: 'The Pain: The clinic’s administrative staff was drowning in routine phone calls about pricing and availability. Patients felt anxious about costs, resulting in abandoned bookings and an inefficient, expensive daily operation.',
      es: 'El Dolor: El personal administrativo se ahogaba en llamadas telefónicas rutinarias sobre precios. Los pacientes sentían ansiedad por los costos, resultando en reservas abandonadas y una operación diaria ineficiente y costosa.',
    },
    solution: {
      en: 'The Fix: I orchestrated an ultra-fast booking engine integrated with a transparent real-time copay simulator. The UI/UX features a glassmorphism aesthetic that builds instant trust and significantly reduces patient friction.',
      es: 'La Solución: Orquesté un motor de reservas ultrarrápido integrado con un simulador de copagos transparente. La interfaz con estética glassmorphism construye confianza instantánea y reduce la fricción del paciente.',
    },
    impact: [
      {
        en: 'Accelerated Conversion (< 60s): Patients can now book, validate, and confirm their appointment in under a minute, multiplying the conversion rate.',
        es: 'Conversión Acelerada (< 60s): Los pacientes ahora pueden agendar, validar y confirmar su cita en menos de un minuto, multiplicando la tasa de conversión.',
      },
      {
        en: 'Reduced Operational Costs: The automated price simulator drastically decreased phone inquiries, freeing up staff to focus on actual patient care.',
        es: 'Reducción de Costos Operativos: El simulador de precios automatizado disminuyó drásticamente las consultas telefónicas, liberando al personal.',
      },
      {
        en: 'No-Show Eradication: One-click Apple/Google calendar sync guarantees reminder synchronization, tackling the issue of forgotten appointments.',
        es: 'Erradicación de No-Shows: La sincronización en un clic con calendarios de Apple/Google garantiza recordatorios, atacando el problema de citas olvidadas.',
      },
      {
        en: 'Immersive Trust-Building UI: A flawlessly smooth interface generates maximum credibility, positioning the clinic as an elite, high-tech practice.',
        es: 'UI Inmersiva y Confiable: Una interfaz impecable genera máxima credibilidad, posicionando a la clínica como una práctica de élite y alta tecnología.',
      },
    ],
  },
  'vance-executive': {
    id: 'vance-executive',
    brief: {
      en: 'Vance Executive is a high-level digital advisory platform that accelerates High-Ticket client acquisition by replacing traditional coaching funnels with an exclusive web experience.',
      es: 'Vance Executive es una plataforma digital de advisory que acelera la captación de clientes High-Ticket al reemplazar embudos tradicionales por una experiencia web exclusiva.',
    },
    challenge: {
      en: 'The Pain: The founder was wasting hours manually vetting unqualified leads. They needed a smart, luxurious digital presence that could filter out time-wasters and automatically qualify elite executive profiles.',
      es: 'El Dolor: La fundadora perdía horas filtrando manualmente leads no cualificados. Necesitaba una presencia digital lujosa que filtrara a los curiosos y cualificara automáticamente perfiles ejecutivos de élite.',
    },
    solution: {
      en: 'The Fix: I architected an enterprise-grade app featuring an interactive "Executive Presence Diagnostic". It gamifies the qualification process, evaluating metrics on-demand and syncing premium prospects directly to her CRM.',
      es: 'La Solución: Arquitecté una aplicación empresarial con un "Diagnóstico de Presencia Ejecutiva" interactivo. Gamifica el proceso de cualificación y sincroniza prospectos premium directamente a su CRM.',
    },
    impact: [
      {
        en: 'Automated Lead Qualification: The diagnostic tool drastically increased site dwell time while doing the heavy lifting of vetting, sending only highly-qualified profiles to the founder.',
        es: 'Cualificación Automática de Leads: La herramienta diagnóstica incrementó el tiempo en el sitio mientras hace el trabajo pesado de filtrado, enviando solo perfiles altamente cualificados.',
      },
      {
        en: 'Zero Conversion Friction: Automated calendar invitations and an elegant integrated notification system reduced back-and-forth administrative emails to zero.',
        es: 'Cero Fricción de Conversión: Invitaciones automáticas de calendario y un elegante sistema de notificaciones redujeron los correos administrativos a cero.',
      },
      {
        en: 'Silicon Valley-Level Positioning: Premium typography and sophisticated aesthetics elevated the brand to global agency standards, easily justifying High-Ticket pricing.',
        es: 'Posicionamiento Silicon Valley: Tipografías premium y estética sofisticada elevaron la marca a estándares globales, justificando fácilmente precios High-Ticket.',
      },
      {
        en: 'Flawless Technical Performance: Strategic lazy-loading guaranteed impeccable Core Web Vitals, driving more organic elite traffic to the funnel.',
        es: 'Rendimiento Técnico Impecable: El lazy-loading estratégico garantizó métricas Core Web Vitals impecables, atrayendo más tráfico orgánico de élite.',
      },
    ],
  },
  'apex-fitness': {
    id: 'apex-fitness',
    brief: {
      en: 'Apex Fitness is a visually stunning landing page for a premium coaching brand, driving high-end conversions through magnetic interactions and absolute authority.',
      es: 'Apex Fitness es una landing page visualmente impactante para una marca de coaching premium, impulsando conversiones a través de interacciones magnéticas y autoridad absoluta.',
    },
    challenge: {
      en: 'The Pain: The fitness market is oversaturated with cheap, generic websites. To sell premium coaching packages, the brand needed an elite digital presence that instantly captured attention and communicated top-tier quality.',
      es: 'El Dolor: El mercado del fitness está sobresaturado de webs genéricas y baratas. Para vender paquetes de coaching premium, la marca necesitaba una presencia digital de élite que capturara la atención de inmediato.',
    },
    solution: {
      en: 'The Fix: I engineered a bespoke, lightning-fast frontend utilizing custom mathematical React hooks for kinetic UI elements and 3D depth, creating a cinematic experience that screams luxury.',
      es: 'La Solución: Desarrollé un frontend a medida y ultrarrápido utilizando hooks matemáticos para elementos de UI cinéticos y profundidad 3D, creando una experiencia cinematográfica que respira lujo.',
    },
    impact: [
      {
        en: 'Elite Brand Perception: Custom magnetic UI and 3D tilt cards created a highly interactive journey that positioned the brand at the absolute top of the market.',
        es: 'Percepción de Marca de Élite: La UI magnética y las tarjetas 3D crearon un recorrido altamente interactivo que posicionó a la marca en la cima del mercado.',
      },
      {
        en: 'Increased Engagement & Conversions: Dynamic reveal animations effectively built trust and social proof, reducing bounce rates and keeping users glued to the sales funnel.',
        es: 'Aumento de Conversiones: Animaciones dinámicas construyeron confianza y prueba social, reduciendo el rebote y manteniendo a los usuarios pegados al embudo de ventas.',
      },
      {
        en: 'Lightning Fast Performance: By utilizing native Web Animations instead of heavy libraries, the site achieved near-instant load times, crucial for impatient high-ticket buyers.',
        es: 'Rendimiento Ultrarrápido: Al utilizar Animaciones Web nativas, el sitio logró tiempos de carga casi instantáneos, crucial para compradores de alto valor.',
      },
      {
        en: 'Future-Proof Scalability: A strict TypeScript foundation ensures a highly maintainable codebase ready for rapid scaling and future marketing campaigns.',
        es: 'Escalabilidad Asegurada: Una sólida base en TypeScript garantiza un código fácil de mantener y listo para escalar en futuras campañas.',
      },
    ],
  },
};
