'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * About Section describing Diska Digital's identity and mission.
 */
export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Main title animation
    gsap.from('.about-title', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-title',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Paragraphs staggered animation
    gsap.from('.about-paragraph', {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Image reveal with clip-path
    gsap.from('.about-image-wrapper', {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: '.about-image-wrapper',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Image parallax effect
    gsap.to('.about-image', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-image-wrapper',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Floating badge animation
    gsap.from('.about-badge', {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.about-badge',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Stats counter animation
    gsap.from('.stat-item', {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stats-container',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Decorative lines animation
    gsap.from('.deco-line', {
      scaleX: 0,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-[#050f1e] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content - Left */}
          <div className="about-content">
            {/* Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full">
                <span className="w-2 h-2 bg-[#06b6d4] rounded-full" />
                À Propos
              </span>
            </div>

            {/* Title */}
            <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              Qui Sommes{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#0066cc]">
                Nous
              </span>
            </h2>

            {/* Decorative line */}
            <div className="deco-line h-1 w-24 bg-gradient-to-r from-[#06b6d4] to-transparent rounded-full mb-8 origin-left" />

            {/* Paragraphs */}
            <div className="space-y-6">
              <p className="about-paragraph text-white/70 text-lg leading-relaxed">
                Diska Digital est une entreprise technologique basée au Mali, dédiée à aider 
                les entreprises à devenir modernes, visibles et efficaces. Nous combinons créativité 
                et expertise technique pour livrer des solutions qui ont un réel impact.
              </p>
              <p className="about-paragraph text-white/70 text-lg leading-relaxed">
                Notre mission est de combler le fossé entre les pratiques commerciales traditionnelles 
                et le monde numérique, permettant aux entreprises locales et internationales de 
                prospérer dans un marché de plus en plus connecté.
              </p>
              <p className="about-paragraph text-white/70 text-lg leading-relaxed">
                Du développement web aux services IT, en passant par le branding et la communication print, 
                nous offrons des solutions complètes adaptées à vos besoins uniques.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-container grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="stat-item">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-white/40 text-sm">Projets Réalisés</div>
              </div>
              <div className="stat-item">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">30+</div>
                <div className="text-white/40 text-sm">Clients Satisfaits</div>
              </div>
              <div className="stat-item">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">5+</div>
                <div className="text-white/40 text-sm">Ans d'Expérience</div>
              </div>
            </div>
          </div>

          {/* Image - Right */}
          <div className="relative">
            {/* Main image */}
            <div className="about-image-wrapper relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/who are we.jpg"
                alt="Équipe Diska Digital"
                fill
                loading="eager"
                className="about-image object-cover scale-125"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050f1e]/80 via-transparent to-[#050f1e]/20" />
            </div>

            {/* Floating badge */}
            <div className="about-badge absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-white flex flex-col items-center justify-center shadow-2xl">
              <span className="text-4xl lg:text-5xl font-bold text-[#050f1e]">DD</span>
              <span className="text-[#050f1e]/60 text-xs mt-1">Depuis 2020</span>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#06b6d4]/30 rounded-2xl" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#06b6d4]/20 rounded-xl blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
