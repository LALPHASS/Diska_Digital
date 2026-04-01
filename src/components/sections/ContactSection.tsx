'use client';

import { useRef, useEffect } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { CONTACT_INFO } from '@/lib/constants';

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);

  const contactMethods = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: CONTACT_INFO.whatsapp,
      href: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}`,
      color: '#25D366',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`,
      color: '#06b6d4',
    },
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      color: '#0066cc',
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: CONTACT_INFO.address,
      href: null,
      color: '#8b5cf6',
    },
  ];

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
        // Contact cards animation
        gsap.fromTo('.contact-card',
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-cards',
              start: 'top 85%',
            },
          }
        );

        // Form container animation
        gsap.fromTo('.contact-form-container',
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-form-container',
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
      id="contact" 
      className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-[#050f1e] overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#06b6d4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0066cc]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full mb-6">
            <Send className="w-3 h-3" />
            Contactez-Nous
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Entrons en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#0066cc]">
              Contact
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Prêt à moderniser votre entreprise ? Commençons une conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
              Informations de Contact
            </h3>
            <p className="text-white/60 mb-8 text-lg">
              Contactez-nous via l&apos;un de ces canaux et nous vous répondrons
              dans les plus brefs délais.
            </p>

            <div className="contact-cards space-y-4">
              {contactMethods.map((method) => (
                <div 
                  key={method.label} 
                  className="contact-card group p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.label === 'WhatsApp' ? '_blank' : undefined}
                      rel={method.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-5"
                    >
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${method.color}20` }}
                      >
                        <method.icon className="w-6 h-6" style={{ color: method.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/40 text-sm mb-1">{method.label}</p>
                        <p className="text-white font-semibold text-lg group-hover:text-[#06b6d4] transition-colors">
                          {method.value}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-5">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${method.color}20` }}
                      >
                        <method.icon className="w-6 h-6" style={{ color: method.color }} />
                      </div>
                      <div>
                        <p className="text-white/40 text-sm mb-1">{method.label}</p>
                        <p className="text-white font-semibold text-lg">{method.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm mb-4">La confiance des entreprises au</p>
              <div className="flex flex-wrap gap-3">
                {['Mali', 'Sénégal', 'Côte d\'Ivoire', 'France'].map((country) => (
                  <span key={country} className="px-4 py-2 bg-white/5 rounded-full text-white/60 text-sm">
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <div className="relative">
              {/* Form card */}
              <div className="p-8 lg:p-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                  Envoyez-Nous un Message
                </h3>
                <p className="text-white/50 mb-8">
                  Remplissez le formulaire et nous vous répondrons sous 24 heures.
                </p>
                <ContactForm />
              </div>

              {/* Decorative corner */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#06b6d4]/20 rounded-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#0066cc]/20 rounded-xl blur-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
