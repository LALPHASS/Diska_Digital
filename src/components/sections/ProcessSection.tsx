'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Audit',
    description: 'Nous analysons votre situation actuelle, identifions les opportunités et comprenons vos besoins uniques.',
    image: '/audit.jpg',
  },
  {
    number: '02',
    title: 'Stratégie',
    description: 'Nous développons une feuille de route sur mesure avec des objectifs clairs, des délais et des résultats mesurables.',
    image: '/strategy.jpg',
  },
  {
    number: '03',
    title: 'Exécution',
    description: 'Notre équipe donne vie à la stratégie avec précision, créativité et attention aux détails.',
    image: '/execution.jpg',
  },
  {
    number: '04',
    title: 'Support',
    description: 'Nous assurons la maintenance continue, les mises à jour et le support pour garantir un succès à long terme.',
    image: '/support.jpg',
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.process-panel');
    const totalWidth = (panels.length - 1) * 100;

    // Header animation
    gsap.from('.process-header', {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.process-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Horizontal scroll animation - much smoother with higher scrub value
    const horizontalScroll = gsap.to(panels, {
      xPercent: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1.5, // Higher value = smoother, more delayed response
        anticipatePin: 1,
        end: () => '+=' + (horizontalRef.current?.offsetWidth || 0) * 0.8,
        invalidateOnRefresh: true,
      },
    });

    // Simplified panel animations - less complex for smoother feel
    panels.forEach((panel) => {
      const panelEl = panel as HTMLElement;
      
      // Combined content animation - simpler, smoother
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelEl,
          containerAnimation: horizontalScroll,
          start: 'left 85%',
          end: 'left 20%',
          scrub: 1, // Scrub the panel animations too for smoothness
        },
      });

      tl.from(panelEl.querySelector('.panel-image'), {
        scale: 1.1,
        opacity: 0.3,
        duration: 1,
        ease: 'power2.out',
      }, 0)
      .from(panelEl.querySelector('.panel-number'), {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.1)
      .from(panelEl.querySelector('.panel-title'), {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.2)
      .from(panelEl.querySelector('.panel-description'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.3);
    });

    // Progress bar animation - synced with scroll
    gsap.to('.progress-fill', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => '+=' + (horizontalRef.current?.offsetWidth || 0) * 0.8,
        scrub: 1.5, // Match main scroll scrub
      },
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="process"
      className="bg-[#050f1e] overflow-hidden"
    >
      {/* Header */}
      <div className="process-header py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/40 border border-white/10 rounded-full mb-6">
            Comment Nous Travaillons
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Notre Processus
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Une méthodologie éprouvée pour livrer des résultats exceptionnels à votre entreprise.
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 md:px-8 lg:px-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="progress-fill h-full w-0 bg-gradient-to-r from-[#0066cc] via-[#06b6d4] to-[#14b8a6] rounded-full" />
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div ref={triggerRef} className="h-screen">
        <div
          ref={horizontalRef}
          className="flex h-full"
          style={{ width: `${PROCESS_STEPS.length * 100}vw` }}
        >
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="process-panel w-screen h-full flex items-center px-4 md:px-8 lg:px-16"
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Image side - Always left */}
                <div className="relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      loading="eager"
                      className="panel-image object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050f1e]/60 to-transparent" />
                  </div>
                  
                  {/* Floating number badge */}
                  <div className="panel-number absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-20 h-20 lg:w-28 lg:h-28 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
                    <span className="text-4xl lg:text-5xl font-bold text-[#050f1e]">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content side - Always right */}
                <div>
                  <div className="space-y-6">
                    {/* Step indicator */}
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                      <span className="text-white/40 text-sm uppercase tracking-widest">
                        Étape {index + 1} sur {PROCESS_STEPS.length}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="panel-title text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="panel-description text-white/60 text-lg md:text-xl leading-relaxed max-w-md">
                      {step.description}
                    </p>

                    {/* Decorative element */}
                    <div className="flex items-center gap-3 pt-4">
                      <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
                      </div>
                      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[#06b6d4] to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}