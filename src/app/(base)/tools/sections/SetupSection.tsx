"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { setup } from "@/data/personal/setup";
import { useTranslations } from "use-intl";

export function SetupSection() {
  const t = useTranslations();
  const categories = ["hardware", "accessories", "software", "audio"];

  return (
    <div className="space-y-16">
      {categories.map((category) => {
        const items = setup.filter((item) => item.category === category);
        if (items.length === 0) return null;

        return (
          <SectionLayout
            key={category}
            title={t(`tools.page.setup-section.categories.${category}`)}
            description={`${items.length} ${t(`tools.page.setup-section.categories.${category}`)} items`}
            badge={t("tools.page.setup-section.badge")}
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
  );
}
