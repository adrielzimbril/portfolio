/**
 * Formate un prix avec la devise appropriée (F.CFA)
 */
export function formatPrice(
  amount: number,
  currency: string = "F.CFA",
): string {
  // Formater le nombre avec les séparateurs appropriés (espace pour les milliers)
  const formattedNumber = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formattedNumber} ${currency}`;
}

/**
 * Formate un prix statique (alias pour formatPrice)
 */
export function formatPriceStatic(
  amount: number,
  currency: string = "F.CFA",
): string {
  return formatPrice(amount, currency);
}
