import type {
  NavLink,
  Service,
  ProcessStep,
  Project,
  Testimonial,
} from "@/types";

// Navigation links for Navbar and Footer
export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "À Propos", href: "#about" },
  { label: "Processus", href: "#process" },
  { label: "Réalisations", href: "#portfolio" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// Services offered by Diska Digital
export const SERVICES: Service[] = [
  {
    icon: "Globe",
    title: "Digital & Web",
    description:
      "Custom websites, web applications, and digital solutions that elevate your online presence and drive business growth.",
  },
  {
    icon: "Server",
    title: "IT & Maintenance",
    description:
      "Comprehensive IT support, system maintenance, and infrastructure management to keep your business running smoothly.",
  },
  {
    icon: "Printer",
    title: "Print & Communication",
    description:
      "Professional branding, graphic design, and print materials that communicate your message with impact.",
  },
  {
    icon: "Monitor",
    title: "IT Equipment",
    description:
      "Quality IT hardware and equipment sales with expert consultation to meet your technology needs.",
  },
];

// Process steps for client engagement
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Audit",
    description:
      "We analyze your current situation, identify opportunities, and understand your unique business needs.",
  },
  {
    number: 2,
    title: "Strategy",
    description:
      "We develop a tailored roadmap with clear objectives, timelines, and measurable outcomes.",
  },
  {
    number: 3,
    title: "Execution",
    description:
      "Our team brings the strategy to life with precision, creativity, and attention to detail.",
  },
  {
    number: 4,
    title: "Support",
    description:
      "We provide ongoing maintenance, updates, and support to ensure long-term success.",
  },
];

// Placeholder projects for Portfolio Section
export const PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    thumbnail: "/projects/ecommerce.jpg",
  },
  {
    title: "Corporate Rebrand",
    category: "Branding",
    thumbnail: "/projects/rebrand.jpg",
  },
  {
    title: "Network Infrastructure",
    category: "IT Services",
    thumbnail: "/projects/network.jpg",
  },
  {
    title: "Marketing Campaign",
    category: "Print & Design",
    thumbnail: "/projects/marketing.jpg",
  },
];

// Placeholder testimonials for Testimonials Section
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amadou Diallo",
    company: "TechMali Solutions",
    text: "Diska Digital a transformé notre présence en ligne. Leur équipe a livré un site web magnifique qui a dépassé nos attentes et nous a aidés à atteindre de nouveaux clients.",
    avatar: "/testimonials/avatar1.jpg",
  },
  {
    name: "Fatoumata Traoré",
    company: "Bamako Imports",
    text: "Professionnels, fiables et créatifs. L'infrastructure IT qu'ils ont mise en place pour notre entreprise fonctionne parfaitement depuis plus d'un an.",
    avatar: "/testimonials/avatar2.jpg",
  },
  {
    name: "Ibrahim Keita",
    company: "Sahel Enterprises",
    text: "Du branding aux supports imprimés, Diska Digital a tout géré avec une qualité exceptionnelle. Ils comprennent vraiment les besoins des entreprises modernes.",
    avatar: "/testimonials/avatar3.jpg",
  },
];

// Contact information
export const CONTACT_INFO = {
  whatsapp: "+223 77 75 19 03",
  phone: "+223 77 75 19 03",
  email: "contact@diskadigital.com",
  address: "Bamako, Mali",
};

// Social media links (placeholders)
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/diskadigital",
  instagram: "https://instagram.com/diskadigital",
  linkedin: "https://linkedin.com/company/diskadigital",
  twitter: "https://twitter.com/diskadigital",
};
