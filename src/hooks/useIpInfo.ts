import { z } from "zod";
import logger from "@/utils/logger";

// 🎯 Zod schemas for validation and automatic typing
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
      calling_code: z.array(z.string()).nullable().optional(),
      national_prefix: z.string().nullable().optional(),
      international_prefix: z.string().nullable().optional(),
      national_number_lengths: z.array(z.number()).nullable().optional(),
      national_destination_code_lengths: z
        .array(z.number())
        .nullable()
        .optional(),
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

// 🌍 Main schema for the complete response
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

// 🎯 Type TypeScript inferred automatically
export type IpInfoResponse = z.infer<typeof IpInfoResponseSchema>;

// 📊 Simplified types for easy usage
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

// 🔧 Function to transform to simplified format
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

// 🕐 Helper for delays
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * SERVER-SIDE function to retrieve information about an IP address
 *
 * @param ip - The IP address to search for (optional, uses public IP if not provided)
 * @param options - Configuration options
 *
 * @returns Promise with data, error and validation status
 *
 * @example
 * // Basic usage
 * const result = await getIpInfo('8.8.8.8');
 * if (result.data) {
 *   logger.info(result.data.country_name);
 * }
 *
 * // Usage with options
 * const result = await getIpInfo('8.8.8.8', {
 *   timeout: 15000,
 *   retryCount: 3,
 *   simplified: true
 * });
 *
 * // In a Server Component
 * export default async function Page() {
 *   const ipResult = await getIpInfo();
 *   return <div>{ipResult.data?.country_name}</div>;
 * }
 *
 * // In a Server Action
 * 'use server';
 * export async function getLocationAction(ip: string) {
 *   const result = await getIpInfo(ip, { simplified: true });
 *   return result.data?.location;
 * }
 */
export async function getIpInfo<T = IpInfoResponse>(
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
    // Build the URL
    const baseUrl = "https://api.oricodes.com/ip";
    const url = ip ? `${baseUrl}/${ip}` : baseUrl;

    // Retry logic
    let lastError: Error;
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        // Timeout controller
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // Configuration for Next.js
          next: { revalidate: 300 }, // Cache 5min
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }
        const rawResult = await response.json();

        // 🔍 Validation with Zod
        try {
          const validatedData = IpInfoResponseSchema.parse(rawResult);

          // 🎯 Transformation if requested
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
                error: `Données invalides: ${JSON.stringify(
                  (validationError as any).errors
                )}`,
                isValid: false,
                validationErrors: validationError,
              };
            } else {
              // Permissive mode : use raw data
              logger.warn(
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

        // 🚫 No retry for abort errors (timeout)
        if (err instanceof Error && err.name === "AbortError") {
          throw new Error(`Timeout: La requête a pris plus de ${timeout}ms`);
        }

        // ⏳ Wait before next attempt (except last one)
        if (attempt < retryCount) {
          await sleep(retryDelay);
        }
      }
    }

    // 💥 If all attempts failed
    throw lastError!;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Une erreur inconnue est survenue";

    logger.error("Erreur lors de la récupération des infos IP:", error);

    return {
      data: null,
      error: errorMessage,
      isValid: false,
    };
  }
}

// 🎁 Specialized utility functions

/**
 * Retrieves IP information (server-side)
 */
export async function useGetIpInfo(ip?: string, simplified: boolean = false) {
  return simplified
    ? await getIpInfo<IpInfoSummary>(ip, { simplified: true })
    : await getIpInfo(ip);
}

/**
 * Validates an IP address (basic format)
 */
export function isValidIpAddress(ip: string): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}