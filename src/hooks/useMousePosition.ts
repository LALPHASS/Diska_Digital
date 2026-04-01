'use client';

import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

/**
 * Tracks mouse position and provides normalized coordinates for 3D parallax effects.
 * Normalized values range from -1 to 1, with (0, 0) at the center of the viewport.
 * 
 * @returns MousePosition object with raw (x, y) and normalized coordinates
 * 
 * Validates: Requirement 1.6 - Mouse cursor parallax/rotation effect on 3D elements
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    // Normalize to range [-1, 1] with center at (0, 0)
    const normalizedX = (clientX / innerWidth) * 2 - 1;
    const normalizedY = (clientY / innerHeight) * 2 - 1;

    setMousePosition({
      x: clientX,
      y: clientY,
      normalizedX,
      normalizedY,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return mousePosition;
}
