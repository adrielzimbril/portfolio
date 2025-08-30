import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const cardData = [
  {
    title: "Qui",
    emoji: "/emoji-true-2.png",
    description:
      "Qui rencontre le problème ? Vous pouvez ajouter des cadres plus spécifiques pour les développer.",
    methodology: "Persona. Carte d'empathie",
  },
  {
    title: "Quand",
    emoji: "/image-1310-2.png",
    description:
      "Quand le problème apparaît-il réellement dans le processus? Cela peut être à un moment précis.",
    methodology: "Carte du parcours",
  },
  {
    title: "Où",
    emoji: "/emoji-true-2.png",
    description:
      "Dans quel contexte l'utilisateur rencontre-t-il le problème, espace physique ou numérique ?",
    methodology: "Carte du parcours",
  },
  {
    title: "Pourquoi",
    emoji: "/emoji-true-2.png",
    description:
      "Pourquoi ce problème est-il important pour les utilisateurs, les avantages de la résolution de ce problème ?",
    methodology: "Carte des propositions de valeur",
  },
];

export function ProjectGallerySection() {
  return (
    <section className="w-full bg-greys-00 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col items-center gap-4 mb-24">
          <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] text-center tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
            Cadrage du problème
          </h1>
          <p className="w-full max-w-[654px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-2xl text-center tracking-[0.02px] leading-[28.8px]">
            Toute bonne histoire commence par un POURQUOI ? La même chose
            s&apos;applique à votre projet ! Clarifier d&apos;abord le problème
            est un excellent moyen de briser la glace pour vos lecteurs
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1136px] mx-auto">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="bg-white rounded-[48px] border-[16px] border-solid border-[#f5f5f599] overflow-hidden"
            >
              <CardContent className="flex flex-col gap-12 p-12">
                <div className="flex items-center justify-between px-1 py-0 rounded-lg">
                  <div className="inline-flex items-center p-4 bg-[#f9f9f9] rounded-2xl overflow-hidden">
                    <div className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-2xl tracking-[0.02px] leading-[28.8px] whitespace-nowrap">
                      {card.title}
                    </div>
                  </div>

                  <div className="inline-flex items-center p-4 bg-[#f5f5f599] rounded-[75px] overflow-hidden">
                    <div
                      className="w-[32.0px] h-[32.0px] bg-cover bg-[50%_50%]"
                      style={{ backgroundImage: `url(${card.emoji})` }}
                    />
                  </div>
                </div>

                <div className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[34px] tracking-[0.14px] leading-[40.8px]">
                  {card.description}
                </div>

                <div className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px] whitespace-nowrap">
                  {card.methodology}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
