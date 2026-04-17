"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { useTranslations } from "use-intl";
import { legal } from "content-collections";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";

export function TermsContent() {
  const t = useTranslations();
  const terms = legal.find((doc) => doc.path === "terms");

  return (
    <>
      <PageHero
        title={terms?.title || t("terms.page.title")}
        description={terms?.description || t("terms.page.description")}
        imagePath={{ emoji: "⚖️" }}
        isMobileShowed
      />

      <SectionLayout>
        <div className="max-w-3xl mx-auto">
          <MarkdownContentRender content={terms?.body} />
        </div>
      </SectionLayout>
    </>
  );
}
