import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { connections } from "@/data/personal/connections";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("connections.title"),
    description: t("connections.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("connections.title"),
      description: t("connections.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("connections.title"),
      description: t("connections.description"),
    },
  };
}

export default async function ConnectionsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("connections.page.title")}
        description={t("connections.page.description")}
        imagePath={{ emoji: "🤝" }}
        isMobileShowed
      />

      <SectionLayout
        title={t("connections.sections.social.title")}
        description={t("connections.sections.social.description")}
        badge={t("connections.sections.social.badge")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map((connection) => (
            <Card
              key={connection.id}
              className="squircle squircle-b-base squircle-smooth-xl squircle-6xl group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-muted flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {connection.platform[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {connection.platform}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {connection.url.replace("https://", "")}
                      </p>
                    </div>
                  </div>
                  {connection.active && (
                    <Badge variant="default" className="shrink-0">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">
                  {connection.description}
                </p>
                <a
                  href={connection.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                >
                  Connect
                  <ExternalLink className="size-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
