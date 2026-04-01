'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PORTFOLIO_ITEMS = [
  {
    number: '01',
    title: 'Plateforme E-Commerce',
    category: 'Développement Web',
    description: 'Une boutique en ligne moderne conçue pour la performance et les conversions. Design épuré, paiement rapide et gestion des stocks fluide.',
    color: '#06b6d4',
  },
  {
    number: '02',
    title: 'Refonte de Marque',
    category: 'Branding',
    description: 'Refonte complète de l\'identité visuelle incluant logo, palette de couleurs, typographie et charte graphique pour une communication cohérente.',
    color: '#0066cc',
  },
  {
    number: '03',
    title: 'Infrastructure Réseau',
    category: 'Services IT',
    description: 'Configuration réseau de niveau entreprise avec protocoles de sécurité, systèmes de surveillance et architecture évolutive.',
    color: '#14b8a6',
  },
  {
    number: '04',
    title: 'Campagne Marketing',
    category: 'Print & Design',
    description: 'Supports marketing intégrés des publicités digitales aux supports imprimés, créant une présence de marque cohérente sur tous les canaux.',
    color: '#8b5cf6',
  },
];

export function PortfolioSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header animation
    gsap.from('.portfolio-header', {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portfolio-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Cards staggered animation with 3D effect
    gsap.from('.portfolio-card', {
      opacity: 0,
      y: 100,
      rotateX: 10,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Number animation for each card
    gsap.utils.toArray('.portfolio-number').forEach((num, i) => {
      gsap.from(num as Element, {
        textContent: '00',
        duration: 1.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: num as Element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Hover animations setup
    gsap.utils.toArray('.portfolio-card').forEach((card) => {
      const cardEl = card as HTMLElement;
      const arrow = cardEl.querySelector('.card-arrow');
      const glow = cardEl.querySelector('.card-glow');

      cardEl.addEventListener('mouseenter', () => {
        gsap.to(arrow, { x: 5, y: -5, duration: 0.3, ease: 'power2.out' });
        gsap.to(glow, { opacity: 1, scale: 1.5, duration: 0.5, ease: 'power2.out' });
      });

      cardEl.addEventListener('mouseleave', () => {
        gsap.to(arrow, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
        gsap.to(glow, { opacity: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="portfolio" className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-[#050f1e] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="portfolio-header mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#06b6d4] rounded-full" />
                Nos Travaux
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Nos{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#0066cc]">
                  Réalisations
                </span>
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-lg">
              Découvrez nos projets récents et comment nous aidons les entreprises à réussir.
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <div
              key={item.number}
              className="portfolio-card group relative p-8 lg:p-10 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-300 cursor-pointer overflow-hidden"
            >
              {/* Glow effect */}
              <div 
                className="card-glow absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 blur-3xl pointer-events-none"
                style={{ backgroundColor: item.color }}
              />

              {/* Number */}
              <div className="flex items-start justify-between mb-8">
                <span 
                  className="portfolio-number text-7xl lg:text-8xl font-bold opacity-10"
                  style={{ color: item.color }}
                >
                  {item.number}
                </span>
                
                {/* Category badge */}
                <span 
                  className="px-4 py-2 text-xs font-medium rounded-full"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 flex items-center gap-3 group-hover:text-white transition-colors">
                  {item.title}
                  <ArrowUpRight className="card-arrow w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: item.color }} />
                </h3>
                <p className="text-white/50 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner accent */}
              <div 
                className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ 
                  background: `linear-gradient(135deg, transparent 50%, ${item.color} 50%)`,
                  borderRadius: '0 0 1.5rem 0'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}