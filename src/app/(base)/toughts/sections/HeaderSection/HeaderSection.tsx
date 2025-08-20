import { LightbulbIcon } from "lucide-react";
import React from "react";

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="w-full bg-greys-00 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between px-12 py-16 bg-[#f9f9f9] rounded-[64px]">
          <div className="flex flex-col items-start gap-6 flex-1 pr-8">
            <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Réflexions
            </h1>

            <p className="text-[28px] tracking-[0] leading-[33.6px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de]">
              Voici un espace où vous pouvez publier des articles sur vraiment
              tout, par exemple des conseils sur le design, des engrenages qui
              boostent votre productivité
            </p>
          </div>

          <div className="flex-shrink-0">
            <LightbulbIcon className="w-[464px] h-[464px] text-yellow-400" />
          </div>
        </div>
      </div>
    </section>
  );
};
