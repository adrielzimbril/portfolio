/**
 * Truncates text to a maximum length and adds ellipsis if needed
 *
 * @param text - The text to truncate
 * @param options - Configuration options
 * @param options.type - Type of truncation: 'char' for characters, 'word' for words (default: 'char')
 * @param options.maxLength - Maximum length before truncation (default: 40)
 *
 * @returns The truncated text with ellipsis if needed
 *
 * @example
 * truncateText("This is a very long text", { type: 'char', maxLength: 10 }) // returns "This is a..."
 * truncateText("This is a very long text", { type: 'word', maxLength: 3 }) // returns "This is a..."
 */
export function truncateText(
  text: string,
  options: { type?: "char" | "word"; maxLength?: number } = {},
): string {
  const { type = "char", maxLength = 40 } = options;

  if (type === "word") {
    const words = text.split(" ");
    if (words.length <= maxLength) return text;
    return words.slice(0, maxLength).join(" ") + "...";
  }

  // Default: character-based truncation
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
