import React from "react";
import { Button } from "../../../../components/ui/button";

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="w-full bg-greys-00 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between px-12 py-16 bg-[#f9f9f9] rounded-[64px]">
          <div className="flex flex-col items-start gap-6 flex-1 max-w-2xl">
            <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Shop
            </h1>

            <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de] text-[28px] tracking-[0] leading-[33.6px]">
              Donnez à votre entreprise les moyens d&#39;une conception centrée
              sur l&#39;utilisateur et de l&#39;IA pour offrir des expériences
              client fluides et accélérer la croissance.
            </p>

            <Button className="px-6 py-[13px] bg-greys-08 rounded-xl h-auto hover:bg-greys-06 transition-colors">
              <span className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconsdark-high-emphasis text-[17px] tracking-[0.07px] leading-[22px]">
                Voir mes ressources 􀄩
              </span>
            </Button>
          </div>

          <div className="flex-shrink-0 ml-8">
            <img
              className="w-[464px] h-[464px]"
              alt="Element icons image"
              src="/03-icons---image---placeholder.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
