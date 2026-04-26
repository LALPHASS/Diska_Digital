'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Branded loading screen with quick progress animation.
 * No longer waits for 3D elements - just a brief branded intro.
 */
export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Quick progress animation - completes in ~1.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + 8, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dismiss when progress reaches 100%
    if (progress >= 100) {
      setTimeout(() => setIsLoading(false), 200);
    }
  }, [progress]);

  // Skip loading screen if user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050f1e]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Corner brackets frame */}
            <div className="relative">
              {/* Top-left corner */}
              <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-white/30" />
              {/* Top-right corner */}
              <div className="absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-white/30" />
              {/* Bottom-left corner */}
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-white/30" />
              {/* Bottom-right corner */}
              <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-white/30" />
              
              {/* Progress number */}
              <motion.div
                className="text-8xl md:text-9xl font-bold text-white tabular-nums px-8 py-4"
                key={Math.floor(progress)}
              >
                {Math.floor(progress)}
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-64 relative">
              {/* Bar container with corner brackets */}
              <div className="relative py-4">
                {/* Left bracket */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 border-l-2 border-t-2 border-b-2 border-white/30" />
                {/* Right bracket */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 border-r-2 border-t-2 border-b-2 border-white/30" />
                
                {/* Progress bar background */}
                <div className="mx-4 h-1 bg-white/10">
                  {/* Progress bar fill */}
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </div>

            {/* Loading text */}
            <motion.p
              className="text-white/40 text-xs uppercase tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Chargement
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
