/**
 * Format a price with the appropriate currency (F.CFA)
 */
export function formatPrice(
  amount: number,
  currency: string = "F.CFA",
): string {
  // Format the number with appropriate separators (comma for thousands)
  // Use "fr-FR" to format with spaces as thousand separators
  // And use "en-US" to format with commas as thousand separators
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formattedNumber} ${currency}`;
}

/**
 * Format a static price (alias for formatPrice)
 */
export function formatPriceStatic(
  amount: number,
  currency: string = "F.CFA",
): string {
  return formatPrice(amount, currency);
}
