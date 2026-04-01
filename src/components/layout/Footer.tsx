'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Globe, Camera, Briefcase, MessageCircle } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

/**
 * Footer component with company info, navigation links, and social media.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialButtonsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // GSAP social button animations
  useEffect(() => {
    let gsap: typeof import('gsap').default;

    const initGsap = async () => {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default;

      socialButtonsRef.current.forEach((button) => {
        if (!button) return;

        const handleMouseEnter = () => {
          gsap.to(button, {
            scale: 1.15,
            y: -3,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    initGsap();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialIcons = [
    { name: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: Globe },
    { name: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: Camera },
    { name: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: Briefcase },
    { name: 'X', href: SOCIAL_LINKS.twitter, Icon: MessageCircle },
  ];

  return (
    <footer className="bg-[#050f1e] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Diska Digital"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h3 className="text-lg font-bold text-white">
                Diska Digital
              </h3>
            </div>
            <p className="text-white/60 text-sm">
              Nous aidons les entreprises à devenir modernes, visibles et efficaces grâce à la technologie et au design.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Liens Rapides</h4>
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white/60 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Suivez-Nous</h4>
            <div className="flex space-x-4">
              {socialIcons.map(({ name, href, Icon }, index) => (
                <a
                  key={name}
                  ref={(el) => { socialButtonsRef.current[index] = el; }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors duration-200"
                  aria-label={`Suivez-nous sur ${name}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Diska Digital. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
