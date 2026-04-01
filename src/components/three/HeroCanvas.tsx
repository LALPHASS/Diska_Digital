'use client';

import { Suspense, useState, useEffect, useRef, Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { FloatingShapes } from './FloatingShapes';
import { MouseTracker } from './MouseTracker';
import { useMousePosition } from '@/hooks/useMousePosition';

/**
 * Error boundary for catching Three.js runtime errors
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Check if WebGL is available
 */
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}


/**
 * Fallback component for mobile or non-WebGL devices
 * Renders animated gradient background with CSS animations
 * 
 * Validates: Requirement 10.4
 * - Fall back to static image or simplified CSS animation on mobile/no-WebGL
 */
function GradientFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent-purple/10" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/30 rounded-full blur-3xl animate-pulse" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-blue/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '0.5s' }}
      />
      
      {/* Floating particles effect with CSS */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Three.js scene component
 */
function Scene() {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <MouseTracker mouseX={normalizedX} mouseY={normalizedY} intensity={0.15}>
      <FloatingShapes />
    </MouseTracker>
  );
}


/**
 * Custom hook to check if we should render 3D content
 * Handles SSR, WebGL detection, and viewport size
 */
function useRender3D() {
  const [state, setState] = useState({ mounted: false, render3D: false });
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const checkRenderCapability = () => {
      const isMobile = window.innerWidth < 768;
      const hasWebGL = isWebGLAvailable();
      return !isMobile && hasWebGL;
    };

    // Use requestAnimationFrame to defer state update
    requestAnimationFrame(() => {
      setState({ mounted: true, render3D: checkRenderCapability() });
    });

    const handleResize = () => {
      setState(prev => ({ ...prev, render3D: checkRenderCapability() }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}

/**
 * HeroCanvas - R3F Canvas wrapper for the hero section 3D background
 * 
 * Features:
 * - Dynamically checks for WebGL support
 * - Falls back to CSS gradient on mobile (<768px) or no WebGL
 * - Error boundary for graceful runtime error handling
 * - Mouse-tracked parallax effect on 3D shapes
 * 
 * Validates: Requirements 1.5, 1.6, 10.1, 10.2, 10.3, 10.4, 15.4
 * - 1.5: Render animated 3D element in Hero background
 * - 1.6: Apply parallax/rotation effect based on cursor position
 * - 10.1: Render interactive 3D scene with floating objects
 * - 10.2: Apply rotation response to mouse movement
 * - 10.3: Render at 30+ FPS on hardware-accelerated devices
 * - 10.4: Fall back on mobile/no-WebGL devices
 * - 15.4: Use code splitting via dynamic imports (handled by parent)
 */
export function HeroCanvas() {
  const { mounted, render3D } = useRender3D();

  // Show fallback during SSR
  if (!mounted) {
    return <GradientFallback />;
  }

  // Show fallback for mobile or no WebGL
  if (!render3D) {
    return <GradientFallback />;
  }

  return (
    <ThreeErrorBoundary fallback={<GradientFallback />}>
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]} // Limit pixel ratio for performance
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
}
