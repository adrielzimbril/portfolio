import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class names
 *
 * @param inputs - Array of class names
 * @returns A string of merged class names
 *
 * @example
 * cn("text-xl", "text-red-500");
 * // returns "text-xl text-red-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
