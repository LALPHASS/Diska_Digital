'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
export function Reveal({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : {
    opacity: 0,
    y: 24
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    amount: 0.1
  }} transition={{
    duration: reduced ? 0 : 0.65,
    delay: reduced ? 0 : delay,
    ease: [0.22, 1, 0.36, 1]
  }}>
    {children}
  </motion.div>;
}
