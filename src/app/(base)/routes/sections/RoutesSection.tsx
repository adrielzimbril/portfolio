"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { routes } from "@/data/routes";
import { useTranslations } from "use-intl";
import { Link } from "@/components/ui/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, pickRandomColor } from "@/utils";
import { DEFAULT_COLOR_CODE_NAME } from "@/types";

export function RoutesSection() {
  const t = useTranslations();

  const routeGroups = {
    main: [
      routes.home,
      routes.about,
      routes.hub,
      routes.projects,
      routes.talks,
      routes.quests,
      routes.thoughts,
    ],
    community: [
      routes.community,
      routes.connections,
      routes.changelog,
      routes.contact,
    ],
    tools: [routes.toolbox, routes.stats, routes.submit, routes.newsletter],
    rss: [routes.rss, routes.rssAtom, routes.rssJson],
    legal: [routes.terms, routes.privacy],
  };

  return (
    <SectionLayout
      className="pt-0!"
      isFlex
      description={t("routes.page.description")}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-8">
          <RouteGroup
            title={t("routes.groups.main")}
            routes={routeGroups.main}
          />
          <RouteGroup
            title={t("routes.groups.community")}
            routes={routeGroups.community}
          />
          <RouteGroup
            title={t("routes.groups.tools")}
            routes={routeGroups.tools}
          />
          <RouteGroup title={t("routes.groups.rss")} routes={routeGroups.rss} />
          <RouteGroup
            title={t("routes.groups.legal")}
            routes={routeGroups.legal}
          />
        </div>
      </div>
    </SectionLayout>
  );
}

function RouteGroup({ title, routes }: { title: string; routes: any[] }) {
  const t = useTranslations();

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-b-white-foreground">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {routes.map((route) => (
          <Card
            key={route.key}
            className="group relative squircle squircle-b-base squircle-2xl squircle-smooth-lg border-0"
          >
            <Link href={route.link} className="absolute inset-0 z-10" />
            <CardContent className="p-4 relative size-full z-0">
              <div
                className={cn(
                  "flex relative flex-col size-full gap-4 p-4 squircle squircle-smooth-md squircle-xl md:squircle-2xl squircle-sh-white overflow-hidden",
                )}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-b-white-foreground">
                    {t(`common.menu.${route.key}.default`)}
                  </h4>
                  {route.inHeader && (
                    <Badge
                      className={cn(
                        "capitalize squircle-border-2 squircle-border-sh-white",
                        pickRandomColor(DEFAULT_COLOR_CODE_NAME.ORANGE),
                      )}
                      variant="colored"
                    >
                      {t("routes.badges.header")}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-b-white-invert-sec">
                  {t(`${route.key}.description`)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
