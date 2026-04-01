'use client';

import { Suspense, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Spline to handle any loading issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  ),
});

interface SplineViewerProps {
  onLoad?: () => void;
}

/**
 * Spline 3D Viewer component
 * Renders the 3D robot animation scene
 */
export function SplineViewer({ onLoad }: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Remove Spline watermark after load
  useEffect(() => {
    const removeWatermark = () => {
      if (!containerRef.current) return;
      
      // Find and hide the watermark logo
      const watermarks = containerRef.current.querySelectorAll('a[href*="spline"], div[style*="position: absolute"][style*="bottom"]');
      watermarks.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

      // Also check for the logo element specifically
      const logos = containerRef.current.querySelectorAll('img[alt*="Spline"], img[src*="spline"], a > img');
      logos.forEach((el) => {
        const parent = el.parentElement;
        if (parent) {
          parent.style.display = 'none';
        }
      });
    };

    // Run multiple times to catch dynamically added elements
    const timer1 = setTimeout(removeWatermark, 1000);
    const timer2 = setTimeout(removeWatermark, 2000);
    const timer3 = setTimeout(removeWatermark, 3000);

    // Also observe for changes
    const observer = new MutationObserver(removeWatermark);
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    // Remove watermark on load
    if (containerRef.current) {
      const watermarks = containerRef.current.querySelectorAll('a[href*="spline"]');
      watermarks.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    }
    onLoad?.();
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        }
      >
        <Spline 
          scene="https://prod.spline.design/okzP13vs-o27Pt3V/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
          onLoad={handleLoad}
        />
      </Suspense>
      {/* Overlay to cover bottom-right watermark area */}
      <div className="absolute bottom-0 right-0 w-48 h-16 bg-[#050f1e] pointer-events-none" />
    </div>
  );
}
