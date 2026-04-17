"use client";
import React from "react";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { useTranslations } from "use-intl";

export function TermsContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        title={t("terms.page.title")}
        description={t("terms.page.description")}
        imagePath={{ emoji: "⚖️" }}
        isMobileShowed
      />

      <SectionLayout>
        <div className="max-w-3xl mx-auto space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("terms.sections.intro.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.sections.intro.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("terms.sections.acceptance.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.sections.acceptance.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("terms.sections.account.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.sections.account.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("terms.sections.content.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.sections.content.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("terms.sections.intellectual.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.sections.intellectual.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("terms.sections.termination.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.sections.termination.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("terms.sections.limitation.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.sections.limitation.content")}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              {t("terms.sections.governing.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("terms.sections.governing.content")}
            </p>
          </section>
        </div>
      </SectionLayout>
    </>
  );
}
