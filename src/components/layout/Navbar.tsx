'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollSection } from '@/hooks/useScrollSection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

const CENTER_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Processus', href: '#process' },
  { label: 'Réalisations', href: '#portfolio' },
];

/**
 * Sticky navigation bar with glassmorphism effect and mobile menu.
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isPastHero } = useScrollSection();
  const prefersReducedMotion = useReducedMotion();
  const contactBtnRef = useRef<HTMLAnchorElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  // GSAP button animation
  useEffect(() => {
    if (prefersReducedMotion || !contactBtnRef.current) return;

    let gsap: typeof import('gsap').default;

    const initGsap = async () => {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default;

      const button = contactBtnRef.current;
      if (!button) return;

      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (shineRef.current) {
          gsap.fromTo(shineRef.current,
            { x: '-100%', opacity: 0.5 },
            { x: '200%', opacity: 0, duration: 0.6, ease: 'power2.inOut' }
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
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out',
        });
      };

      const handleMouseUp = () => {
        gsap.to(button, {
          scale: 1.05,
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isMobileMenuOpen
          ? 'bg-[#050f1e] border-b border-white/10'
          : isPastHero
            ? 'bg-[#050f1e]/95 backdrop-blur-lg border-b border-white/10 shadow-lg'
            : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.webp"
              alt="Diska Digital"
              width={32}
              height={32}
              className="w-6 h-6 md:w-8 md:h-8"
            />
            <span className="text-base md:text-lg font-bold text-white">
              Diska Digital
            </span>
          </a>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            {CENTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="transition-colors duration-200 text-sm text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact Button - Right (Desktop) */}
          <a
            ref={contactBtnRef}
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm text-white font-semibold rounded-full overflow-hidden relative group transition-colors duration-300"
          >
            {/* Gradient background - unified style */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#050f1e] via-[#0a2540] to-[#06b6d4]" />
            {/* Glow effect */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#06b6d4]/30 blur-xl pointer-events-none" />
            {/* Shine effect */}
            <span className="absolute inset-0 overflow-hidden pointer-events-none">
              <span 
                ref={shineRef}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 -translate-x-full"
              />
            </span>
            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              <span>Contact</span>
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors text-white hover:text-white/70"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-[#050f1e]/95 backdrop-blur-lg md:hidden"
            initial={prefersReducedMotion ? { opacity: 1 } : 'closed'}
            animate={prefersReducedMotion ? { opacity: 1 } : 'open'}
            exit={prefersReducedMotion ? { opacity: 0 } : 'closed'}
            variants={prefersReducedMotion ? undefined : menuVariants}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
              {[...CENTER_LINKS, { label: 'Contact', href: '#contact' }].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-medium text-white hover:text-[#06b6d4] transition-colors"
                  custom={i}
                  initial={prefersReducedMotion ? { opacity: 1 } : 'closed'}
                  animate={prefersReducedMotion ? { opacity: 1 } : 'open'}
                  variants={prefersReducedMotion ? undefined : linkVariants}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
