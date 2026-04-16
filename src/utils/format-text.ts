/**
 * Truncates text to a maximum length and adds ellipsis if needed
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation (default: 40)
 *
 * @returns The truncated text with ellipsis if needed
 *
 * @example
 * truncateText("This is a very long text", 10) // returns "This is a..."
 */
export function truncateText(text: string, maxLength: number = 40): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
