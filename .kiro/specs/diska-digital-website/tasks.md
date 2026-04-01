# Implementation Plan: Diska Digital Website

## Overview

Build a premium single-page marketing website for Diska Digital using Next.js 14+ (App Router), Tailwind CSS, shadcn/ui, Framer Motion, and Three.js. Implementation proceeds from foundational setup through core components, section-by-section build-out, animations, 3D integration, and final wiring.

## Tasks

- [x] 1. Project setup and foundational layer
  - [x] 1.1 Initialize Next.js 14+ project with TypeScript, Tailwind CSS, and install dependencies
    - Create Next.js app with App Router and TypeScript
    - Install dependencies: `tailwindcss`, `framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`
    - Initialize shadcn/ui and configure Tailwind with dark theme colors
    - Set up `globals.css` with Tailwind directives and custom CSS variables for the dark palette (near-black backgrounds, white/off-white text, gradient accents)
    - _Requirements: 13.1, 13.3, 13.4, 13.5_

  - [x] 1.2 Create shared TypeScript types and constants
    - Create `src/types/index.ts` with interfaces: `Service`, `ProcessStep`, `Project`, `Testimonial`, `NavLink`, `ContactFormData`, `ValidationErrors`, `ValidationResult`
    - Create `src/lib/constants.ts` with `NAV_LINKS`, `SERVICES`, `PROCESS_STEPS`, placeholder `PROJECTS`, and placeholder `TESTIMONIALS` data arrays
    - Create `src/lib/utils.ts` with `cn()` helper using `clsx` + `tailwind-merge`
    - _Requirements: 3.1, 5.1, 6.1, 7.1, 2.3_

  - [x] 1.3 Create validation logic for contact form
    - Create `src/lib/validators.ts` with `validateContactForm` and `isValidEmail` functions
    - `validateContactForm` checks all fields non-empty after trimming, validates email format
    - Returns `ValidationResult` with `isValid` boolean and field-specific error messages
    - _Requirements: 8.3, 8.4_

  - [ ]* 1.4 Write property tests for contact form validation
    - **Property 3: Contact form validation rejects invalid input**
    - **Property 4: Contact form validation accepts valid input**
    - **Property 5: Email validation correctness**
    - **Validates: Requirements 8.3, 8.4**

- [x] 2. Reusable UI components and custom hooks
  - [x] 2.1 Create custom hooks
    - Create `src/hooks/useMousePosition.ts` — tracks normalized mouse coordinates for 3D parallax
    - Create `src/hooks/useScrollSection.ts` — detects scroll past hero for navbar glassmorphism toggle
    - Create `src/hooks/useReducedMotion.ts` — reads `prefers-reduced-motion` media query
    - _Requirements: 1.6, 2.7, 11.4_

  - [x] 2.2 Create SectionWrapper component
    - Create `src/components/ui/SectionWrapper.tsx` with Framer Motion scroll-triggered fade-in
    - Uses `useInView` for viewport detection, `useReducedMotion` to disable animations when preferred
    - Supports optional `stagger` prop for staggered children animation
    - Animation: opacity 0→1, translateY 40px→0, duration 600ms, ease-out
    - _Requirements: 11.1, 11.3, 11.4_

  - [x] 2.3 Create GlassCard component
    - Create `src/components/ui/GlassCard.tsx` with glassmorphism styling
    - Tailwind classes: `bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl`
    - Hover animation: scale(1.02) + subtle glow box-shadow via Framer Motion
    - _Requirements: 13.2, 11.2_

  - [x] 2.4 Create AnimatedButton component
    - Create `src/components/ui/AnimatedButton.tsx` with hover micro-interactions (scale, glow)
    - Gradient accent styling consistent with design system
    - _Requirements: 11.2, 13.3_

- [x] 3. Checkpoint - Verify foundational layer
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Layout components — Navbar and Footer
  - [x] 4.1 Implement Navbar component
    - Create `src/components/layout/Navbar.tsx`
    - Fixed position with z-50, logo/wordmark on left, nav links on right
    - Glassmorphism background activates after scrolling past hero (via `useScrollSection`)
    - Smooth scroll on link click via `scrollIntoView({ behavior: 'smooth' })`
    - Mobile (<768px): hamburger icon toggles full-screen overlay menu with Framer Motion animation
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 4.2 Implement Footer component
    - Create `src/components/layout/Footer.tsx`
    - Company name/logo, navigation links (same as Navbar), social media icon links (Facebook, Instagram, LinkedIn, X)
    - Copyright notice with dynamic current year
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ]* 4.3 Write property test for Footer copyright year
    - **Property 6: Footer copyright year is always current**
    - **Validates: Requirements 9.4**

- [x] 5. Loading Screen and Hero Section
  - [x] 5.1 Implement LoadingScreen component
    - Create `src/components/ui/LoadingScreen.tsx`
    - Displays Diska Digital logo/wordmark with animated entrance (scale + fade)
    - Tracks document ready state via `useEffect`
    - Auto-dismisses after 3 seconds max via `setTimeout`
    - Fades out with Framer Motion `AnimatePresence`
    - _Requirements: 12.1, 12.2, 12.3_

  - [x] 5.2 Implement HeroSection component
    - Create `src/components/sections/HeroSection.tsx`
    - Full viewport height (`h-screen`), heading "We modernize your business" in large bold typography
    - Subtext "Web. IT. Design. Print." below heading
    - CTA button "Get Started" scrolls to `#contact`
    - Entrance animation: staggered fade-in + slide-up on heading, subtext, CTA
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.7_

