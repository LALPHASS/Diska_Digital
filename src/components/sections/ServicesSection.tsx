'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Globe, Server, Printer, Monitor, LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Globe,
  Server,
  Printer,
  Monitor,
};

const SERVICES = [
  {
    icon: 'Globe',
    title: 'Digital & Web',
    description: 'Sites web sur mesure, applications web et solutions digitales qui élèvent votre présence en ligne et stimulent la croissance de votre entreprise.',
    image: '/digital web.jpg',
  },
  {
    icon: 'Server',
    title: 'IT & Maintenance',
    description: 'Support informatique complet, maintenance système et gestion d\'infrastructure pour assurer le bon fonctionnement de votre entreprise.',
    image: '/it maintenance.jpg',
  },
  {
    icon: 'Printer',
    title: 'Print & Communication',
    description: 'Branding professionnel, design graphique et supports imprimés qui communiquent votre message avec impact.',
    image: '/print comminication.jpg',
  },
  {
    icon: 'Monitor',
    title: 'Équipement IT',
    description: 'Vente de matériel informatique de qualité avec consultation experte pour répondre à vos besoins technologiques.',
    image: '/it equipment.jpg',
  },
];

/**
 * Services Section with GSAP animations
 */
export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header animation
    gsap.from('.services-header', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-header',
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    // Cards staggered reveal with 3D effect
    gsap.from('.service-card', {
      opacity: 0,
      y: 100,
      rotateX: 15,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 80%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    });

    // Image reveal animation for each card
    gsap.utils.toArray('.service-image-wrapper').forEach((wrapper) => {
      gsap.from(wrapper as Element, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: wrapper as Element,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Parallax effect on images
    gsap.utils.toArray('.service-image').forEach((img) => {
      gsap.to(img as Element, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: img as Element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Icon pulse animation
    gsap.utils.toArray('.service-icon').forEach((icon, i) => {
      gsap.to(icon as Element, {
        scale: 1.1,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.2,
      });
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-24 px-4 md:px-8 lg:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="services-header text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#050f1e]">
            Nos Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des solutions complètes pour moderniser votre entreprise et stimuler sa croissance
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon];

            return (
              <div
                key={service.title}
                className="service-card group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="service-image-wrapper relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="service-image object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050f1e]/80 via-[#050f1e]/20 to-transparent" />
                  
                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-4">
                    {IconComponent && (
                      <div className="service-icon w-14 h-14 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <IconComponent className="w-7 h-7 text-[#050f1e]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#050f1e] group-hover:text-[#0066cc] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Animated line */}
                  <div className="mt-4 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-[#050f1e] group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
