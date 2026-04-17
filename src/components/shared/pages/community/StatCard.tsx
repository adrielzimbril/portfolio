"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { pickRandomColor } from "@/utils/pick-random-color";
import { DEFAULT_COLOR_CODE_NAME } from "@/types/default";
import { IconComponentsProps } from "@aurthle/icons";

export function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<IconComponentsProps>;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="relative size-fit group cursor-pointer">
      <div
        className={cn(
          "relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-36 overflow-hidden transition-all duration-300",
          color === "#8e8eff"
            ? "squircle-border-[#8e8eff]"
            : color === "#ffd3ad"
              ? "squircle-border-[#ffd3ad]"
              : "squircle-border-[#ff8e8e]",
        )}
      >
        <div className="pointer-events-none flex h-full w-full items-center justify-center">
          <Icon
            size={48}
            className={cn(
              "transition-all duration-300",
              color === "#8e8eff"
                ? "text-[#8e8eff]"
                : color === "#ffd3ad"
                  ? "text-[#ffd3ad]"
                  : "text-[#ff8e8e]",
            )}
            variant="bulk"
          />
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <Badge
          className={cn(
            pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
            "p-1.5 rounded-full",
          )}
          variant="colored"
        >
          <span className="text-sm font-bold text-primary-foreground">
            {value}
          </span>
        </Badge>
      </div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
