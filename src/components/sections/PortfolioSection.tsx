'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Plateforme E-Commerce',
    category: 'Développement Web',
    description: 'Boutique en ligne moderne avec paiement rapide et gestion des stocks.',
    image: '/digital web.jpg',
    color: '#06b6d4',
    size: 'large',
  },
  {
    id: 2,
    title: 'Refonte de Marque',
    category: 'Branding',
    description: 'Identité visuelle complète : logo, couleurs et charte graphique.',
    image: '/print comminication.jpg',
    color: '#0066cc',
    size: 'small',
  },
  {
    id: 3,
    title: 'Infrastructure Réseau',
    category: 'Services IT',
    description: 'Configuration réseau sécurisée et architecture évolutive.',
    image: '/it maintenance.jpg',
    color: '#14b8a6',
    size: 'small',
  },
  {
    id: 4,
    title: 'Campagne Marketing',
    category: 'Print & Design',
    description: 'Supports marketing intégrés pour une présence de marque cohérente.',
    image: '/print comminication.jpg',
    color: '#8b5cf6',
    size: 'large',
  },
];

export function PortfolioSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header animation
    gsap.from('.portfolio-header', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portfolio-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Cards staggered animation
    gsap.from('.portfolio-card', {
      opacity: 0,
      y: 80,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="portfolio" 
      className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-[#050f1e] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="portfolio-header mb-16 lg:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#06b6d4] rounded-full" />
                Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Nos Réalisations
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-lg lg:text-right">
              Découvrez nos projets récents et comment nous aidons les entreprises à réussir.
            </p>
          </div>
        </div>

        {/* Portfolio Grid - Bento Style */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large Card 1 */}
          <div className="portfolio-card group relative md:col-span-2 lg:col-span-2 rounded-3xl overflow-hidden cursor-pointer h-[400px] lg:h-[480px]">
            <Image
              src={PORTFOLIO_ITEMS[0].image}
              alt={PORTFOLIO_ITEMS[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span 
                className="inline-flex w-fit px-3 py-1.5 text-xs font-medium rounded-full mb-4"
                style={{ backgroundColor: `${PORTFOLIO_ITEMS[0].color}`, color: 'white' }}
              >
                {PORTFOLIO_ITEMS[0].category}
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                {PORTFOLIO_ITEMS[0].title}
                <ArrowUpRight 
                  className="w-6 h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                />
              </h3>
              <p className="text-white/70 text-base max-w-md">
                {PORTFOLIO_ITEMS[0].description}
              </p>
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="portfolio-card group relative rounded-3xl overflow-hidden cursor-pointer h-[300px] lg:h-[480px]">
            <Image
              src={PORTFOLIO_ITEMS[1].image}
              alt={PORTFOLIO_ITEMS[1].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span 
                className="inline-flex w-fit px-3 py-1.5 text-xs font-medium rounded-full mb-3"
                style={{ backgroundColor: `${PORTFOLIO_ITEMS[1].color}`, color: 'white' }}
              >
                {PORTFOLIO_ITEMS[1].category}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                {PORTFOLIO_ITEMS[1].title}
                <ArrowUpRight 
                  className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                />
              </h3>
              <p className="text-white/70 text-sm">
                {PORTFOLIO_ITEMS[1].description}
              </p>
            </div>
          </div>

          {/* Small Card 2 */}
          <div className="portfolio-card group relative rounded-3xl overflow-hidden cursor-pointer h-[300px] lg:h-[400px]">
            <Image
              src={PORTFOLIO_ITEMS[2].image}
              alt={PORTFOLIO_ITEMS[2].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span 
                className="inline-flex w-fit px-3 py-1.5 text-xs font-medium rounded-full mb-3"
                style={{ backgroundColor: `${PORTFOLIO_ITEMS[2].color}`, color: 'white' }}
              >
                {PORTFOLIO_ITEMS[2].category}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                {PORTFOLIO_ITEMS[2].title}
                <ArrowUpRight 
                  className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                />
              </h3>
              <p className="text-white/70 text-sm">
                {PORTFOLIO_ITEMS[2].description}
              </p>
            </div>
          </div>

          {/* Large Card 2 */}
          <div className="portfolio-card group relative md:col-span-2 rounded-3xl overflow-hidden cursor-pointer h-[350px] lg:h-[400px]">
            <Image
              src={PORTFOLIO_ITEMS[3].image}
              alt={PORTFOLIO_ITEMS[3].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span 
                className="inline-flex w-fit px-3 py-1.5 text-xs font-medium rounded-full mb-4"
                style={{ backgroundColor: `${PORTFOLIO_ITEMS[3].color}`, color: 'white' }}
              >
                {PORTFOLIO_ITEMS[3].category}
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                {PORTFOLIO_ITEMS[3].title}
                <ArrowUpRight 
                  className="w-6 h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                />
              </h3>
              <p className="text-white/70 text-base max-w-md">
                {PORTFOLIO_ITEMS[3].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
