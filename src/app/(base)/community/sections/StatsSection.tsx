"use client";
import React, { useEffect, useState } from "react";
import { ChatBubbleCircle, Users, TrendUp } from "@aurthle/icons";
import { StatCard } from "@/components/shared/pages/community/StatCard";
import { LeaveNoteButton } from "@/components/shared/pages/community/LeaveNoteButton";
import { User } from "@supabase/supabase-js";
import { apiRoutes } from "@/data/api-routes";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import { useTranslations } from "use-intl";

interface Stats {
  totalMessages: number;
  uniqueMembers: number;
  weekMessages: number;
}

interface StatsSectionProps {
  user: User | null;
}

export function StatsSection({ user }: StatsSectionProps) {
  const t = useTranslations();
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    uniqueMembers: 0,
    weekMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshStats = async () => {
    try {
      const response = await fetch(apiRoutes.community.stats.link);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await refreshStats();
    })();
  }, []);

  useWindowEvent("community-message-added", () => {
    refreshStats();
  });

  return (
    <div className="relative px-6">
      <div className="flex flex-row flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        <StatCard
          icon={ChatBubbleCircle}
          label={t("community.sections.stats.messages")}
          value={isLoading ? "..." : stats.totalMessages.toLocaleString()}
        />
        <StatCard
          icon={Users}
          label={t("community.sections.stats.members")}
          value={isLoading ? "..." : stats.uniqueMembers.toLocaleString()}
        />
        <StatCard
          icon={TrendUp}
          label={t("community.sections.stats.weekly")}
          value={isLoading ? "..." : stats.weekMessages.toLocaleString()}
        />
      </div>
      <LeaveNoteButton user={user} />
    </div>
  );
}
