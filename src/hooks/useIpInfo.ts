"use client";
import logger from "@/utils/logger";
import { useState, useEffect, useCallback } from "react";
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
  languages: z.record(z.string(), z.any()).optional(),
  alt_spellings: z.array(z.string()).optional(),
  translations: z.record(z.string(), z.any()).optional(),
  timezones: z.array(TimezoneSchema).optional(),
  extras: z.record(z.any(), z.any()).optional(),
});

const ContinentSchema = z.object({
  name: z.string(),
  translations: z.record(z.string(), z.any()).optional(),
});

const SubRegionSchema = z.object({
  name: z.string(),
  translations: z.record(z.string(), z.any()).optional(),
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

interface UseIpInfoOptions {
  autoFetch?: boolean;
  enableCache?: boolean;
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
  // 🆕 Validation stricte avec Zod
  strictValidation?: boolean;
  // 🆕 Transformation en format simplifié
  simplified?: boolean;
}

interface UseIpInfoReturn<T = IpInfoResponse> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchIpInfo: (ip?: string) => Promise<void>;
  refetch: () => Promise<void>;
  reset: () => void;
  lastSearchedIp: string | null;
  // 🆕 Données validées et sûres
  isValidData: boolean;
  // 🆕 Erreurs de validation
  validationErrors: z.ZodError | null;
}

// 💾 Cache avec TTL
const ipInfoCache = new Map<
  string,
  { data: any; timestamp: number; validated: boolean }
>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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

/**
 * Hook avancé pour récupérer les informations d'une adresse IP avec validation Zod
 *
 * @param initialIp - L'adresse IP à rechercher
 * @param options - Options de configuration
 *
 * @example
 * // Usage basique avec validation
 * const { data, loading, error, isValidData } = useIpInfo('8.8.8.8', {
 *   autoFetch: true,
 *   strictValidation: true
 * });
 *
 * // Format simplifié
 * const { data } = useIpInfo<IpInfoSummary>('8.8.8.8', {
 *   autoFetch: true,
 *   simplified: true
 * });
 */
export function useIpInfo<T = IpInfoResponse>(
  initialIp: string | null = null,
  options: UseIpInfoOptions = {}
): UseIpInfoReturn<T> {
  const {
    autoFetch = false,
    enableCache = true,
    timeout = 10000,
    retryCount = 2,
    retryDelay = 1000,
    strictValidation = true,
    simplified = false,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedIp, setLastSearchedIp] = useState<string | null>(
    initialIp
  );
  const [isValidData, setIsValidData] = useState(false);
  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(
    null
  );

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const validateAndTransformData = useCallback(
    (rawData: any): T | null => {
      try {
        // 🔍 Validation avec Zod
        const validatedData = IpInfoResponseSchema.parse(rawData);
        setIsValidData(true);
        setValidationErrors(null);

        // 🎯 Transformation si demandée
        if (simplified) {
          return transformToSummary(validatedData) as T;
        }

        return validatedData as T;
      } catch (err: any) {
        if (err instanceof z.ZodError) {
          setValidationErrors(err);
          setIsValidData(false);

          if (strictValidation) {
            logger.error("Erreurs de validation:", (err as any).errors);
            throw new Error(
              `Données invalides: ${(err as any).errors
                .map((e: any) => e.message)
                .join(", ")}`
            );
          } else {
            // Mode permissif : retourner les données brutes
            logger.warn(
              "Validation échouée, utilisation des données brutes:",
              (err as any).errors
            );
            return rawData as T;
          }
        }
        throw err;
      }
    },
    [strictValidation, simplified]
  );

  const fetchIpInfo = useCallback(
    async (ip?: string): Promise<void> => {
      const targetIp = ip || initialIp;
      const cacheKey = targetIp || "current-ip";

      try {
        setLoading(true);
        setError(null);
        setValidationErrors(null);
        setLastSearchedIp(targetIp);

        // 💾 Vérifier le cache
        if (enableCache && ipInfoCache.has(cacheKey)) {
          const cached = ipInfoCache.get(cacheKey)!;
          const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;

          if (!isExpired) {
            const processedData = validateAndTransformData(cached.data);
            if (processedData) {
              setData(processedData);
              setLoading(false);
              return;
            }
          } else {
            ipInfoCache.delete(cacheKey);
          }
        }

        // 🌐 Requête API
        const baseUrl = "https://api.oricodes.com/ip";
        const url = targetIp ? `${baseUrl}/${targetIp}` : baseUrl;

        let lastError: Error;
        for (let attempt = 0; attempt <= retryCount; attempt++) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, {
              signal: controller.signal,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
              throw new Error(
                `HTTP Error: ${response.status} ${response.statusText}`
              );
            }

            const rawResult = await response.json();

            // 🔍 Validation et transformation
            const processedData = validateAndTransformData(rawResult);

            if (processedData) {
              // 💾 Mise en cache
              if (enableCache) {
                ipInfoCache.set(cacheKey, {
                  data: rawResult,
                  timestamp: Date.now(),
                  validated: isValidData,
                });
              }

              setData(processedData);
              setLoading(false);
              return;
            }
          } catch (err) {
            lastError = err as Error;

            if (err instanceof Error && err.name === "AbortError") {
              throw new Error(
                `Timeout: La requête a pris plus de ${timeout}ms`
              );
            }

            if (attempt < retryCount) {
              await sleep(retryDelay);
            }
          }
        }

        throw lastError!;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Une erreur inconnue est survenue";

        logger.error("Erreur lors de la récupération des infos IP:", err);
        setError(errorMessage);
        setData(null);
        setIsValidData(false);
      } finally {
        setLoading(false);
      }
    },
    [
      initialIp,
      enableCache,
      timeout,
      retryCount,
      retryDelay,
      validateAndTransformData,
      isValidData,
    ]
  );

  const refetch = useCallback(async (): Promise<void> => {
    await fetchIpInfo(lastSearchedIp || undefined);
  }, [fetchIpInfo, lastSearchedIp]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setValidationErrors(null);
    setLoading(false);
    setLastSearchedIp(initialIp);
    setIsValidData(false);
  }, [initialIp]);

  useEffect(() => {
    if (autoFetch) {
      fetchIpInfo();
    }
  }, [autoFetch, fetchIpInfo]);

  return {
    data,
    loading,
    error,
    fetchIpInfo,
    refetch,
    reset,
    lastSearchedIp,
    isValidData,
    validationErrors,
  };
}

// 🎁 Hooks spécialisés avec types automatiques
export function useGetIpInfo(ip?: string, simplified: boolean = false) {
  return simplified
    ? useIpInfo<IpInfoSummary>(ip, {
        autoFetch: true,
        enableCache: true,
        simplified: true,
      })
    : useIpInfo(ip, { autoFetch: true, enableCache: true });
}

// 🧹 Utilitaires
export function clearIpInfoCache(): void {
  ipInfoCache.clear();
}

export function getIpInfoCacheStats() {
  return {
    size: ipInfoCache.size,
    keys: Array.from(ipInfoCache.keys()),
    validated: Array.from(ipInfoCache.values()).filter((v) => v.validated)
      .length,
  };
}
