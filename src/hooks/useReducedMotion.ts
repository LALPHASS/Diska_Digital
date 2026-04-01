'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  // Default to false on server (no reduced motion preference)
  return false;
}

function subscribe(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

/**
 * Reads the user's `prefers-reduced-motion` operating system setting.
 * Returns true if the user prefers reduced motion, false otherwise.
 * 
 * @returns boolean indicating if reduced motion is preferred
 * 
 * Validates: Requirement 11.4 - Animation_System shall not trigger animations
 * for Visitors who have enabled "prefers-reduced-motion"
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
