import React from "react";
import { getTranslations } from "next-intl/server";
import { setup } from "@/data/personal/setup";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Laptop, Keyboard, Mouse, Speaker } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `My Setup | ${t("home.title")}`,
    description: "The hardware and peripherals I use for my creative work.",
  };
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "hardware": return <Laptop className="size-5" />;
    case "accessories": return <Keyboard className="size-5" />;
    case "software": return <Monitor className="size-5" />;
    case "audio": return <Speaker className="size-5" />;
    default: return <Monitor className="size-5" />;
  }
};

export default function SetupPage() {
  const categories = ["hardware", "accessories", "software", "audio"];

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-2xl mb-12 lg:mb-20">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          My Setup
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The physical and digital tools that power my productivity and creative flow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => {
          const items = setup.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-3 text-lg font-bold">
                <div className="size-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  <CategoryIcon category={category} />
                </div>
                <h2 className="capitalize">{category}</h2>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="border-[#f0f0f0] dark:border-[#1a1a1a] bg-white/50 dark:bg-black/50 backdrop-blur-xl group hover:border-purple-500/20 transition-colors">
                    <CardContent className="p-5 flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground group-hover:text-purple-500 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      {item.purchaseUrl && (
                         <a 
                            href={item.purchaseUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest px-3 py-1 border border-border rounded-full"
                         >
                           Link
                         </a>
                      )}
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
