import { z } from "zod";

// 🎯 Schémas Zod pour validation et typage automatique
const TimezoneSchema = z.object({
  zoneName: z.string(),
  gmtOffset: z.number(),
  gmtOffsetName: z.string(),
  abbreviation: z.string(),
  tzName: z.string(),
});

const CurrencyInfoSchema = z.object({
  name: z.string(),
  alt_name: z.string().optional(),
  minor_unit: z.number().optional(),
  numeric: z.number().optional(),
  code: z.string(),
  symbol: z.string(),
});

const LanguageSchema = z.object({
  code: z.string(),
  name: z.string(),
  native: z.string(),
  direction: z.string(),
});

const CountrySchema = z.object({
  name: z.string(),
  iso2: z.string(),
  iso3: z.string(),
  iso_numeric: z.string().optional(),
  capital: z.string(),
  continent: z.string(),
  tld: z.string(),
  tld_extra: z.array(z.string()).optional(),
  currency: CurrencyInfoSchema,
  phone: z.string(),
  phone_codes: z.string(),
  phone_extra: z
    .object({
      calling_code: z.array(z.string()),
      national_prefix: z.string(),
      international_prefix: z.string(),
      national_number_lengths: z.array(z.number()),
      national_destination_code_lengths: z.array(z.number()),
    })
    .optional(),
  flag: z.string(),
  flag_emoji: z.string(),
  flag_emoji_unicode: z.string(),
  language: LanguageSchema,
  languages: z.record(z.string(), z.string()).optional(),
  alt_spellings: z.array(z.string()).optional(),
  translations: z.record(z.string(), z.string()).optional(),
  timezones: z.array(TimezoneSchema).optional(),
  extras: z.record(z.string(), z.any()).optional(),
});

const ContinentSchema = z.object({
  name: z.string(),
  translations: z.record(z.string(), z.string()).optional(),
});

const SubRegionSchema = z.object({
  name: z.string(),
  translations: z.record(z.string(), z.string()).optional(),
});

const SimpleTimezoneSchema = z.object({
  rate: z.string(),
  name: z.string(),
  current_time: z.string(),
  code: z.string(),
  gmt_offset: z.number(),
  is_dst: z.boolean(),
});

const ConnectionSchema = z.object({
  asn: z.string(),
  isp: z.string(),
});

const SimpleCurrencySchema = z.object({
  code: z.string(),
  symbol: z.string(),
  symbol_global: z.string().optional(),
  symbol_native: z.string().optional(),
  symbol_alias: z.string().optional(),
  name: z.string(),
  name_single: z.string().optional(),
  name_plural: z.string().optional(),
});

// 🌍 Schema principal pour la réponse complète
const IpInfoResponseSchema = z.object({
  ip: z.string(),
  type: z.string(),
  continent_name: z.string().optional(),
  country_code: z.string(),
  country_name: z.string(),
  region_name: z.string().optional(),
  city: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  zip: z.string().optional(),
  country: CountrySchema,
  currency: SimpleCurrencySchema,
  continent: ContinentSchema,
  sub_region: SubRegionSchema.optional(),
  timezone: SimpleTimezoneSchema,
  connection: ConnectionSchema,
});

// 🎯 Type TypeScript inféré automatiquement
export type IpInfoResponse = z.infer<typeof IpInfoResponseSchema>;

