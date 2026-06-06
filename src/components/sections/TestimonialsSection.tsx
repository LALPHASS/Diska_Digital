'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export function TestimonialsSection() {
  const containerRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white via-cyan-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-600 text-sm uppercase tracking-[0.2em] mb-4 block font-semibold">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Ce Que Disent{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Nos Clients
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mt-4">
            Découvrez les retours d&apos;expérience de nos clients satisfaits
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-cyan-200 cursor-default overflow-hidden"
              whileHover={{ y: -8 }}
            >
              {/* Decorative Background Quote */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 -mr-8 -mt-8 text-cyan-500 rotate-12">
                <Quote className="w-full h-full" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-slate-700 text-base leading-relaxed mb-8 font-normal">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center ring-2 ring-cyan-100 ring-offset-2 flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-cyan-600 text-sm font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 rounded-2xl pointer-events-none" />
            </motion.article>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
