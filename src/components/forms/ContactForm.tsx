'use client';

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateContactForm } from '@/lib/validators';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ContactFormData, ValidationErrors } from '@/types';

/**
 * Contact form component with client-side validation.
 * 
 * Validates: Requirements 8.2, 8.3, 8.4, 8.5
 * - 8.2: Input fields for fullName, email, subject, message
 * - 8.3: Validates all fields non-empty and email format
 * - 8.4: Inline validation error messages per field
 * - 8.5: Success confirmation message after valid submission
 */
export function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GSAP button animations
  useEffect(() => {
    if (prefersReducedMotion || !submitButtonRef.current) return;

    let gsap: typeof import('gsap').default;

    const initGsap = async () => {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default;

      const button = submitButtonRef.current;
      if (!button) return;

      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (shineRef.current) {
          gsap.fromTo(shineRef.current,
            { x: '-100%', opacity: 0.5 },
            { x: '200%', opacity: 0, duration: 0.7, ease: 'power2.inOut' }
          );
        }
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseDown = () => {
        gsap.to(button, {
          scale: 0.98,
          duration: 0.1,
          ease: 'power2.out',
        });
      };

      const handleMouseUp = () => {
        gsap.to(button, {
          scale: 1.02,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
      button.addEventListener('mousedown', handleMouseDown);
      button.addEventListener('mouseup', handleMouseUp);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('mousedown', handleMouseDown);
        button.removeEventListener('mouseup', handleMouseUp);
      };
    };

    initGsap();
  }, [prefersReducedMotion]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const result = validateContactForm(formData);
    
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Message Envoyé !</h3>
        <p className="text-white/60">
          Merci de nous avoir contactés. Nous vous répondrons bientôt.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-white">
          Nom Complet
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#002B5B]/50 transition-colors ${
            errors.fullName ? 'border-red-500/50' : 'border-white/10'
          }`}
          placeholder="Jean Dupont"
        />
        <AnimatePresence>
          {errors.fullName && (
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="text-red-400 text-sm mt-1"
            >
              {errors.fullName}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
          Adresse Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#002B5B]/50 transition-colors ${
            errors.email ? 'border-red-500/50' : 'border-white/10'
          }`}
          placeholder="john@example.com"
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="text-red-400 text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white">
          Sujet
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#002B5B]/50 transition-colors ${
            errors.subject ? 'border-red-500/50' : 'border-white/10'
          }`}
          placeholder="Comment pouvons-nous vous aider ?"
        />
        <AnimatePresence>
          {errors.subject && (
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="text-red-400 text-sm mt-1"
            >
              {errors.subject}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#002B5B]/50 transition-colors resize-none ${
            errors.message ? 'border-red-500/50' : 'border-white/10'
          }`}
          placeholder="Parlez-nous de votre projet..."
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="text-red-400 text-sm mt-1"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <button
        ref={submitButtonRef}
        type="submit"
        disabled={isSubmitting}
        className="relative w-full py-4 px-6 text-white font-semibold rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      >
        {/* Gradient background - unified style */}
        <span className="absolute inset-0 bg-gradient-to-r from-[#050f1e] via-[#0a2540] to-[#06b6d4] rounded-xl" />
        
        {/* Glow effect */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#06b6d4]/30 blur-xl pointer-events-none rounded-xl" />
        
        {/* Shine effect */}
        <span className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
          <span 
            ref={shineRef}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 -translate-x-full"
          />
        </span>
        
        <span className="relative z-10 flex items-center gap-2">
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Envoyer le Message
            </>
          )}
        </span>
      </button>
    </form>
  );
}
