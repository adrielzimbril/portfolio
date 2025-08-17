import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const ProjectListSection () {
  const statsData = [
    {
      icon: "/image-989.png",
      number: "30",
      description: "Interviews téléphonique",
    },
    {
      icon: "/image-1001-1.png",
      number: "30",
      description: "Interviews téléphonique",
    },
    {
      icon: "/image-657.png",
      number: "30",
      description: "Interviews téléphonique",
    },
  ];

  return (
    <section className="w-full bg-greys-00 py-24">
      <div className="flex flex-col items-center gap-16 max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] text-center tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
            Chiffres clés
          </h2>

          <p className="max-w-[654px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-2xl text-center tracking-[0.02px] leading-[28.8px]">
            C&#39;est désormais un sujet vaste et cela varie selon les projets.
            Il peut s&#39;agir d&#39;un entretien avec un utilisateur,
            d&#39;enquêtes ou même d&#39;une réunion avec les parties prenantes
          </p>
        </div>

        <div className="flex items-start gap-6 justify-center flex-wrap">
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className="flex-shrink-0 bg-white rounded-[48px] border-[16px] border-solid border-[#f5f5f599] overflow-hidden"
            >
              <CardContent className="flex flex-col items-start justify-center gap-12 p-12">
                <div className="flex items-center p-4 bg-[#f5f5f599] rounded-[75px] overflow-hidden">
                  <div
                    className="w-8 h-8 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${stat.icon})` }}
                  />
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="font-title-01-64 font-[number:var(--title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--title-01-64-font-size)] tracking-[var(--title-01-64-letter-spacing)] leading-[var(--title-01-64-line-height)] [font-style:var(--title-01-64-font-style)]">
                    {stat.number}
                  </div>

                  <div className="font-medium-17 font-[number:var(--medium-17-font-weight)] text-text-iconslight-medium-emphasis text-[length:var(--medium-17-font-size)] tracking-[var(--medium-17-letter-spacing)] leading-[var(--medium-17-line-height)] whitespace-nowrap [font-style:var(--medium-17-font-style)]">
                    {stat.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
