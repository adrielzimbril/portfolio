"use client";
import React from "react";
import { ChatBubbleCircle, Users, HeartOne } from "@aurthle/icons";
import { StatCard } from "@/components/shared/pages/community/StatCard";
import { LeaveNoteButton } from "@/components/shared/pages/community/LeaveNoteButton";
import { User } from "@supabase/supabase-js";

export function StatsSection({ user }: { user: User }) {
  return (
    <div className="px-6 mb-8">
      <div className="flex flex-row flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        <StatCard icon={ChatBubbleCircle} label="Messages" value="1,234" />
        <StatCard icon={Users} label="Members" value="892" />
        <StatCard icon={HeartOne} label="Active" value="156" />
      </div>
      <LeaveNoteButton user={user} />
    </div>
  );
}
