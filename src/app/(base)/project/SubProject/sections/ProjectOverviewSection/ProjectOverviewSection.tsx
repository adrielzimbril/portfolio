import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

export const ProjectOverviewSection () {
  return (
    <section className="min-h-[832px] relative w-full bg-greys-00 flex flex-col items-center justify-center py-20">
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
            className="flex flex-col items-start justify-between p-10 bg-white rounded-[48px] overflow-hidden border-[16px] border-solid border-[#f5f5f599] min-h-[400px]"
          >
            <CardContent className="p-0 w-full">
              <Badge
                variant="secondary"
                className="inline-flex items-center px-2 py-1 bg-[#f9f9f9] rounded-lg overflow-hidden mb-12"
              >
                <span className="font-tiny-12 font-[number:var(--tiny-12-font-weight)] text-text-iconslight-medium-emphasis text-[length:var(--tiny-12-font-size)] tracking-[var(--tiny-12-letter-spacing)] leading-[var(--tiny-12-line-height)] [font-style:var(--tiny-12-font-style)]">
                  {metric.category}
                </span>
              </Badge>

              <div className="flex flex-col items-start gap-2 w-full">
                <div className="inline-flex items-center p-4 bg-[#f5f5f599] rounded-[75px] overflow-hidden">
                  <div
                    className="w-[32px] h-[32px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${metric.icon})` }}
                  />
                </div>

                {metric.category === "Rétention" ? (
                  <div className="flex flex-col items-start gap-4 w-[266px]">
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="font-title-01-64 font-[number:var(--title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--title-01-64-font-size)] tracking-[var(--title-01-64-letter-spacing)] leading-[var(--title-01-64-line-height)] [font-style:var(--title-01-64-font-style)]">
                        {metric.value}
                      </div>
                      <div className="font-large-24 font-[number:var(--large-24-font-weight)] text-text-iconslight-medium-emphasis text-[length:var(--large-24-font-size)] tracking-[var(--large-24-letter-spacing)] leading-[var(--large-24-line-height)] [font-style:var(--large-24-font-style)]">
                        {metric.subtitle}
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="font-title-01-64 font-[number:var(--title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--title-01-64-font-size)] tracking-[var(--title-01-64-letter-spacing)] leading-[var(--title-01-64-line-height)] [font-style:var(--title-01-64-font-style)]">
                        {metric.secondaryValue}
                      </div>
                      <div className="font-large-24 font-[number:var(--large-24-font-weight)] text-text-iconslight-medium-emphasis text-[length:var(--large-24-font-size)] tracking-[var(--large-24-letter-spacing)] leading-[var(--large-24-line-height)] [font-style:var(--large-24-font-style)] whitespace-nowrap">
                        {metric.secondarySubtitle}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="font-title-01-64 font-[number:var(--title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--title-01-64-font-size)] tracking-[var(--title-01-64-letter-spacing)] leading-[var(--title-01-64-line-height)] [font-style:var(--title-01-64-font-style)] w-full">
                      {metric.value}
                    </div>

                    <div className="w-[286px] font-large-24 font-[number:var(--large-24-font-weight)] text-text-iconslight-medium-emphasis text-[length:var(--large-24-font-size)] tracking-[var(--large-24-letter-spacing)] leading-[var(--large-24-line-height)] [font-style:var(--large-24-font-style)]">
                      {metric.description}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
