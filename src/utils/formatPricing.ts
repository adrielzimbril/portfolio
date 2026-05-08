interface IPInfo {
  country?: string;
  currency?: string;
  countryCode?: string;
}

interface ExchangeRate {
  from: string;
  to: string;
  amount: number;
  date: string;
  info: {
    timestamp: number;
    rate: number;
  };
  result: number;
  result_formatted: string;
}

const IP_API_URL = "https://api.oricodes.com/ip";
const EXCHANGE_API_URL = "https://api.oricodes.com/exchange/convert";

// Cache pour éviter les appels API répétés
let ipInfoCache: IPInfo | null = null;
let exchangeRatesCache: Map<string, ExchangeRate> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let lastIPCheck = 0;

/**
 * Récupère les informations de l'utilisateur (pays, devise) basées sur son IP
 */
async function getIPInfo(): Promise<IPInfo> {
  const now = Date.now();

  // Utiliser le cache si disponible et pas expiré
  if (ipInfoCache && now - lastIPCheck < CACHE_DURATION) {
    return ipInfoCache;
  }

  try {
    const response = await fetch(IP_API_URL);
    const data = await response.json();

    ipInfoCache = {
      country: data.country,
      currency: data.currency,
      countryCode: data.countryCode,
    };
    lastIPCheck = now;

    return ipInfoCache;
  } catch (error) {
    console.error("Error fetching IP info:", error);
    return ipInfoCache || {};
  }
}

/**
 * Convertit un montant d'une devise à une autre
 */
async function convertCurrency(
  from: string,
  to: string,
  amount: number,
): Promise<ExchangeRate | null> {
  if (from === to) {
    return {
      from,
      to,
      amount,
      date: new Date().toISOString().split("T")[0],
      info: { timestamp: Date.now(), rate: 1 },
      result: amount,
      result_formatted: formatPrice(amount, from),
    };
  }

  const cacheKey = `${from}-${to}-${amount}`;

  // Vérifier le cache
  if (exchangeRatesCache.has(cacheKey)) {
    const cached = exchangeRatesCache.get(cacheKey)!;
    const cacheAge = Date.now() - cached.info.timestamp * 1000;
    if (cacheAge < CACHE_DURATION) {
      return cached;
    }
  }

  try {
    const response = await fetch(
      `${EXCHANGE_API_URL}?from=${from}&to=${to}&amount=${amount}`,
    );
    const data = await response.json();

    exchangeRatesCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error converting currency:", error);
    return null;
  }
}

/**
 * Formate un prix avec la devise appropriée
 */
function formatPrice(amount: number, currency: string): string {
  const currencyMap: Record<
    string,
    { symbol: string; position: "before" | "after"; locale: string }
  > = {
    XOF: { symbol: "F.CFA", position: "after", locale: "fr-FR" },
    F_CFA: { symbol: "F.CFA", position: "after", locale: "fr-FR" },
    USD: { symbol: "$", position: "before", locale: "en-US" },
    EUR: { symbol: "€", position: "after", locale: "fr-FR" },
    GBP: { symbol: "£", position: "before", locale: "en-GB" },
    CAD: { symbol: "$", position: "before", locale: "en-CA" },
    CHF: { symbol: "CHF", position: "before", locale: "de-CH" },
    JPY: { symbol: "¥", position: "before", locale: "ja-JP" },
    CNY: { symbol: "¥", position: "before", locale: "zh-CN" },
    INR: { symbol: "₹", position: "before", locale: "en-IN" },
    AUD: { symbol: "$", position: "before", locale: "en-AU" },
  };

  const config = currencyMap[currency] || {
    symbol: currency,
    position: "after",
    locale: "en-US",
  };

  // Formater le nombre avec les séparateurs appropriés
  const formattedNumber = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  if (config.position === "before") {
    return `${config.symbol}${formattedNumber}`;
  } else {
    return `${formattedNumber} ${config.symbol}`;
  }
}

/**
 * Formate le prix en fonction de la devise de l'utilisateur
 * Convertit automatiquement depuis XOF/F.CFA si nécessaire
 */
export async function formatPricingForUser(
  baseAmount: number,
  baseCurrency: string = "XOF",
): Promise<{ price: string; currency: string; originalPrice: string }> {
  const ipInfo = await getIPInfo();
  const userCurrency = ipInfo.currency.code || "XOF";

  // Normaliser la devise de base
  const normalizedBaseCurrency = baseCurrency.replace(".", "_");

  // Si la devise de l'utilisateur est la même que la devise de base
  if (userCurrency === normalizedBaseCurrency) {
    return {
      price: formatPrice(baseAmount, normalizedBaseCurrency),
      currency: normalizedBaseCurrency,
      originalPrice: formatPrice(baseAmount, normalizedBaseCurrency),
    };
  }

  // Convertir la devise
  const converted = await convertCurrency(
    normalizedBaseCurrency,
    userCurrency,
    baseAmount,
  );

  if (converted && converted.result_formatted) {
    return {
      price: converted.result_formatted,
      currency: userCurrency,
      originalPrice: formatPrice(baseAmount, normalizedBaseCurrency),
    };
  }

  // Fallback: utiliser la devise de base
  return {
    price: formatPrice(baseAmount, normalizedBaseCurrency),
    currency: normalizedBaseCurrency,
    originalPrice: formatPrice(baseAmount, normalizedBaseCurrency),
  };
}

/**
 * Formate un prix sans conversion (pour utilisation côté serveur ou statique)
 */
export function formatPriceStatic(
  amount: number,
  currency: string = "XOF",
): string {
  return formatPrice(amount, currency.replace(".", "_"));
}
