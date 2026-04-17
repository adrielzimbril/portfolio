"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  const t = useTranslations("changelog.sections.timeline.emptyState");

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-lg text-muted-foreground">{t("message")}</p>
      <Button variant="outline" onClick={onClearFilters} className="mt-4">
        {t("clearFilters")}
      </Button>
    </div>
  );
}
