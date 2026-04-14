"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";
import { useTranslations } from "use-intl";

export function StatsPageHeader() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-4 py-12 md:py-20">
      <Badge size="md">Stats</Badge>
      <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-6xl">
        {t("stats.title")}
      </h1>
      <p className="max-w-2xl text-center text-xl text-muted-foreground">
        {t("stats.description")}
      </p>
    </div>
  );
}
