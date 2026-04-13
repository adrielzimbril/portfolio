import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { toolbox } from "@/data/personal/toolbox";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("toolbox.title"),
    description: t("toolbox.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("toolbox.title"),
      description: t("toolbox.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("toolbox.title"),
      description: t("toolbox.description"),
    },
  };
}

export default async function ToolboxPage() {
  const t = await getTranslations();
  const categories = ["frontend", "backend", "design", "tools", "other"];

  return (
    <>
      <PageHero
        title={t("toolbox.page.title")}
        description={t("toolbox.page.description")}
        imagePath={{ emoji: "🧰" }}
        isMobileShowed
      />

      <div className="space-y-16">
        {categories.map((category) => {
          const items = toolbox.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <SectionLayout
              key={category}
              title={category}
              description={`${items.length} ${category} tools and technologies`}
              isFlex
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="squircle squircle-b-base squircle-smooth-xl squircle-6xl group"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold mt-2 flex items-center gap-1 hover:underline"
                          >
                            Visit Website
                            <svg
                              className="size-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </SectionLayout>
          );
        })}
      </div>
    </>
  );
}
