import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { changelog } from "@/data/personal/changelog";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("changelog.title"),
    description: t("changelog.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("changelog.title"),
      description: t("changelog.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("changelog.title"),
      description: t("changelog.description"),
    },
  };
}

export default async function ChangelogPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("changelog.page.title")}
        description={t("changelog.page.description")}
        imagePath={{ emoji: "📝" }}
        isMobileShowed
      />

      <SectionLayout
        title={t("changelog.sections.timeline.title")}
        description={t("changelog.sections.timeline.description")}
        badge={t("changelog.sections.timeline.badge")}
      >
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border">
          {changelog.map((entry, index) => (
            <div
              key={entry.id}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="size-2 rounded-full bg-foreground" />
              </div>

              {/* Content */}
              <Card className="squircle squircle-b-base squircle-smooth-xl squircle-6xl w-[calc(100%-4rem)] md:w-[45%]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <time className="text-sm font-bold text-muted-foreground">
                      {entry.date}
                    </time>
                    <Badge
                      variant="outline"
                      className="capitalize text-[10px] font-bold tracking-widest px-2 py-0"
                    >
                      {entry.type}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{entry.version}</h3>
                  <ul className="space-y-3">
                    {entry.changes.map((change, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="mt-1.5 size-1 rounded-full bg-foreground/30 shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
