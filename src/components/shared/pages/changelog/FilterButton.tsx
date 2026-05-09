"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterOne } from "@aurthle/icons";
import { useTranslations } from "use-intl";

interface FilterButtonProps {
  onClick: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
}

export function FilterButton({
  onClick,
  hasActiveFilters,
  resultCount,
}: FilterButtonProps) {
  const t = useTranslations("changelog.sections.timeline.filter");

  return (
    <Button
      onClick={onClick}
      variant={hasActiveFilters ? "default" : "outline"}
      size="lg"
      asIcon
      asPointer
      whileTap
      className="gap-2"
    >
      <FilterOne size={20} variant="bulk" />
      {t("button")}
      {hasActiveFilters && (
        <Badge variant="white" size="xs" circle className="ml-1 h-auto!">
          {resultCount}
        </Badge>
      )}
    </Button>
  );
}
