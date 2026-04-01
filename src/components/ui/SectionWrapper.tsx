'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  stagger?: boolean; // Enable staggered children animation
}

/**
 * Reusable wrapper that applies Framer Motion scroll-triggered fade-in animation.
 * Animation: opacity 0→1, translateY 40px→0, duration 600ms, ease-out
 * 
 * Validates: Requirements 11.1, 11.3, 11.4
 * - 11.1: Scroll-triggered fade-in animations to each major section
 * - 11.3: Easing curves (ease-out) with durations between 200ms and 800ms
 * - 11.4: Respects prefers-reduced-motion setting
 */
export function SectionWrapper({ 
  id, 
  children, 
  className, 
  stagger = false 
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for the container
  const containerVariants: Variants = {
    hidden: prefersReducedMotion 
      ? { opacity: 1, y: 0 } 
      : { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion 
        ? { duration: 0 }
        : {
            duration: 0.6, // 600ms
            ease: 'easeOut',
            ...(stagger && {
              staggerChildren: 0.1,
            }),
          },
    },
  };

  // Child variants for staggered animation
  const childVariants: Variants = {
    hidden: prefersReducedMotion 
      ? { opacity: 1, y: 0 } 
      : { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion 
        ? { duration: 0 }
        : {
            duration: 0.6, // 600ms
            ease: 'easeOut',
          },
    },
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn('w-full', className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {stagger ? (
        // Wrap children for staggered animation
        <StaggeredChildren variants={childVariants}>
          {children}
        </StaggeredChildren>
      ) : (
        children
      )}
    </motion.section>
  );
}

// Helper component to apply stagger variants to direct children
interface StaggeredChildrenProps {
  children: React.ReactNode;
  variants: Variants;
}

function StaggeredChildren({ children, variants }: StaggeredChildrenProps) {
  return (
    <>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={variants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={variants}>{children}</motion.div>
      )}
    </>
  );
}
