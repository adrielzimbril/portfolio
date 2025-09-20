"use client";

import { ResourceTypeKey } from "@/types";
import useSWR from "swr";

async function fetchJSON(url: string) {
  const res = await fetch(url, { cache: "no-store" }); // 👈 no-store = fresh data
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Request failed");
  return json;
}

export function useNewsletterSubscribersCount() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/stats/subscribers?scope=newsletter",
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
      ? `/api/stats/subscribers?scope=productType&type=${encodeURIComponent(type)}`
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
      ? `/api/stats/subscribers?scope=productTitle&title=${encodeURIComponent(
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
