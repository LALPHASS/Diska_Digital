'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseTrackerProps {
  /** Normalized mouse X position (-1 to 1) */
  mouseX: number;
  /** Normalized mouse Y position (-1 to 1) */
  mouseY: number;
  /** Children to render inside the tracked group */
  children: React.ReactNode;
  /** Rotation intensity multiplier (default: 0.1) */
  intensity?: number;
  /** Smoothing factor for lerp (default: 0.05) */
  smoothing?: number;
}

/**
 * MouseTracker - Reads mouse position and applies subtle rotation to scene group
 * 
 * Wraps children in a group that rotates based on mouse position.
 * Uses lerp for smooth interpolation to create fluid parallax effect.
 * 
 * Validates: Requirements 1.6, 10.2
 * - 1.6: Apply subtle parallax/rotation effect to 3D element in response to cursor position
 * - 10.2: Apply rotation, drift, or depth-shift response when mouse moves over 3D element
 */
export function MouseTracker({
  mouseX,
  mouseY,
  children,
  intensity = 0.1,
  smoothing = 0.05,
}: MouseTrackerProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Target rotation values
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    // Update target rotation based on mouse position
    // Invert Y for natural feel (mouse up = rotate up)
    targetRotation.current.x = -mouseY * intensity;
    targetRotation.current.y = mouseX * intensity;

    // Smoothly interpolate current rotation towards target
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      smoothing
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      smoothing
    );
  });

  return <group ref={groupRef}>{children}</group>;
}
