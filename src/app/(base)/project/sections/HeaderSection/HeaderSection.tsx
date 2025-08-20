import React from "react";
import { Button } from "../../../../components/ui/button";

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-greys-00">
      <div className="flex max-w-[1136px] mx-auto items-center justify-between px-12 py-16 bg-[#f9f9f9] rounded-[64px] gap-8">
        <div className="flex flex-col items-start gap-6 flex-1">
          <h1 className="text-[64px] font-normal text-text-iconslight-high-emphasis leading-[100%] tracking-[0.14px] [font-family:'SF_Pro_Display',Helvetica]">
            Mes projets
          </h1>

          <p className="text-[28px] font-medium text-[#000000de] leading-[33.6px] tracking-[0] [font-family:'SF_Pro_Display-Medium',Helvetica]">
            Donnez à votre entreprise les moyens d&#39;une conception centrée
            sur l&#39;utilisateur et de l&#39;IA pour offrir des expériences
            client fluides et accélérer la croissance.
          </p>

          <div className="flex items-start">
            <Button className="px-6 py-[13px] bg-greys-08 rounded-xl text-text-iconsdark-high-emphasis text-[17px] font-normal tracking-[0.07px] leading-[22px] [font-family:'SF_Pro_Text-Regular',Helvetica] h-auto hover:bg-greys-06">
              Voir mes projets 􀄩
            </Button>
          </div>
        </div>

        <div className="relative w-[464px] h-[464px] bg-white rounded-full overflow-hidden flex-shrink-0">
          <div className="absolute w-[88px] h-[88px] top-[188px] left-[188px] bg-[url(/image-657.png)] bg-cover bg-center" />
        </div>
      </div>
    </section>
  );
};
