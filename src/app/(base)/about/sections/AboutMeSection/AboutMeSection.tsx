import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const AboutMeSection () {
  const philosophyCards = [
    {
      icon: "/symbol.png",
      title: "Innovation centrée sur l'utilisateur",
      description:
        "Garder les besoins des utilisateurs finaux au premier plan pour créer des produits qui non seulement résolvent les problèmes mais dépassent également les attentes.",
      alt: "Symbol",
    },
    {
      icon: "/longitude.svg",
      title: "Leadership d'équipe",
      description:
        "Construire et responsabiliser des équipes interfonctionnelles pour atteindre des objectifs ambitieux.",
      alt: "Longitude",
    },
    {
      icon: "/balance-default.svg",
      title: "Agilité stratégique",
      description:
        "Équilibrer l'innovation avec une stratégie pratique pour naviguer dans une dynamique de marché complexe et saisir les opportunités émergentes.",
      alt: "Balance default",
    },
    {
      icon: "/book.svg",
      title: "Apprentissage continu",
      description:
        "Rester à la pointe des tendances en matière d'IA et de conception, en veillant à ce que mes équipes soient équipées pour relever les défis.",
      alt: "Book",
    },
  ];

  return (
    <section className="w-full bg-greys-00 py-10">
      <div className="max-w-[1136px] mx-auto px-4">
        <h2 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)] mb-[116px]">
          Ma philosophie.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {philosophyCards.map((card, index) => (
            <Card
              key={index}
              className="bg-greys-01 rounded-[48px] border-[16px] border-solid border-[#f9f9f9] overflow-hidden p-4"
            >
              <CardContent className="bg-white p-8 rounded-none">
                <div className="flex items-center justify-start mb-4">
                  <div className="inline-flex items-center gap-[21.11px] p-[16.89px] bg-[#f9f9f9] rounded-[211.11px] overflow-hidden">
                    {card.icon.endsWith(".png") ? (
                      <div className="relative w-12 h-12">
                        <img
                          className="absolute w-[43px] h-[43px] top-[3px] left-[3px]"
                          alt={card.alt}
                          src={card.icon}
                        />
                      </div>
                    ) : (
                      <img
                        className="relative w-12 h-12"
                        alt={card.alt}
                        src={card.icon}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-[6.98px]">
                  <h3 className="mt-[-0.87px] [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[29.6px] tracking-[0.12px] leading-[35.6px]">
                    {card.title}
                  </h3>

                  <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-text-iconslight-disabled text-2xl tracking-[0.02px] leading-[28.8px]">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
