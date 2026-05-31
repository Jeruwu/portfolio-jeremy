import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className = '', showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span key={i} className="overflow-hidden inline-block pb-[0.2em] mb-[-0.2em]">
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {isLast && showAsterisk ? (
                <>
                  {word.slice(0, -1)}
                  <span className="relative">
                    {word.slice(-1)}
                    <sup className="absolute" style={{ top: '0.65em', right: '-0.3em', fontSize: '0.31em' }}>*</sup>
                  </span>
                </>
              ) : word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const allWords: { word: string; wordClass: string; globalIndex: number }[] = [];
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((word) => {
      if (word) {
        allWords.push({ word, wordClass: seg.className || '', globalIndex: allWords.length });
      }
    });
  });

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {allWords.map(({ word, wordClass, globalIndex }) => (
        <span key={globalIndex} className="overflow-hidden inline-block mx-[0.15em] pb-[0.2em] mb-[-0.2em]">
          <motion.span
            className={`inline-block ${wordClass}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: globalIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
