'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

// Dynamically import SplineViewer with SSR disabled
const SplineViewer = dynamic(
  () => import('@/components/three/SplineViewer').then((mod) => mod.SplineViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#050f1e]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
      </div>
    )
  }
);

interface HeroSectionProps {
  onSplineLoad?: () => void;
}

/**
 * Hero section with GSAP text animations
 */
export function HeroSection({ onSplineLoad }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // GSAP text animations
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ctx: ReturnType<typeof import('gsap').default.context> | null = null;

    const initAnimations = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;

      if (!headingRef.current) return;

      ctx = gsap.context(() => {
        // Split text into characters for animation
        const heading = headingRef.current;
        if (!heading) return;
        
        // Create spans for each word and character
        const words = heading.querySelectorAll('.hero-word');
        
        words.forEach((word) => {
          const text = word.textContent || '';
          word.innerHTML = text
            .split('')
            .map((char) => 
              char === ' ' 
                ? ' ' 
                : `<span class="hero-char inline-block">${char}</span>`
            )
            .join('');
        });

        const chars = heading.querySelectorAll('.hero-char');
        
        // Create master timeline
        const tl = gsap.timeline({ delay: 0.3 });

        // Badge animation
        if (badgeRef.current) {
          tl.fromTo(badgeRef.current,
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
            0
          );
        }

        // Character reveal animation with stagger
        tl.fromTo(chars,
          { 
            opacity: 0, 
            y: 80,
            rotateX: -90,
          },
          { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
          },
          0.3
        );

        // Subtext animation
        if (subtextRef.current) {
          tl.fromTo(subtextRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          );
        }

        // CTA button animation
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
            '-=0.3'
          );
        }

        // Scroll indicator animation
        if (scrollIndicatorRef.current) {
          tl.fromTo(scrollIndicatorRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            '-=0.2'
          );

          // Continuous bounce animation for scroll indicator
          gsap.to(scrollIndicatorRef.current, {
            y: 8,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 2,
          });
        }

        // Subtle hover effect on characters
        chars.forEach((char) => {
          const el = char as HTMLElement;
          const isGradientChar = el.closest('.hero-gradient') !== null;
          
          el.addEventListener('mouseenter', () => {
            gsap.to(el, {
              y: -5,
              color: isGradientChar ? '#0066cc' : '#06b6d4',
              duration: 0.2,
              ease: 'power2.out',
            });
          });
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              y: 0,
              color: isGradientChar ? '#06b6d4' : '',
              duration: 0.3,
              ease: 'power2.out',
            });
          });
        });
      }, containerRef);
    };

    initAnimations();

    return () => {
      ctx?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#050f1e]"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050f1e] via-[#0a1525] to-[#050f1e] pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#06b6d4]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#0066cc]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between py-20 lg:py-0 lg:h-screen relative z-10">
        {/* Text Content - Left Side */}
        <div className="relative z-20 text-left lg:w-1/2 order-2 lg:order-1">
          {/* Badge */}
          <div className="mb-6">
            <span 
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest text-white/60 border border-white/10 rounded-full opacity-0"
            >
              <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full animate-pulse" />
              Agence Digitale
            </span>
          </div>

          {/* Main heading with character animation */}
          <h1
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 font-heading perspective-[1000px]"
          >
            <span className="hero-word text-white">Nous </span>
            <span className="hero-word hero-gradient text-[#06b6d4]">
              modernisons
            </span>
            <br />
            <span className="hero-word text-white">votre entreprise</span>
          </h1>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="text-sm md:text-base lg:text-lg text-white/50 max-w-md mb-8 leading-relaxed opacity-0"
          >
            Transformez votre présence digitale avec un développement web de pointe, des solutions IT et un design créatif.
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="opacity-0">
            <AnimatedButton
              size="lg"
              showArrow={false}
              onClick={handleGetStarted}
              aria-label="Commencer - défiler vers la section contact"
            >
              Commencer
            </AnimatedButton>
          </div>
        </div>

        {/* Spline 3D Robot - Right Side */}
        <div className="lg:w-1/2 h-[40vh] sm:h-[50vh] lg:h-full w-full relative order-1 lg:order-2">
          <SplineViewer onLoad={onSplineLoad} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block opacity-0"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
