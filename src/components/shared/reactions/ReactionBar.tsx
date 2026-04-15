"use client";

import React from "react";
import { ReactionButton } from "./ReactionButton";
import { cn } from "@/utils/utils";

interface ReactionBarProps {
  entityType: "article" | "project" | "connection" | "quest";
  entityId: string;
  reactions?: {
    like?: number;
    heart?: number;
    celebrate?: number;
    insightful?: number;
  };
  className?: string;
}

export function ReactionBar({
  entityType,
  entityId,
  reactions = {},
  className,
}: ReactionBarProps) {
  const reactionTypes: Array<"like" | "heart" | "celebrate" | "insightful"> = [
    "like",
    "heart",
    "celebrate",
    "insightful",
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {reactionTypes.map((type) => (
        <ReactionButton
          key={type}
          entityType={entityType}
          entityId={entityId}
          reactionType={type}
          count={reactions[type] || 0}
        />
      ))}
    </div>
  );
}
