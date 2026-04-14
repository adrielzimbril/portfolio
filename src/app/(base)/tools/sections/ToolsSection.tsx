"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { toolbox } from "@/data/personal/toolbox";
import { useTranslations } from "use-intl";
import Image from "next/image";

export function ToolsSection() {
  const t = useTranslations();

  return (
    <SectionLayout
      title={t("tools.page.tools-section.title")}
      description={`${toolbox.length} tools I use daily`}
      badge={t("tools.page.tools-section.badge")}
      isFlex
    >
      <div className="grid grid-cols-3 place-items-center gap-6 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-10">
        {toolbox.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group no-underline transition-all duration-500 group-hover:-translate-y-3"
          >
            <div className="group inline-block text-center">
              <div className="h-28 w-28 rounded-[20px] border border-border bg-muted p-2 transition-all duration-300 group-hover:-translate-y-3 group-hover:border-primary">
                <div className="grid h-full place-items-center rounded-xl border-2 border-border/10 bg-muted/50">
                  {item.icon && (
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                  )}
                </div>
              </div>
              {item.name ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.name}
                </p>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </SectionLayout>
  );
}
