'use client';

import { useSyncExternalStore, useCallback, useMemo } from 'react';

interface ScrollSectionState {
  isPastHero: boolean;
  scrollY: number;
}

/**
 * Detects if the user has scrolled past the hero section.
 * Used to toggle navbar glassmorphism effect.
 * 
 * @param threshold - Scroll threshold in pixels (defaults to viewport height)
 * @returns ScrollSectionState with isPastHero boolean and current scrollY
 * 
 * Validates: Requirement 2.7 - Navbar glassmorphism when scrolled past Hero_Section
 */
export function useScrollSection(threshold?: number): ScrollSectionState {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('scroll', callback, { passive: true });
    return () => window.removeEventListener('scroll', callback);
  }, []);

  const getSnapshot = useCallback((): string => {
    const scrollY = window.scrollY;
    const scrollThreshold = threshold ?? window.innerHeight;
    const isPastHero = scrollY > scrollThreshold;
    // Return serialized state for comparison
    return JSON.stringify({ isPastHero, scrollY });
  }, [threshold]);

  const getServerSnapshot = useCallback((): string => {
    return JSON.stringify({ isPastHero: false, scrollY: 0 });
  }, []);

  const serializedState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  
  return useMemo(() => JSON.parse(serializedState) as ScrollSectionState, [serializedState]);
}
