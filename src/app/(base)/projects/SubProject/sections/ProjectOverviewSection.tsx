import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import Image from "next/image";
import { cn } from "@/utils/utils";

const metricsData = [
  {
    category: "Adoption",
    icon: "/image-54.png",
    value: "30%",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada dignissim",
  },
  {
    category: "Rétention",
    icon: "/image-1001-2.png",
    value: "1M",
    subtitle: "Utilisateurs actifs",
    secondaryValue: "100k",
    secondarySubtitle: "Utilisateurs annuels actifs",
  },
  {
    category: "ROI",
    icon: "/image-1310-2.png",
    value: "$30k+",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada dignissim",
  },
];

function MetricParagraph({
  subtitle,
  secondarySubtitle,
}: {
  subtitle?: string;
  secondarySubtitle?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {subtitle && <h4 className="h2 tracking-wide">{subtitle}</h4>}
      {secondarySubtitle && (
        <p className="text-xl text-zinc-600 font-bosld leading-[120%]">
          {secondarySubtitle}
        </p>
      )}
    </div>
  );
}

export function ProjectOverviewSection() {
  return (
    <>
      <SectionLayout
        title="Résultats"
        description="Vous pouvez indiquer n'importe quel indicateur de réussite de votre projet, par exemple le taux d'adoption et de rétention, ainsi que le retour sur investissement du produit."
        className="p-0"
        contentClassName="md:grid-cols-3"
      >
        {metricsData.map((metric, index) => (
          <Card
            key={index}
            className="squircle size-full max-w-[75%] md:max-w-full squircle-stone-100 squircle-6xl squircle-smooth-md border-0 overflow-hidden"
          >
            <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
              <div
                className={cn(
                  "flex relative flex-col gap-6 md:gap-4 min-h-60 items-start justify-between p-6 md:p-8 squircle squircle-smooth-xl squircle-5xl squircle-white overflow-hidden"
                )}
              >
                <Badge>{metric.category}</Badge>
                <div className="inline-flex items-center justify-center gap-3 p-4 aspect-square bg-zinc-100 rounded-full overflow-hidden">
                  <Image
                    width={100}
                    height={100}
                    className="size-8 object-cover pointer-events-none"
                    alt={metric.icon}
                    src={metric.icon!}
                  />
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  {metric.category === "Rétention" ? (
                    <>
                      <MetricParagraph
                        subtitle={metric.value}
                        secondarySubtitle={metric.subtitle}
                      />

                      <MetricParagraph
                        subtitle={metric.secondaryValue}
                        secondarySubtitle={metric.secondarySubtitle}
                      />
                    </>
                  ) : (
                    <>
                      <MetricParagraph
                        subtitle={metric.value}
                        secondarySubtitle={metric.description}
                      />
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </SectionLayout>
      <section className="min-h-[832px] relative w-full bg-greys-00 flex flex-col items-center justify-center py-20 hidden">
        <div className="flex flex-col items-center gap-4 mb-16">
          <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] text-center tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
            Résultats
          </h2>

          <p className="w-[654px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-2xl text-center tracking-[0.02px] leading-[28.8px]">
            Vous pouvez indiquer n&#39;importe quel indicateur de réussite de
            votre projet, par exemple le taux d&#39;adoption et de rétention,
            ainsi que le retour sur investissement du produit.
          </p>
        </div>

        <div className="flex items-start justify-center gap-4">
          {metricsData.map((metric, index) => (
            <Card
              key={index}
              className="squircle size-full max-w-[75%] md:max-w-[95%] squircle-stone-100 squircle-7xl squircle-smooth-lg border-0 overflow-hidden"
            >
              <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
                <Badge>{metric.category}</Badge>
                <div className="inline-flex items-center justify-center gap-3 p-4 aspect-square bg-zinc-100 rounded-full overflow-hidden">
                  <Image
                    width={100}
                    height={100}
                    className="size-8 object-cover pointer-events-none"
                    alt={metric.icon}
                    src={metric.icon!}
                  />
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  {metric.category === "Rétention" ? (
                    <>
                      <MetricParagraph
                        subtitle={metric.value}
                        secondarySubtitle={metric.subtitle}
                      />

                      <MetricParagraph
                        subtitle={metric.secondaryValue}
                        secondarySubtitle={metric.secondarySubtitle}
                      />
                    </>
                  ) : (
                    <>
                      <MetricParagraph
                        subtitle={metric.value}
                        secondarySubtitle={metric.description}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
