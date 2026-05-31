import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUp';

interface FeatureCardProps {
  number: string;
  title: string;
  iconUrl: string;
  items: string[];
  index: number;
}

function FeatureCard({ number, title, iconUrl, items, index }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="bg-[#212121] rounded-2xl p-5 md:p-6 flex flex-col h-full"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={iconUrl} alt={title} className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-4 object-cover" />
      <div className="text-gray-500 text-[10px] sm:text-xs mb-1">{number}</div>
      <h3 className="text-primary font-medium text-base sm:text-lg mb-4 leading-tight">{title}</h3>
      <ul className="flex flex-col gap-2 flex-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-gray-400 text-xs sm:text-sm leading-tight">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-4 border-t border-white/10">
        <a
          href="#"
          className="flex items-center gap-1.5 text-primary text-xs sm:text-sm group hover:gap-2.5 transition-all duration-300"
        >
          Learn more
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-300"
            style={{ transform: 'rotate(-45deg)' }}
          />
        </a>
      </div>
    </motion.div>
  );
}

interface VideoCardProps {
  index: number;
}

function VideoCard({ index }: VideoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden h-64 md:h-full"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <p className="absolute bottom-4 left-4 text-sm sm:text-base font-medium" style={{ color: '#E1E0CC' }}>
        Your creative canvas.
      </p>
    </motion.div>
  );
}

const FEATURES = [
  {
    number: '01',
    title: 'Project Storyboard.',
    iconUrl:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    items: [
      'Visual scene mapping with drag-and-drop flow',
      'Collaborative notes and shot annotations',
      'Export to PDF or shareable link',
      'Version history and checkpoint saves',
    ],
  },
  {
    number: '02',
    title: 'Smart Critiques.',
    iconUrl:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    items: [
      'AI-driven analysis of mood, pacing and composition',
      'Creative notes from industry mentors',
      'Seamless integrations with editorial tools',
    ],
  },
  {
    number: '03',
    title: 'Immersion Capsule.',
    iconUrl:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    items: [
      'Notification silencing during deep work sessions',
      'Curated ambient soundscapes for focus',
      'Smart schedule syncing for creative blocks',
    ],
  },
];

export function FeaturesSection() {
  return (
    <section className="min-h-screen bg-black py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Noise background */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-center mb-10 md:mb-14 leading-tight max-w-4xl mx-auto">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Studio-grade workflows for visionary creators.', className: 'text-primary' },
              { text: 'Built for pure vision. Powered by art.', className: 'text-gray-500' },
            ]}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          <VideoCard index={0} />
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.number} {...feature} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
