// Service type for the Services Section
export interface Service {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

// Process step type for the Process Section
export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

// Project type for the Portfolio Section
export interface Project {
  title: string;
  category: string;
  thumbnail: string; // Image path
}

// Testimonial type for the Testimonials Section
export interface Testimonial {
  name: string;
  company: string;
  text: string;
  avatar: string; // Image path
}

// Navigation link type for Navbar and Footer
export interface NavLink {
  label: string;
  href: string; // e.g., "#services"
}

// Contact form data type
export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

// Validation errors for contact form
export interface ValidationErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Validation result returned by validateContactForm
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}
