'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Brand } from '@/components/ui/Brand';
import { useReducedMotion } from '@/hooks/useReducedMotion';
const links = [{
  label: 'Notre univers',
  href: '#portfolio'
}, {
  label: 'Expertises',
  href: '#services'
}, {
  label: 'Le studio',
  href: '#about'
}];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#hero');
  const reduced = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
    const observer = new IntersectionObserver(entries => {
      const current = entries.find(entry => entry.isIntersecting);
      if (current) setActive(`#${current.target.id}`);
    }, { rootMargin: '-20% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    const previousInert = background.map(element => element.inert);
    background.forEach(element => {
      element.inert = true;
    });
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (event.key !== 'Tab') return;
      const items = [menuButton.current, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);
  return <header className="site-header">
    <div className="header-inner shell">
      <a href="#hero" aria-label="Diska Digital, accueil" className="brand-link" onClick={() => setOpen(false)}>
        <Brand />
      </a>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {links.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? 'location' : undefined}>
          {link.label}
        </a>)}
      </nav>
      <a href="#contact" className="header-cta" onClick={() => setOpen(false)}>
        Un projet en tête ?
        <ArrowUpRight size={18} />
      </a>
      <button className="menu-toggle" ref={menuButton} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
    </div>
    <AnimatePresence initial={false}>
    {open && <motion.div key="navigation" id="mobile-navigation" className="mobile-menu" ref={menu}
      initial={{ clipPath: reduced ? 'inset(0)' : 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: reduced ? 0 : 0.45, ease: [0.76, 0, 0.24, 1] }}>
      <span className="eyebrow">Bienvenue dans notre univers</span>
      <nav aria-label="Navigation mobile">
        {[...links, {
          label: 'Parlons de votre projet',
          href: '#contact'
        }].map((link, i) => <motion.a key={link.href} href={link.href} onClick={() => setOpen(false)}
          aria-current={active === link.href ? 'location' : undefined}
          initial={reduced ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.12 + i * 0.06 }}>
          <span className="mono">
            0
            {i + 1}
          </span>
          {link.label}
          <ArrowUpRight />
        </motion.a>)}
      </nav>
      <span className="mobile-menu-location">Bamako, Mali. Des idées sans frontières.</span>
    </motion.div>}
    </AnimatePresence>
  </header>;
}
