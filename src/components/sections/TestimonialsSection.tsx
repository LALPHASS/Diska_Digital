'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Asterisk } from '@/components/ui/Brand';
import { Reveal } from '@/components/ui/Reveal';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function ManifestoWord({ word, index, progress, accent, reduced }: {
  word: string; index: number; progress: MotionValue<number>; accent: boolean; reduced: boolean;
}) {
  const finalColor = accent ? '#2449e8' : '#222420';
  const color = useTransform(progress, [index / 8, (index + 1) / 8], ['#805e49', finalColor]);
  return <motion.span style={{ color: reduced ? finalColor : color }}>{word}{' '}</motion.span>;
}

export function TestimonialsSection() {
  const title = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: title, offset: ['start 0.85', 'end 0.45'] });
  const rotation = useTransform(scrollYProgress, [0, 1], [-12, 60]);
  const starY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  return <section id="testimonials" className="manifesto-section">
    <div className="shell">
      <Reveal className="manifesto-layout">
        <span className="eyebrow">Notre conviction</span>
        <h2 ref={title} aria-label="Le beau attire. Le juste fait la différence.">
          {['Le beau attire.', 'Le juste fait', 'la différence.'].map((line, row) => (
            <span className={`manifesto-line${row === 2 ? ' serif' : ''}`} aria-hidden="true" key={line}>
              {line.split(' ').map((word, index) => <ManifestoWord key={word} word={word}
                index={row * 3 + index} progress={scrollYProgress} accent={row === 2} reduced={reduced} />)}
            </span>
          ))}
        </h2>
        <motion.div className="manifesto-star" aria-hidden="true" style={{ rotate: reduced ? 12 : rotation, y: reduced ? 0 : starY }}><Asterisk /></motion.div>
        <p>
          Une belle idée mérite une exécution à la hauteur.
          <br />
          C’est là que nous intervenons.
        </p>
      </Reveal>
    </div>
  </section>;
}
