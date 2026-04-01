'use client';

import { useRef, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

// Get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import('gsap').default.context> | null = null;

    const initAnimations = async () => {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo('.testimonial-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.testimonials-grid',
              start: 'top 85%',
            },
          }
        );
      }, containerRef);
    };

    initAnimations();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#050f1e]/50 border border-[#050f1e]/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#06b6d4] rounded-full" />
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#050f1e] mb-4">
            Ce Que Disent{' '}
            <span className="text-[#06b6d4]">Nos Clients</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            La confiance des entreprises au Mali et au-delà
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="testimonial-card group relative p-8 bg-gray-50 rounded-3xl border border-gray-100 cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-[#050f1e] flex items-center justify-center shadow-lg transition-transform duration-150 ease-out group-hover:scale-110 group-hover:rotate-3">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 pt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Client info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#050f1e] to-[#0a1a2e] flex items-center justify-center shadow-lg transition-transform duration-150 ease-out group-hover:scale-105">
                  <span className="text-white font-bold text-lg">
                    {getInitials(testimonial.name)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-[#050f1e] text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.company}</p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#06b6d4]/15 to-transparent rounded-br-3xl opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