- [x] 6. Three.js 3D elements and fallback
  - [x] 6.1 Implement Three.js canvas and floating shapes
    - Create `src/components/three/HeroCanvas.tsx` — R3F Canvas wrapper, dynamically imported with `next/dynamic` (ssr: false)
    - Create `src/components/three/FloatingShapes.tsx` — 3D scene with abstract floating shapes (spheres, tori, icosahedrons)
    - Create `src/components/three/MouseTracker.tsx` — reads mouse position from `useMousePosition` and applies subtle rotation to scene group
    - Integrate `HeroCanvas` as background of `HeroSection`
    - _Requirements: 1.5, 1.6, 10.1, 10.2, 10.3, 15.4_

  - [x] 6.2 Implement 3D fallback for mobile and non-WebGL devices
    - On mobile (<768px) or when WebGL is unavailable, render static gradient background or CSS animation instead of Three.js canvas
    - Wrap Three.js canvas in error boundary for graceful runtime error handling
    - _Requirements: 10.4_

- [x] 7. Content sections — Services, About, Process
  - [x] 7.1 Implement ServicesSection component
    - Create `src/components/sections/ServicesSection.tsx`
    - Grid layout: 4 cols desktop (>=1024px), 2 cols tablet (>=768px), 1 col mobile (<768px)
    - Each block: Lucide icon, title, description using GlassCard
    - Hover: scale + glow animation; staggered fade-in on scroll via SectionWrapper
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 7.2 Write property test for service block rendering
    - **Property 1: Service block rendering completeness**
    - **Validates: Requirements 3.2**

  - [x] 7.3 Implement AboutSection component
    - Create `src/components/sections/AboutSection.tsx`
    - Two-column layout: text left (heading + mission description), visual right (image/illustration)
    - Fade-in on scroll via SectionWrapper
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 7.4 Implement ProcessSection component
    - Create `src/components/sections/ProcessSection.tsx`
    - Four steps with timeline/connector visual: number badge, title, description
    - Desktop: horizontal timeline; Mobile: vertical timeline
    - Staggered entrance animation on scroll
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 7.5 Write property test for process step rendering
    - **Property 2: Process step rendering completeness**
    - **Validates: Requirements 5.2**

- [x] 8. Content sections — Portfolio, Testimonials, Contact
  - [x] 8.1 Implement PortfolioSection component
    - Create `src/components/sections/PortfolioSection.tsx`
    - Grid: 2 cols desktop (>=1024px), 1 col mobile (<768px)
    - Project cards: thumbnail (Next.js Image), title, category tag
    - Hover: scale + overlay reveal; staggered fade-in on scroll
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 8.2 Implement TestimonialsSection component
    - Create `src/components/sections/TestimonialsSection.tsx`
    - 3 testimonial cards in a row (desktop), stacked on mobile
    - Each card: avatar, client name, company, quote text using GlassCard
    - Fade-in on scroll
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 8.3 Implement ContactSection and ContactForm
    - Create `src/components/sections/ContactSection.tsx` — two-column layout: contact info left (WhatsApp, phone, email with icons), form right
    - Create `src/components/forms/ContactForm.tsx` — fields: fullName, email, subject, message
    - Client-side validation using `validators.ts`, inline error messages per field
    - Success state: shows confirmation message after valid submission
    - Fade-in on scroll via SectionWrapper
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [x] 9. Checkpoint - Verify all sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Animations, scroll behavior, and responsive polish
  - [x] 10.1 Wire scroll-triggered animations across all sections
    - Ensure every major section uses SectionWrapper for scroll-triggered fade-in
    - Verify staggered animations on Services, Process, Portfolio sections
    - Ensure all animation durations are between 200ms and 800ms with ease-out or spring easing
    - _Requirements: 11.1, 11.3_

  - [x] 10.2 Implement reduced motion support
    - Ensure `useReducedMotion` hook is consumed by SectionWrapper and all animated components
    - When `prefers-reduced-motion` is enabled, disable all motion animations (instant or absent transitions)
    - _Requirements: 11.4_

  - [ ]* 10.3 Write property tests for animation system
    - **Property 7: Animation durations are within bounds**
    - **Property 8: Reduced motion disables animations**
    - **Validates: Requirements 11.3, 11.4**

  - [x] 10.4 Implement smooth scroll and parallax
    - Apply smooth scroll behavior for all anchor-based navigation (Navbar links and CTA buttons)
    - Add parallax scrolling effect to at least one background element (3D scene or decorative layer)
    - _Requirements: 16.1, 16.2_

  - [x] 10.5 Responsive design verification and fixes
    - Verify layout at 320px, 768px, 1024px, and 1440px viewports
    - Ensure mobile-first CSS approach, minimum 16px body text, minimum 44x44px touch targets
    - Ensure no horizontal scrollbar at any supported viewport width
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [x] 11. Page composition and performance optimization
  - [x] 11.1 Compose HomePage and wire all sections together
    - Update `src/app/page.tsx` to compose LoadingScreen, Navbar, all sections, and Footer in order
    - Update `src/app/layout.tsx` with fonts (Inter or similar sans-serif via `next/font`), metadata, and providers
    - Manage loading screen state (visible until assets load or 3s timeout)
    - _Requirements: 12.2, 12.3_

  - [x] 11.2 Performance optimization
    - Lazy-load images and 3D assets below the fold using Next.js Image component and dynamic imports
    - Use `next/dynamic` for Three.js components to reduce initial bundle size
    - Ensure all raster images use Next.js Image component for automatic format optimization
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [ ] 12. Final checkpoint - Full integration verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All code uses TypeScript as specified in the design
