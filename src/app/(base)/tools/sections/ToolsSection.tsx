"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { toolbox } from "@/data/personal/toolbox";
import { ToolAvatar } from "@/components/shared/pages/shared/tool-avatar";
import { useTranslations } from "use-intl";
import {
  Code,
  Layout,
  Palette,
  Database,
  Play,
  Clock,
  Globe,
  BarChart3,
  Bell,
} from "lucide-react";

export function ToolsSection() {
  const t = useTranslations();
  const categories = ["frontend", "backend", "design", "tools", "other"];

  const getIcon = (toolId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      nextjs: <Code />,
      typescript: <Code />,
      tailwindcss: <Palette />,
      supabase: <Database />,
      "motion/react": <Play />,
      triggerlab: <Clock />,
    };
    return iconMap[toolId] || <Layout />;
  };

  const getColor = (category: string) => {
    const colorMap: Record<string, string> = {
      frontend: "VIOLET",
      backend: "BLUE",
      design: "PINK",
      tools: "ORANGE",
      other: "GRAY",
    };
    return colorMap[category] || "VIOLET";
  };

  return (
    <div className="space-y-16">
      {categories.map((category) => {
        const items = toolbox.filter((item) => item.category === category);
        if (items.length === 0) return null;

        return (
          <SectionLayout
            key={category}
            title={t(`tools.page.tools-section.categories.${category}`)}
            description={`${items.length} ${t(`tools.page.tools-section.categories.${category}`)} tools`}
            badge={t("tools.page.tools-section.badge")}
            isFlex
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className="squircle squircle-b-base squircle-smooth-xl squircle-6xl group"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <ToolAvatar
                        name={item.name}
                        icon={getIcon(item.id)}
                        color={getColor(category) as any}
                        size="md"
                      />
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
                    </div>
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
