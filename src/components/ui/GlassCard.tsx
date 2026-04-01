'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable card component with glassmorphism styling and hover animations.
 * 
 * Validates: Requirements 13.2, 11.2
 * - 13.2: Glassmorphism effects (semi-transparent backgrounds with backdrop blur and subtle borders)
 * - 11.2: Hover micro-interactions (scale, glow) on cards
 */
export function GlassCard({ children, className }: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        'bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl',
        className
      )}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.02,
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.3, // 300ms - within 200-800ms bounds per Req 11.3
              ease: 'easeOut',
            }
      }
    >
      {children}
    </motion.div>
  );
}
