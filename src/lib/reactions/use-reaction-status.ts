"use client";
import useSWR from "swr";
import { PageType } from "@/types";
import { ReactionType } from "@/lib/stats/types";
import { apiRoutes } from "@/data/api-routes";
import {
  getAnonymousUserId,
  getCurrentUserId,
} from "@/lib/reactions/anonymous-user";

export function useReactionStatus(pageType: PageType, entityId: string) {
  const fetcher = async () => {
    const anonymousId = getAnonymousUserId();
    const res = await fetch(
      `${apiRoutes.reactions.batch.link}?pageType=${pageType}&entityId=${entityId}${anonymousId ? `&anonymousId=${anonymousId}` : ""}`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch reaction status");
    }
    const { userStatus } = await res.json();
    return userStatus as Record<ReactionType, boolean>;
  };

  const {
    data: userStatus,
    error,
    isLoading,
    mutate,
  } = useSWR(entityId ? `reaction_status_${pageType}_${entityId}` : null, fetcher, {
    fallbackData: {
      like: false,
      heart: false,
      celebrate: false,
      insightful: false,
      sceptic: false,
    },
    revalidateOnFocus: false,
    refreshInterval: 30000,
  });

  return {
    userStatus: userStatus!,
    loading: isLoading,
    mutate,
  };
}
