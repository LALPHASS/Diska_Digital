'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Asterisk } from '@/components/ui/Brand';
import { Reveal } from '@/components/ui/Reveal';
import { ExpertiseTicker } from '@/components/ui/ExpertiseTicker';
import { useReducedMotion } from '@/hooks/useReducedMotion';
const HeroSculpture = dynamic(() => import('@/components/three/HeroSculpture'), {
  ssr: false
});
export function HeroSection() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const artOffset = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const artY = useSpring(artOffset, { stiffness: 100, damping: 30 });
  return <section id="hero" className="hero shell" ref={section}>
    <div className="hero-topline">
      <span className="eyebrow">Studio créatif & technologique</span>
      <span className="hero-location">
        <span className="status-dot" />
        Bamako, Mali · Ouverts sur le monde
      </span>
    </div>
    <div className="hero-grid">
      <Reveal className="hero-copy">
        <h1 aria-label="Vos idées. En grand.">
          <span className="hero-line" aria-hidden="true"><span className="hero-line-inner">Vos idées.</span></span>
          <span className="hero-line hero-line-second" aria-hidden="true"><span className="hero-line-inner"><span className="serif blue">En grand.</span><span className="hero-title-dot">*</span></span></span>
        </h1>
        <p>Du premier déclic au dernier détail, nous mêlons design et technologie pour faire avancer votre entreprise.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#contact">
            Donnons vie à votre projet
            <ArrowUpRight size={19} />
          </a>
          <a className="text-link" href="#portfolio">
            Explorer notre univers
            <ArrowDownRight size={18} />
          </a>
        </div>
      </Reveal>
      <motion.div className="hero-art" style={{ y: reduced ? 0 : artY }} role="img" aria-label="Sculpture bleue en boucle, symbole des connexions entre créativité et technologie">
        <div className="art-orbit" />
        <div className="art-cross cross-one">+</div>
        <div className="art-cross cross-two">+</div>
        <div className="sculpture-fallback">
          <div />
          <div />
          <div />
        </div>
        <HeroSculpture />
        <span className="art-coordinate mono">
          12°38′ N
          <br />
          08°00′ O
        </span>
        <div className="art-seal">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="seal-circle" d="M60,60m-43,0a43,43 0 1,1 86,0a43,43 0 1,1 -86,0" />
            </defs>
            <text>
              <textPath href="#seal-circle" textLength="270">UN PEU D’AUDACE. BEAUCOUP D’IDÉES. · </textPath>
            </text>
          </svg>
          <Asterisk />
        </div>
        <div className="art-caption">
          <span className="tiny-square" />
          <span>
            La créativité crée
            <br />
            des connexions.
          </span>
          <span className="mono">FIG. 01</span>
        </div>
      </motion.div>
    </div>
    <div className="hero-bottom">
      <a className="scroll-link" href="#portfolio">
        <span>
          <ArrowDown size={17} />
        </span>
        La suite commence ici
      </a>
      <span className="hero-note">
        Une vision créative.
        <br />
        Quatre façons de faire la différence.
      </span>
    </div>
    <ExpertiseTicker />
  </section>;
}
