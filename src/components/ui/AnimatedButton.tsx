'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonSize = 'sm' | 'md' | 'lg';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  showArrow?: boolean;
}

/**
 * GSAP-powered animated button with unified styling.
 * Gradient: Dark navy to cyan (#050f1e → #06b6d4)
 */
export function AnimatedButton({
  children,
  size = 'md',
  showArrow = true,
  className,
  ...props
}: AnimatedButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !buttonRef.current) return;

    let gsap: typeof import('gsap').default;
    let cleanup: (() => void) | undefined;

    const initGsap = async () => {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default;

      const button = buttonRef.current;
      if (!button) return;

      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.03,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }

        if (shineRef.current) {
          gsap.fromTo(shineRef.current,
            { x: '-100%', opacity: 0.5 },
            { x: '200%', opacity: 0, duration: 0.6, ease: 'power2.inOut' }
          );
        }

        if (arrowRef.current) {
          gsap.to(arrowRef.current, {
            x: 4,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }

        if (arrowRef.current) {
          gsap.to(arrowRef.current, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      };

      const handleMouseDown = () => {
        gsap.to(button, {
          scale: 0.97,
          duration: 0.1,
          ease: 'power2.out',
        });
      };

      const handleMouseUp = () => {
        gsap.to(button, {
          scale: 1.03,
          duration: 0.3,
          ease: 'back.out(1.7)',
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      button.addEventListener('mousedown', handleMouseDown);
      button.addEventListener('mouseup', handleMouseUp);

      cleanup = () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('mousedown', handleMouseDown);
        button.removeEventListener('mouseup', handleMouseUp);
      };
    };

    initGsap();

    return () => cleanup?.();
  }, [prefersReducedMotion]);

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-5 py-2.5 text-sm min-h-[44px] min-w-[44px] gap-2',
    md: 'px-6 py-3 text-base min-h-[44px] min-w-[44px] gap-2',
    lg: 'px-8 py-4 text-base min-h-[44px] min-w-[44px] gap-3',
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        'group relative inline-flex items-center justify-center font-semibold rounded-full overflow-hidden transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06b6d4]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050f1e] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Gradient background: dark navy to cyan */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#050f1e] via-[#0a2540] to-[#06b6d4]" />
      
      {/* Glow effect on hover */}
      <span 
        ref={glowRef}
        className="absolute inset-0 opacity-0 bg-[#06b6d4]/30 blur-xl pointer-events-none" 
      />
      
      {/* Shine sweep effect */}
      <span className="absolute inset-0 overflow-hidden pointer-events-none">
        <span 
          ref={shineRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 -translate-x-full"
        />
      </span>
      
      {/* Content */}
      <span ref={contentRef} className="relative z-10 flex items-center gap-2 text-white">
        <span>{children}</span>
        {showArrow && (
          <span ref={arrowRef} className="inline-flex">
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </span>
    </button>
  );
}
