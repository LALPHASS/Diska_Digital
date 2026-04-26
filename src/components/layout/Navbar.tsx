'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Processus', href: '#process' },
  { label: 'Réalisations', href: '#portfolio' },
];

// Sections with light/white backgrounds
const LIGHT_SECTIONS = ['services', 'testimonials'];

/**
 * Floating navbar with pill design
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnLightBg, setIsOnLightBg] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect if navbar is over a light background section
  useEffect(() => {
    const checkBackground = () => {
      const navbarY = 60; // Approximate navbar position from top
      
      for (const sectionId of LIGHT_SECTIONS) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= navbarY && rect.bottom >= navbarY) {
            setIsOnLightBg(true);
            return;
          }
        }
      }
      setIsOnLightBg(false);
    };

    window.addEventListener('scroll', checkBackground, { passive: true });
    checkBackground(); // Initial check

    return () => window.removeEventListener('scroll', checkBackground);
  }, []);

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
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
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
    <nav className="fixed top-4 left-4 right-4 z-50">
      {/* Desktop Navbar - Floating pill with glassmorphism */}
      <div className={cn(
        "hidden md:flex items-center justify-between max-w-4xl mx-auto px-2 py-2 backdrop-blur-xl rounded-full border transition-colors duration-300",
        isOnLightBg 
          ? "bg-[#050f1e]/80 border-[#050f1e]/20" 
          : "bg-white/5 border-white/10"
      )}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 pl-4 cursor-pointer"
        >
          <Image
            src="/logo.webp"
            alt="Diska Digital"
            width={24}
            height={24}
            className="w-5 h-5"
          />
          <span className="text-sm font-semibold text-white">
            Diska Digital
          </span>
        </a>

        {/* Center Navigation */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact Button */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="px-5 py-2 text-sm font-medium text-[#0a0a0a] bg-white rounded-full hover:bg-white/90 transition-colors duration-200 cursor-pointer"
        >
          Contact
        </a>
      </div>

      {/* Mobile Navbar */}
      <div className={cn(
        "md:hidden flex items-center justify-between px-4 py-3 backdrop-blur-xl rounded-full border transition-colors duration-300",
        isOnLightBg 
          ? "bg-[#050f1e]/80 border-[#050f1e]/20" 
          : "bg-white/5 border-white/10"
      )}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/logo.webp"
            alt="Diska Digital"
            width={24}
            height={24}
            className="w-5 h-5"
          />
          <span className="text-sm font-semibold text-white">
            Diska Digital
          </span>
        </a>

        {/* Menu Button */}
        <button
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-white/70 transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={cn(
              "md:hidden mt-2 mx-auto backdrop-blur-xl rounded-2xl border overflow-hidden",
              isOnLightBg 
                ? "bg-[#050f1e]/90 border-[#050f1e]/20" 
                : "bg-white/5 border-white/10"
            )}
            initial={prefersReducedMotion ? { opacity: 1 } : 'closed'}
            animate={prefersReducedMotion ? { opacity: 1 } : 'open'}
            exit={prefersReducedMotion ? { opacity: 0 } : 'closed'}
            variants={prefersReducedMotion ? undefined : menuVariants}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-col p-4 space-y-1">
              {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 text-base text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
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
