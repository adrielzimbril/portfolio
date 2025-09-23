"use client";

import { ResourceTypeKey } from "@/types";
import useSWR from "swr";
import { apiRoutes } from "@/data/api-routes";

async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: "no-store" }); // 👈 no-store = fresh data
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Request failed");
  return json;
}

export function useNewsletterSubscribersCount() {
  const { data, error, isLoading, mutate } = useSWR(
    `${apiRoutes.statsSubscribers.link}?scope=newsletter`,
    fetchJSON,
    {
      revalidateOnFocus: true, // 👈 re-fetch when we come back to the page
    }
  );

  return {
    count: data?.count ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    refresh: mutate, // 👈 button or manual action
  } as const;
}

export function useProductTypeSubscribersCount(type: ResourceTypeKey) {
  const { data, error, isLoading, mutate } = useSWR(
    type
      ? `${apiRoutes.statsSubscribers.link}?scope=productType&type=${encodeURIComponent(type)}`
      : null, // null = skip fetch if no type
    fetchJSON
  );

  return {
    count: data?.count ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    refresh: mutate,
  } as const;
}

export function useProductTitleRequestsCount(title: string) {
  const { data, error, isLoading, mutate } = useSWR(
    title
      ? `${apiRoutes.statsSubscribers.link}?scope=productTitle&title=${encodeURIComponent(
          title
        )}`
      : null, // null = skip fetch if no title
    fetchJSON
  );

  return {
    count: data?.count ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    refresh: mutate,
  } as const;
}
