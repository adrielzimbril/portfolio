"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { pickRandomColor } from "@/utils/pick-random-color";
import { DEFAULT_COLOR_CODE_NAME } from "@/types/default";
import { useTranslations } from "use-intl";

export function ConnectionBadge({ met }: { met: string | null }) {
  const t = useTranslations();

  return (
    <div className="absolute bottom-6 right-1/2 translate-x-1/2">
      {met ? (
        <Badge
          className={cn(
            pickRandomColor(DEFAULT_COLOR_CODE_NAME.VIOLET),
            "size-max text-primary-foreground",
          )}
          variant="colored"
        >
          {new Date(met).toLocaleDateString()}
        </Badge>
      ) : (
        <Badge
          className={cn(
            pickRandomColor(DEFAULT_COLOR_CODE_NAME.ORANGE),
            "size-max",
          )}
          variant="colored"
        >
          {t("connections.badge.not-met-yet")}
        </Badge>
      )}
    </div>
  );
}
