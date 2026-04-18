"use client";
import React, { useEffect, useState } from "react";
import { ChatBubbleCircle, Users, TrendUp } from "@aurthle/icons";
import { StatCard } from "@/components/shared/pages/community/StatCard";
import { LeaveNoteButton } from "@/components/shared/pages/community/LeaveNoteButton";
import { User } from "@supabase/supabase-js";
import { apiRoutes } from "@/data/api-routes";
import logger from "@/utils/logger";
import { useWindowEvent } from "@/hooks/useWindowEvent";

interface Stats {
  totalMessages: number;
  uniqueMembers: number;
  todayMessages: number;
}

interface StatsSectionProps {
  user: User | null;
  initialStats: Stats | null;
}

export function StatsSection({ user, initialStats }: StatsSectionProps) {
  const [stats, setStats] = useState<Stats>(
    initialStats || {
      totalMessages: 0,
      uniqueMembers: 0,
      todayMessages: 0,
    },
  );
  const [isLoading, setIsLoading] = useState(!initialStats);

  const refreshStats = async () => {
    try {
      const response = await fetch(apiRoutes.community.messages.link);
      if (response.ok) {
        const data = await response.json();
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (error) {
      logger.error("Failed to refresh community stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useWindowEvent("community-message-added", () => {
    refreshStats();
  });

  return (
    <div className="relative px-6">
      <div className="flex flex-row flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        <StatCard
          icon={ChatBubbleCircle}
          label="Messages"
          value={isLoading ? "..." : stats.totalMessages.toLocaleString()}
        />
        <StatCard
          icon={Users}
          label="Members"
          value={isLoading ? "..." : stats.uniqueMembers.toLocaleString()}
        />
        <StatCard
          icon={TrendUp}
          label="Today"
          value={isLoading ? "..." : stats.todayMessages.toLocaleString()}
        />
      </div>
      <LeaveNoteButton user={user} />
    </div>
  );
}
