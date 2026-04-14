"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { toolbox } from "@/data/personal/toolbox";
import { useTranslations } from "use-intl";
import { ToolAvatar } from "@/components/shared/pages/tools/avatar";
import { cn } from "@/utils/utils";

export function ToolsSection() {
  const t = useTranslations();

  return (
    <SectionLayout
      className="pb-0!"
      badge={t("toolbox.page.tools-section.badge")}
      isFlex
    >
      <div className="relative mb-12 grid auto-rows-auto grid-cols-3 place-items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9">
        {toolbox.map(
          (item) =>
            item.icon && (
              <div key={item.id} className="relative">
                <div
                  className={cn(
                    "absolute inset-0 bg-primary/10 rounded-full blur-xl -z-10 opacity-0",
                    "hover:opacity-100 transition-opacity duration-300",
                  )}
                />
                <ToolAvatar icon={item.icon} name={item.name} />
              </div>
            ),
        )}
      </div>
    </SectionLayout>
  );
}
