import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeaderSection() {
  return (
    <section className="h-[689px] relative w-full bg-greys-00 flex items-center justify-center">
      <Card className="w-[1136px] bg-[#f9f9f9] rounded-[64px] border-none shadow-none">
        <CardContent className="px-12 py-16">
          <div className="flex flex-col items-start gap-6 max-w-full">
            <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Transformez vos idées en produits que vos utilisateurs adorent
            </h1>

            <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de] text-[28px] tracking-[0] leading-[33.6px]">
              Product designer spécialisé dans la simplification des expériences
              SaaS + formateur pour les équipes qui veulent créer l&#39;évidence
              plutôt que la complexité
            </p>

            <div className="flex items-start gap-3">
              <Button className="px-6 py-[13px] bg-greys-08 rounded-xl h-auto hover:bg-greys-08/90 text-text-iconsdark-high-emphasis [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px]">
                Discutons 👋
              </Button>

              <Button
                variant="secondary"
                className="px-4 py-[13px] bg-[#ffffff80] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] rounded-xl h-auto hover:bg-[#ffffff90] text-[#000000de] [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-[17px] tracking-[0.07px] leading-[22px]"
              >
                Voir mes projets client 􀄩
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
