import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { WordsPullUpMultiStyle } from './WordsPullUp';
import { AnimatedLetter } from './AnimatedLetter';

const ABOUT_TEXT =
  'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = ABOUT_TEXT.split('');

  return (
    <section className="bg-black py-16 md:py-24 px-4 md:px-8">
      <div
        ref={sectionRef}
        className="max-w-6xl mx-auto bg-[#101010] rounded-3xl p-8 md:p-12 lg:p-16 text-center"
      >
        {/* Label */}
        <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6 md:mb-8">
          Visual arts
        </p>

        {/* Main heading */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-8 md:mb-12">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am Marcus Chen,', className: 'font-normal text-primary' },
              {
                text: 'a self-taught director.',
                className: 'font-serif italic text-primary',
              },
              {
                text: 'I have skills in color grading, visual effects, and narrative design.',
                className: 'font-normal text-primary',
              },
            ]}
          />
        </div>

        {/* Scroll-animated body text */}
        <p
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          style={{ color: '#DEDBC8' }}
        >
          {chars.map((char, i) => (
            <AnimatedLetter
              key={i}
              char={char}
              scrollProgress={scrollYProgress}
              index={i}
              total={chars.length}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
