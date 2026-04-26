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
    `${apiRoutes.stats.subscribers.link}?scope=newsletter`,
    fetchJSON,
    {
      revalidateOnFocus: true, // 👈 re-fetch when we come back to the page
    },
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
      ? `${apiRoutes.stats.subscribers.link}?scope=productType&type=${encodeURIComponent(type)}`
      : null, // null = skip fetch if no type
    fetchJSON,
  );

  return {
    count: data?.count ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    refresh: mutate,
  } as const;
}

export function useProductSlugRequestsCount(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug
      ? `${apiRoutes.stats.subscribers.link}?scope=productUrl&url=${encodeURIComponent(
          slug,
        )}`
      : null, // null = skip fetch if no title
    fetchJSON,
  );

  return {
    count: data?.count ?? 0,
    loading: isLoading,
    error: error?.message ?? null,
    refresh: mutate,
  } as const;
}

type QuestParticipantsStats = {
  registered: number;
  submitted: number;
  totalParticipants: number;
};

export function useQuestParticipantsStats(slug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? apiRoutes.quests.participants(slug).link : null,
    fetchJSON,
  );

  return {
    stats: (data?.stats ?? {
      registered: 0,
      submitted: 0,
      totalParticipants: 0,
    }) as QuestParticipantsStats,
    loading: isLoading,
    error: error?.message ?? null,
    refresh: mutate,
  } as const;
}
