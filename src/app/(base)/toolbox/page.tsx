import React from "react";
import { getTranslations } from "next-intl/server";
import { toolbox } from "@/data/personal/toolbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `Toolbox | ${t("home.title")}`,
    description: "The tools, libraries, and technologies I use to build software.",
  };
}

export default function ToolboxPage() {
  const categories = ["frontend", "backend", "design", "tools", "other"];

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-2xl mb-12 lg:mb-20">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          Toolbox
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The software, libraries, and technologies I use to build high-performance web applications.
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((category) => {
          const items = toolbox.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="space-y-8">
              <h2 className="text-2xl font-bold capitalize flex items-center gap-3">
                <span className="size-2 rounded-full bg-purple-500" />
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card key={item.id} className="group border-[#f0f0f0] dark:border-[#1a1a1a] bg-white/50 dark:bg-black/50 backdrop-blur-xl transition-all hover:bg-white dark:hover:bg-zinc-900 overflow-hidden ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                     <CardContent className="p-6">
                       <div className="flex flex-col gap-2">
                         <h3 className="font-bold text-lg group-hover:text-purple-500 transition-colors">
                           {item.name}
                         </h3>
                         <p className="text-sm text-muted-foreground leading-relaxed">
                           {item.description}
                         </p>
                         {item.url && (
                           <a 
                             href={item.url} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-xs font-semibold text-purple-400 mt-2 flex items-center gap-1 hover:underline"
                           >
                             Visit Website
                           </a>
                         )}
                       </div>
                     </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
