'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { cn } from '@/lib/utils';

// Elegant floating shape component
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/10",
            "shadow-[0_8px_32px_0_rgba(6,182,212,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

interface HeroSectionProps {
  onSplineLoad?: () => void;
}

/**
 * Hero section with GSAP text animations and elegant floating shapes
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
        const heading = headingRef.current;
        if (!heading) return;
        
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
        
        const tl = gsap.timeline({ delay: 0.3 });

        if (badgeRef.current) {
          tl.fromTo(badgeRef.current,
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
            0
          );
        }

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

        if (subtextRef.current) {
          tl.fromTo(subtextRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          );
        }

        if (ctaRef.current) {
          tl.fromTo(ctaRef.current,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
            '-=0.3'
          );
        }

        if (scrollIndicatorRef.current) {
          tl.fromTo(scrollIndicatorRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            '-=0.2'
          );

          gsap.to(scrollIndicatorRef.current, {
            y: 8,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 2,
          });
        }

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
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30 h-full w-full 
        bg-[linear-gradient(to_right,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.1)_1px,transparent_1px)]
        bg-[size:4rem_4rem] 
        [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)]"
      />

      {/* Radial glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050f1e] via-transparent to-[#050f1e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050f1e]/50 via-transparent to-[#050f1e]/50 pointer-events-none" />

      {/* Animated floating shapes */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ElegantShape
            delay={0.3}
            width={500}
            height={120}
            rotate={12}
            gradient="from-cyan-500/15"
            className="left-[-15%] md:left-[-8%] top-[15%] md:top-[20%]"
          />

          <ElegantShape
            delay={0.5}
            width={400}
            height={100}
            rotate={-15}
            gradient="from-blue-500/15"
            className="right-[-8%] md:right-[-3%] top-[65%] md:top-[70%]"
          />

          <ElegantShape
            delay={0.4}
            width={250}
            height={70}
            rotate={-8}
            gradient="from-teal-500/12"
            className="left-[5%] md:left-[10%] bottom-[8%] md:bottom-[12%]"
          />

          <ElegantShape
            delay={0.6}
            width={180}
            height={50}
            rotate={20}
            gradient="from-cyan-400/12"
            className="right-[20%] md:right-[25%] top-[8%] md:top-[12%]"
          />

          <ElegantShape
            delay={0.7}
            width={120}
            height={35}
            rotate={-25}
            gradient="from-blue-400/10"
            className="left-[25%] md:left-[30%] top-[3%] md:top-[6%]"
          />
        </div>
      )}

      {/* Floating particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.6, 0], y: [0, -40, 0] }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center py-20 lg:pt-32 lg:pb-20 min-h-screen relative z-10">
        {/* Text Content - Centered */}
        <div className="relative z-20 text-center max-w-4xl">
          {/* Badge */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span 
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-cyan-300/80 border border-cyan-500/20 rounded-full bg-cyan-500/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              Agence Digitale
            </span>
          </motion.div>

          {/* Main heading with character animation */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-4 font-heading perspective-[1000px]"
          >
            <span className="hero-word bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">Vos idées, </span>
            <span className="hero-word hero-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">
              notre expertise
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/70 font-light mb-6 tracking-wide">
            Des résultats qui parlent d&apos;eux-mêmes.
          </p>

          {/* Decorative line */}
          <motion.div 
            className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="text-base md:text-lg lg:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed font-light tracking-wide opacity-0"
          >
            Transformez votre présence digitale avec un développement web de pointe, des solutions IT et un design créatif.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
            <AnimatedButton
              size="lg"
              showArrow={false}
              onClick={handleGetStarted}
              aria-label="Commencer - défiler vers la section contact"
            >
              Commencer
            </AnimatedButton>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-6 py-3 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              Découvrir nos services
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Stats row */}
          <motion.div 
            className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[
              { value: '50+', label: 'Projets livrés' },
              { value: '98%', label: 'Clients satisfaits' },
              { value: '5+', label: "Années d'expérience" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-3 bg-cyan-400/60 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
