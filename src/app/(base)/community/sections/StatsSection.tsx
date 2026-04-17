"use client";
import React from "react";
import { ChatBubbleCircle, Users, HeartOne } from "@aurthle/icons";
import { StatCard } from "@/components/shared/pages/community/StatCard";

export function StatsSection() {
  return (
    <div className="px-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <StatCard
          icon={ChatBubbleCircle}
          label="Messages"
          value="1,234"
          color="#8e8eff"
        />
        <StatCard
          icon={Users}
          label="Members"
          value="892"
          color="#ffd3ad"
        />
        <StatCard
          icon={HeartOne}
          label="Active"
          value="156"
          color="#ff8e8e"
        />
      </div>
    </div>
  );
}
