"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { routes } from "@/data/routes";
import { useTranslations } from "use-intl";
import { Link } from "@/components/ui/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    community: [routes.community, routes.connections, routes.changelog],
    tools: [routes.toolbox, routes.stats, routes.newsletter, routes.rss],
    legal: [routes.terms, routes.policy],
  };

  return (
    <SectionLayout
      className="pt-0!"
      isFlex
      title={t("routes.page.description")}
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
            className="p-4 hover:bg-b-base transition-colors"
          >
            <Link href={route.link} className="block">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-b-white-foreground">
                    {t(`common.menu.${route.key}.default`)}
                  </h4>
                  {route.inHeader && (
                    <Badge variant="secondary" className="text-xs">
                      {t("routes.badges.header")}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-b-white-invert-sec">
                  {t(`${route.key}.description`)}
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
