export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRange(value: number, min: number, max: number): ValidationResult {
  const errors: string[] = [];
  if (value < min) errors.push(`Value ${value} is below minimum ${min}`);
  if (value > max) errors.push(`Value ${value} is above maximum ${max}`);
  return { valid: errors.length === 0, errors };
}

export function validateRequired(fields: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined || value === '') {
      errors.push(`${key} is required`);
    }
  }
  return { valid: errors.length === 0, errors };
}
