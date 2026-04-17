"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { useTranslations } from "use-intl";

export function PolicyContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        title={t("policy.page.title")}
        description={t("policy.page.description")}
        imagePath={{ emoji: "📜" }}
        isMobileShowed
      />

      <SectionLayout>
        <div className="max-w-3xl mx-auto space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("policy.sections.intro.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("policy.sections.intro.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("policy.sections.data-collection.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("policy.sections.data-collection.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("policy.sections.data-usage.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("policy.sections.data-usage.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("policy.sections.cookies.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("policy.sections.cookies.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("policy.sections.third-party.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("policy.sections.third-party.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("policy.sections.user-rights.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("policy.sections.user-rights.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("policy.sections.contact.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("policy.sections.contact.content")}
            </p>
          </section>
        </div>
      </SectionLayout>
    </>
  );
}
