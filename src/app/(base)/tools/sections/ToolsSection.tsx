"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { toolbox } from "@/data/personal/toolbox";
import { useTranslations } from "use-intl";
import { ToolAvatar } from "@/components/shared/pages/tools/avatar";

export function ToolsSection() {
  const t = useTranslations();

  return (
    <SectionLayout
      title={t("tools.page.tools-section.title")}
      badge={t("tools.page.tools-section.badge")}
      isFlex
    >
      <div className="relative mb-12 grid auto-rows-auto grid-cols-3 place-items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {toolbox.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative size-full flex flex-col items-center gap-4 group cursor-pointer no-underline"
          >
            <ToolAvatar icon={item.icon} name={item.name} />
          </a>
        ))}
      </div>
    </SectionLayout>
  );
}
