"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { setup } from "@/data/personal/setup";
import { useTranslations } from "use-intl";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function SetupSection() {
  const t = useTranslations();

  return (
    <SectionLayout
      title={t("tools.page.setup-section.title")}
      description={`${setup.length} items in my daily setup`}
      badge={t("tools.page.setup-section.badge")}
      isFlex
    >
      <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-3">
        {setup.map((item) => (
          <a
            href={item.purchaseUrl}
            className="group block h-full"
            key={item.id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="squircle squircle-b-base-second squircle-6xl squircle-smooth-xl h-full border-0 overflow-hidden">
              <CardContent className="grid grid-cols-1 px-6 md:px-8 py-8 md:py-10 gap-4 size-full grid-rows-[auto_1fr]">
                {item.imageUrl && (
                  <div className="relative h-40 w-full rounded-xl overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold leading-5">
                      {item.name}
                    </p>
                    {item.category && (
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                  <p className="leading-6 text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </SectionLayout>
  );
}
