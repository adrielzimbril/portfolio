"use client";
import React from "react";
import { cn } from "@/utils/utils";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types/default";
import { pickRandomColor } from "@/utils/pick-random-color";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function ToolAvatar({
  name,
  icon,
  color,
  size = "md",
}: {
  name: string;
  icon: React.ReactNode;
  color?: DEFAULT_COLOR_CODE_NAME_LIST;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "size-16",
    md: "size-24",
    lg: "size-32",
  };

  const iconSizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  };

  return (
    <div className="relative size-fit">
      <div
        className={cn(
          "relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 overflow-hidden transition-all duration-300",
          sizeClasses[size],
          color
            ? `squircle-border-[${pickRandomColor(color)}]`
            : "squircle-border-b-base-accent",
        )}
      >
        <div className="flex items-center justify-center size-full">
          <div className={iconSizeClasses[size]}>
            {icon}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <Badge
          className={cn(
            pickRandomColor(color || DEFAULT_COLOR_CODE_NAME_LIST.VIOLET),
            " p-1 rounded-full",
          )}
          variant="secondary"
        >
          <Check className="text-primary-foreground" size={12} />
        </Badge>
      </div>
    </div>
  );
}
