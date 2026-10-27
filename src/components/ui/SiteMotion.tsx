'use client';

import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** One passive pointer listener; animation values never rerender the page. */
export function SiteMotion() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32 });

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (reduced) return;
    let active: HTMLElement | null = null;
    let frame = 0;

    const reset = () => {
      active?.style.removeProperty('--magnet-x');
      active?.style.removeProperty('--magnet-y');
      active = null;
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== 'mouse') { reset(); return; }
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>('.button, .header-cta, .footer-back')
        : null;
      if (target !== active) reset();
      if (!target) return;
      active = target;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (active !== target) return;
        const bounds = target.getBoundingClientRect();
        const x = Math.max(-5, Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * 0.1));
        const y = Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * 0.14));
        target.style.setProperty('--magnet-x', `${x}px`);
        target.style.setProperty('--magnet-y', `${y}px`);
      });
    };
    const visibility = () => { if (document.hidden) reset(); };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      reset();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [reduced]);

  return <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : progress }} />;
}
