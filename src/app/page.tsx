'use client';

import { useState } from 'react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

/**
 * HomePage - Composes all sections together for the Diska Digital website
 */
export default function Home() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  return (
    <>
      {/* Loading screen - waits for Spline 3D to load */}
      <LoadingScreen isSplineLoaded={isSplineLoaded} />
      
      {/* Sticky navigation bar with glassmorphism effect */}
      <Navbar />
      
      {/* Main content area containing all sections */}
      <main className="flex flex-col">
        <HeroSection onSplineLoad={handleSplineLoad} />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      {/* Footer with company info, navigation, and social links */}
      <Footer />
    </>
  );
}
