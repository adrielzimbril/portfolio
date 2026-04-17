"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { useTranslations } from "use-intl";
import { legal } from "content-collections";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";

export function PolicyContent() {
  const t = useTranslations();
  const policy = legal.find((doc) => doc.path === "policy");

  return (
    <>
      <PageHero
        title={policy?.title || t("policy.page.title")}
        description={policy?.description || t("policy.page.description")}
        imagePath={{ emoji: "📜" }}
        isMobileShowed
      />

      <SectionLayout>
        <div className="max-w-3xl mx-auto">
          <MarkdownContentRender content={policy?.body} />
        </div>
      </SectionLayout>
    </>
  );
}
