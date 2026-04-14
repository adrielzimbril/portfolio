"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { setup } from "@/data/personal/setup";
import { useTranslations } from "use-intl";
import { SetupCard } from "@/components/shared/pages/tools/setup/card";

export function SetupSection() {
  const t = useTranslations();

  return (
    <SectionLayout badge={t("tools.page.setup-section.badge")} isFlex>
      <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-3">
        {setup.map((item) => (
          <SetupCard
            key={item.id}
            title={item.name}
            cover={item.imageUrl}
            description={item.description}
            category={item.category}
            tags={item.tags}
            purchaseUrl={item.purchaseUrl}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
