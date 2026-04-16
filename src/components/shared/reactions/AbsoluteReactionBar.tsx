"use client";

import React from "react";
import { ReactionBar } from "@/components/shared/reactions/ReactionBar";
import { cn } from "@/utils/utils";
import { PageType } from "@/types";

interface AbsoluteReactionBarProps {
  pageType: PageType;
  entityId: string;
  reactionsPosition?: "top" | "bottom";
  className?: string;
}

export function AbsoluteReactionBar({
  pageType,
  entityId,
  reactionsPosition,
  className,
}: AbsoluteReactionBarProps) {
  if (!reactionsPosition) return null;

  return (
    <div
      className={cn(
        "absolute z-20 pointer-events-auto",
        reactionsPosition === "top" ? "top-4 right-4" : "bottom-6 right-6",
        className
      )}
    >
      <ReactionBar
        pageType={pageType}
        entityId={entityId}
        variant="dock"
        dockPosition={reactionsPosition}
        orientation="vertical"
      />
    </div>
  );
}
