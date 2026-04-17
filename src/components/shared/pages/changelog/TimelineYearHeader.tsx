"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "use-intl";

interface TimelineYearHeaderProps {
  year: number;
  count: number;
}

export function TimelineYearHeader({ year, count }: TimelineYearHeaderProps) {
  const t = useTranslations("changelog.sections.timeline");

  return (
    <div className="flex items-center gap-4 mb-12">
      <h2 className="text-3xl font-bold text-foreground">{year}</h2>
      <div className="flex-1 h-px bg-b-base" />
      <Badge className="text-sm">
        {count} {t("release")}
        {count !== 1 ? "s" : ""}
      </Badge>
    </div>
  );
}
