import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Laptop, Keyboard, Mouse, Speaker } from "lucide-react";
import { setup } from "@/data/personal/setup";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("setup.title"),
    description: t("setup.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("setup.title"),
      description: t("setup.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("setup.title"),
      description: t("setup.description"),
    },
  };
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "hardware":
      return <Laptop className="size-5" />;
    case "accessories":
      return <Keyboard className="size-5" />;
    case "software":
      return <Monitor className="size-5" />;
    case "audio":
      return <Speaker className="size-5" />;
    default:
      return <Monitor className="size-5" />;
  }
};

export default async function SetupPage() {
  const t = await getTranslations();
  const categories = ["hardware", "accessories", "software", "audio"];

  return (
    <>
      <PageHero
        title={t("setup.page.title")}
        description={t("setup.page.description")}
        imagePath={{ emoji: "💻" }}
        isMobileShowed
      />

      <div className="space-y-16">
        {categories.map((category) => {
          const items = setup.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <SectionLayout
              key={category}
              title={category}
              description={`${items.length} ${category} items`}
              isFlex
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="squircle squircle-b-base squircle-smooth-xl squircle-6xl group"
                  >
                    <CardContent className="p-6 flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      {item.purchaseUrl && (
                        <a
                          href={item.purchaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold uppercase tracking-widest px-3 py-1 border border-border rounded-full hover:bg-muted"
                        >
                          Link
                        </a>
                      )}
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