// 📊 Types simplifiés pour usage facile
export interface IpInfoSummary {
  ip: string;
  location: string; // "City, Country"
  country: {
    name: string;
    code: string;
    flag: string;
  };
  timezone: {
    name: string;
    offset: string;
    current_time: string;
  };
  isp: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface GetIpInfoOptions {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
  strictValidation?: boolean;
  simplified?: boolean;
}

interface IpInfoResult<T = IpInfoResponse> {
  data: T | null;
  error: string | null;
  isValid: boolean;
  validationErrors?: z.ZodError;
}

// 🔧 Fonction pour transformer en format simplifié
function transformToSummary(data: IpInfoResponse): IpInfoSummary {
  const location = [data.city, data.country_name].filter(Boolean).join(", ");

  return {
    ip: data.ip,
    location,
    country: {
      name: data.country_name,
      code: data.country_code,
      flag: data.country.flag_emoji,
    },
    timezone: {
      name: data.timezone.name,
      offset: data.timezone.rate,
      current_time: data.timezone.current_time,
    },
    isp: data.connection.isp,
    coordinates:
      data.latitude && data.longitude
        ? {
            lat: data.latitude,
            lng: data.longitude,
          }
        : undefined,
  };
}

// 🕐 Helper pour délais
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fonction SERVER-SIDE pour récupérer les informations d'une adresse IP
 *
 * @param ip - L'adresse IP à rechercher (optionnel, utilise l'IP publique si non fournie)
 * @param options - Options de configuration
 *
 * @returns Promesse avec les données, erreur et statut de validation
 *
 * @example
 * // Usage basique
 * const result = await getIpInfo('8.8.8.8');
 * if (result.data) {
 *   console.log(result.data.country_name);
 * }
 *
 * // Usage avec options
 * const result = await getIpInfo('8.8.8.8', {
 *   timeout: 15000,
 *   retryCount: 3,
 *   simplified: true
 * });
 *
 * // Dans un Server Component
 * export default async function Page() {
 *   const ipResult = await getIpInfo();
 *   return <div>{ipResult.data?.country_name}</div>;
 * }
 *
 * // Dans une Server Action
 * 'use server';
 * export async function getLocationAction(ip: string) {
 *   const result = await getIpInfo(ip, { simplified: true });
 *   return result.data?.location;
 * }
 */
export async function useIpInfo<T = IpInfoResponse>(
  ip?: string,
  options: GetIpInfoOptions = {}
): Promise<IpInfoResult<T>> {
  const {
    timeout = 10000,
    retryCount = 2,
    retryDelay = 1000,
    strictValidation = true,
    simplified = false,
  } = options;

  try {
    // 🌐 Construire l'URL
    const baseUrl = "https://api.oricodes.com/ip";
    const url = ip ? `${baseUrl}/${ip}` : baseUrl;

    // 🔄 Logique de retry
    let lastError: Error;
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        // ⏰ Controller pour timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // 🔧 Configuration pour Next.js
          next: { revalidate: 300 }, // Cache 5min
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }

        const rawResult = await response.json();

        // 🔍 Validation avec Zod
        try {
          const validatedData = IpInfoResponseSchema.parse(rawResult);

          // 🎯 Transformation si demandée
          const finalData = simplified
            ? (transformToSummary(validatedData) as T)
            : (validatedData as T);

          return {
            data: finalData,
            error: null,
            isValid: true,
          };
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            if (strictValidation) {
              return {
                data: null,
                error: `Données invalides: ${(validationError as any).errors
                  .map((e: any) => e.message)
                  .join(", ")}`,
                isValid: false,
                validationErrors: validationError,
              };
            } else {
              // Mode permissif : retourner les données brutes
              console.warn(
                "Validation échouée, utilisation des données brutes:",
                (validationError as any).errors
              );
              const finalData =
                simplified && rawResult
                  ? (transformToSummary(rawResult) as T)
                  : (rawResult as T);

              return {
                data: finalData,
                error: null,
                isValid: false,
                validationErrors: validationError,
              };
            }
          }
          throw validationError;
        }
      } catch (err) {
        lastError = err as Error;

        // 🚫 Pas de retry pour les erreurs d'abort (timeout)
        if (err instanceof Error && err.name === "AbortError") {
          throw new Error(`Timeout: La requête a pris plus de ${timeout}ms`);
        }

        // ⏳ Attendre avant le prochain essai (sauf pour le dernier)
        if (attempt < retryCount) {
          await sleep(retryDelay);
        }
      }
    }

    // 💥 Si tous les essais ont échoué
    throw lastError!;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue est survenue";

    console.error("Erreur lors de la récupération des infos IP:", error);

    return {
      data: null,
      error: errorMessage,
      isValid: false,
    };
  }
}

// 🎁 Fonctions utilitaires spécialisées

/**
 * Récupère les infos d'une IP (côté serveur)
 */
export async function useGetIpInfo(ip?: string, simplified: boolean = false) {
  return simplified
    ? await useIpInfo<IpInfoSummary>(ip, { simplified: true })
    : await useIpInfo(ip);
}

/**
 * Valide une adresse IP (format basique)
 */
export function isValidIpAddress(ip: string): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}
