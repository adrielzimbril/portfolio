"use client";
import useSWR from "swr";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { apiRoutes } from "@/data/api-routes";

export function useReactions(pageType: PageType, entityId: string) {
  const fetcher = async () => {
    const res = await fetch(
      `${apiRoutes.reactions.link}?pageType=${pageType}&entityId=${entityId}`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch reactions");
    }
    const { counts } = await res.json();
    return counts as Record<ReactionType, number>;
  };

  const {
    data: reactions,
    error,
    isLoading,
    mutate,
  } = useSWR(entityId ? `reactions_${pageType}_${entityId}` : null, fetcher, {
    fallbackData: {
      like: 0,
      heart: 0,
      celebrate: 0,
      insightful: 0,
      sceptic: 0,
    },
    revalidateOnFocus: true,
  });

  return {
    reactions: reactions!,
    loading: isLoading,
    mutate,
  };
}
