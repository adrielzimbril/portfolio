/**
 * Format a price with the appropriate currency (F.CFA)
 */
export function formatPrice(
  amount: number,
  currency: string = "F.CFA",
  float: boolean = false,
): string {
  // Format the number with appropriate separators (comma for thousands)
  // Use "fr-FR" to format with spaces as thousand separators
  // And use "en-US" to format with commas as thousand separators
  function smartRound(value: number) {
    if (value >= 10000) {
      return Math.round(value / 10000) * 10000;
    }

    if (value >= 1000) {
      return Math.round(value / 100) * 100;
    }

    return value;
  }

  const rounded = smartRound(amount);

  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(float ? rounded : amount);

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
