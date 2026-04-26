'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
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

    gsap.to('.about-image', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-image-wrapper',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
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
          {/* Image - Left */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-wrapper relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/who are we.jpg"
                alt="Équipe Diska Digital"
                fill
                loading="eager"
                className="about-image object-cover scale-125"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050f1e]/60 via-transparent to-transparent" />
            </div>

            {/* Badge flottant */}
            <motion.div 
              className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 px-6 py-4 rounded-xl bg-cyan-500 text-white shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm text-white/80">Ans d&apos;expérience</div>
            </motion.div>
          </motion.div>

          {/* Text Content - Right */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-400 text-sm uppercase tracking-[0.2em] mb-4 block">
              À Propos
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Qui Sommes <span className="text-cyan-400">Nous</span>
            </h2>

            <div className="w-16 h-1 bg-cyan-500 rounded-full mb-8" />

            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Basée au Mali, <span className="text-white font-medium">Diska Digital</span>{' '}aide les entreprises à devenir modernes, visibles et efficaces grâce à la créativité et l&apos;expertise technique.
            </p>

            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Notre mission : connecter les entreprises au monde numérique pour les faire prospérer.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-white/10">
              {[
                { value: '50+', label: 'Projets' },
                { value: '30+', label: 'Clients' },
                { value: '98%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Travaillons ensemble
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
