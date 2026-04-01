import type {
  ContactFormData,
  ValidationErrors,
  ValidationResult,
} from "@/types";

/**
 * Validates an email address format.
 * Returns true if the email contains exactly one @ separating
 * a non-empty local part and a non-empty domain part with at least one dot.
 */
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;

  // Basic email regex: local@domain.tld
  // Requires: non-empty local part, @, non-empty domain with at least one dot
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates contact form data.
 * Checks that all fields are non-empty after trimming and validates email format.
 * Returns a ValidationResult with isValid boolean and field-specific error messages.
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationErrors = {};

  // Validate full name
  if (!data.fullName.trim()) {
    errors.fullName = "Le nom complet est requis";
  }

  // Validate email
  if (!data.email.trim()) {
    errors.email = "L'email est requis";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Format d'email invalide";
  }

  // Validate subject
  if (!data.subject.trim()) {
    errors.subject = "Le sujet est requis";
  }

  // Validate message
  if (!data.message.trim()) {
    errors.message = "Le message est requis";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
