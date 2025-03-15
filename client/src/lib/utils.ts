import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names or class value objects into a single string
 * Using tailwindcss utility for merging tailwind classes properly
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price string to a standardized format
 */
export function formatPrice(price: string): string {
  if (!price) return "";
  
  // If price is already in format like "$10" or "Starting at $85", return as is
  if (price.includes("$")) return price;
  
  // Try to parse and format number
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  
  return `$${num.toFixed(2)}`;
}

/**
 * Truncates text to a specified length and adds ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Creates a random ID for use when a unique identifier is needed
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounces a function to limit how often it can be called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Validates if a string is a valid email address
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validates if a string is a valid phone number (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

/**
 * Formats a date string to a localized format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Slugifies a string (converts to lowercase, replaces spaces with hyphens)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple hyphens with single hyphen
}
