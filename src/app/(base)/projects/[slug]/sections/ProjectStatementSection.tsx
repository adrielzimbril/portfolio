"use client";
import React from "react";
import { ResourceCard } from "@/components/shared/pages/resources/page/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { useTranslations } from "next-intl";

export function ProjectStatementSection({
  description,
  statements,
}: {
  description: string;
  statements: { icon: string; number: string; description: string }[];
}) {
  const t = useTranslations();

  return (
    <>
      <SectionLayout
        title={t("projects.inner-page.project-statement-section.title")}
        description={
          description ||
          t("projects.inner-page.project-statement-section.description")
        }
        className="p-0"
        contentClassName="md:grid-cols-3"
      >
        {statements.map((stat, index) => (
          <ResourceCard key={index} details={stat} />
        ))}
      </SectionLayout>
    </>
  );
}
