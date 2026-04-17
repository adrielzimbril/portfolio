"use client";
import React from "react";
import { cn } from "@/utils/utils";
import { IconComponentsProps } from "@aurthle/icons";
import { Badge } from "@/components/ui/badge";
import { pickRandomColor } from "@/utils/pick-random-color";
import { DEFAULT_COLOR_CODE_NAME } from "@/types/default";

export function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<IconComponentsProps>;
  label: string;
  value: string;
}) {
  return (
    <div className="relative flex flex-col items-center gap-4 group">
      <div className="relative size-fit">
        <div
          className={cn(
            "relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-28 overflow-hidden transition-all duration-300",
            "squircle-border-[#8e8eff]",
          )}
        >
          <div className="pointer-events-none flex h-full w-full items-center justify-center">
            <Icon
              size={42}
              className={cn(
                "transition-all duration-300 group-hover:scale-110",
                "text-[#8e8eff]",
              )}
              variant="bulk"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-1/2 translate-x-1/2">
        <Badge
          className={cn(
            pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
            "size-max text-primary-foreground!",
          )}
          variant="colored"
          size="lg"
        >
          {value}
        </Badge>
      </div>
      <div className="text-center">
        <h6 className="font-semibold text-b-white-invert-sec text-sm md:text-base">
          {label}
        </h6>
      </div>
    </div>
  );
}
