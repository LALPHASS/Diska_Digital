'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 200 : -200, opacity: 0 }),
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-600 text-sm uppercase tracking-[0.2em] mb-4 block">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#050f1e]">
            Ce Que Disent <span className="text-cyan-500">Nos Clients</span>
          </h2>
        </motion.div>

        {/* Testimonial */}
        <div className="relative min-h-[300px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-[#050f1e] leading-relaxed mb-8 font-light">
                &ldquo;{activeTestimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold">{getInitials(activeTestimonial.name)}</span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-[#050f1e]">{activeTestimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{activeTestimonial.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5 text-[#050f1e]" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? 'bg-cyan-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5 text-[#050f1e]" />
          </button>
        </div>
      </div>
    </section>
  );
}
