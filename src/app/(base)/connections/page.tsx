import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
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
        title={t("connections.sections.people.title")}
        description={t("connections.sections.people.description")}
        badge={t("connections.sections.people.badge")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <Card
              key={connection.id}
              className="squircle squircle-b-base squircle-smooth-xl squircle-6xl group overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative h-48 bg-muted">
                  <Image
                    src={connection.image}
                    alt={connection.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3">{connection.name}</h3>
                  {connection.met ? (
                    <Badge variant="secondary" className="text-xs">
                      Met on {new Date(connection.met).toLocaleDateString()}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Not met yet
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
