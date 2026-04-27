"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { ConnectionCard } from "@/components/shared/pages/connections/card";
import { connections } from "@/data/personal/connections";
import { useTranslations } from "use-intl";

export function PeopleSection() {
  const t = useTranslations();

  return (
    <SectionLayout
      badge={t("connections.page.header-section.badge")}
      className="p-0!"
      isFlex
    >
      <div className="relative mb-12 grid auto-rows-auto grid-cols-3 place-items-center justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {connections
          .sort(
            (a, b) =>
              new Date(b.met ?? 0).getTime() - new Date(a.met ?? 0).getTime(),
          )
          .map((connection) => (
            <ConnectionCard
              key={connection.id}
              id={connection.id}
              name={connection.name}
              image={connection.image}
              met={connection.met}
            />
          ))}
      </div>
    </SectionLayout>
  );
}
