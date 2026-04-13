import React from "react";
import { getTranslations } from "next-intl/server";
import { connections } from "@/data/personal/connections";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `Connections | ${t("home.title")}`,
    description: "Connect with me across the web.",
  };
}

export default function ConnectionsPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-2xl mb-12 lg:mb-20">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          Connections
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The best ways to reach out, follow my work, or just see what I'm up to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map((connection) => (
          <Card key={connection.id} className="group overflow-hidden border-[#f0f0f0] dark:border-[#1a1a1a] bg-white/50 dark:bg-black/50 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                {/* Fallback to simple icon or text if image fails */}
                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {connection.platform[0]}
                </span>
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">{connection.platform}</CardTitle>
                <CardDescription className="text-sm font-medium text-purple-500/80">
                  {connection.url.replace("https://", "")}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                {connection.description}
              </p>
              <Button asChild variant="secondary" className="w-full group/btn bg-foreground/5 dark:bg-foreground/10 hover:bg-foreground/10 dark:hover:bg-foreground/20 border-none">
                <a href={connection.url} target="_blank" rel="noopener noreferrer">
                  Follow
                  <ExternalLink className="ml-2 size-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
