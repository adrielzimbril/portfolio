import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { Link } from "@/components/ui/link";
import { routes } from "@/data/route";
import { cn } from "@/lib/utils";

function ContentSection() {
  return (
    <div className="flex flex-col gap-4 items-start justify-start relative md:max-w-[55%]">
      <h2 className="relative">Objectif ?</h2>
      <p className="relative text-lg md:text-2xl leading-[120%] md:mb-4">
        Après avoir expliqué le problème, il serait bon de définir
        l&#39;objectif et les indicateurs de réussite.
      </p>
      <p className="relative text-base text-zinc-500">
        <span className="font-medium tracking-[0]">
          Il peut s&#39;agir d&#39;un simple chiffre. Par exemple, en résolvant
          ce problème, nous sommes en mesure d&#39;augmenter le nombre
          d&#39;utilisateurs actifs de{" "}
        </span>

        <span className="[font-family:'SF_Pro_Display-Bold',Helvetica] font-bold text-black tracking-[0]">
          20%
        </span>

        <span className="font-medium tracking-[0]"> 🎉</span>
      </p>
    </div>
  );
}

export function ElementHomeWorkContactSubsection() {
  return (
    <>
      <SectionBase
        isCallToAction
        sectionClassName="md:max-w-[80%] mx-auto"
        cardContentClassName="p-4 md:p-6"
        className={cn(
          "size-full max-w md:gap-16 px-6 py-12 md:px-14 md:py-20 squircle squircle-smooth-xl squircle-6xl squircle-white overflow-hidden"
        )}
      >
        <EmojiPlaceholder
          src="/image-1310-2.png"
          //isMobileHidden
          className="size-fit md:size-fit aspect-square p-16 border-8 md:border-12 border-zinc-100"
          imgContainerClassName="size-11 md:size-20"
        />
        <ContentSection />
      </SectionBase>
    </>
  );
};
