import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";

function PointCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="relative">{title}</h4>
      <p className="text-b-white-invert-thr">{description}</p>
    </div>
  );
}

export function IntroductionSection() {
  const points = [
    {
      title: "Point 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada dignissim condimentum feugiat nisi. Ultrices libero massa enim, tristique turpis egestas cras.",
    },
    {
      title: "Point 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada dignissim condimentum feugiat nisi. Ultrices libero massa enim, tristique turpis egestas cras.",
    },
    {
      title: "Point 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada dignissim condimentum feugiat nisi. Ultrices libero massa enim, tristique turpis egestas cras.",
    },
  ];

  return (
    <>
      <SectionLayout
        title="Aperçus"
        description="Notez ce que vous avez appris de la recherche utilisateur."
        //className="p-0"
        contentClassName="lg:max-w-[80%] items-start"
      >
        <EmojiPlaceholder src="/image-989-1.png" variant="squircle" unOrdered />

        <div className="flex flex-col gap-4 md:gap-6 md:max-w-lg">
          {points.map((point, index) => (
            <PointCard
              key={index}
              title={point.title}
              description={point.description}
            />
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
