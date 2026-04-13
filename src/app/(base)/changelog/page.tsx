import React from "react";
import { getTranslations } from "next-intl/server";
import { changelog } from "@/data/personal/changelog";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `Changelog | ${t("home.title")}`,
    description: "Tracking the evolution, features, and fixes of this project.",
  };
}

export default function ChangelogPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-2xl mb-12 lg:mb-20">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          Changelog
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Tracking the evolution, experiments, and milestones of this digital playground.
        </p>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/50 before:to-transparent">
        {changelog.map((entry, index) => (
          <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
               <div className="size-2 rounded-full bg-purple-500 animate-pulse" />
            </div>

            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 rounded-3xl border border-[#f0f0f0] dark:border-[#1a1a1a] bg-white/50 dark:bg-black/50 backdrop-blur-xl hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <time className="text-sm font-bold text-purple-500/80">
                  {entry.date}
                </time>
                <Badge variant="outline" className="capitalize text-[10px] font-bold tracking-widest px-2 py-0">
                  {entry.type}
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-4">{entry.version}</h3>
              <ul className="space-y-3">
                {entry.changes.map((change, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1.5 size-1 rounded-full bg-foreground/30 shrink-0" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
