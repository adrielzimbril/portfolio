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
import { CheckCircle2, Clock } from "lucide-react";

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

      {/* Met Section */}
      <SectionLayout
        title="People I've met"
        description="Connections made and conversations shared."
        badge="Met ✅"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {connections
            .filter((c) => c.met)
            .map((connection) => (
              <div
                key={connection.id}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-border group-hover:border-primary transition-colors duration-300">
                    <Image
                      src={connection.image}
                      alt={connection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors">
                    {connection.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(connection.met).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </SectionLayout>

      {/* Not Met Section */}
      <SectionLayout
        title="People I want to meet"
        description="Connections yet to be made and conversations to be had."
        badge="Wishlist 🎯"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {connections
            .filter((c) => !c.met)
            .map((connection) => (
              <div
                key={connection.id}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-border group-hover:border-muted-foreground transition-colors duration-300 grayscale group-hover:grayscale-0">
                    <Image
                      src={connection.image}
                      alt={connection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-muted-foreground text-muted-foreground rounded-full p-2">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm md:text-base group-hover:text-muted-foreground transition-colors">
                    {connection.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Not met yet
                  </p>
                </div>
              </div>
            ))}
        </div>
      </SectionLayout>
    </>
  );
}
