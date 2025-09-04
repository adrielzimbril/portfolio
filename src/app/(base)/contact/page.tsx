"use client";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import Cal, { getCalApi } from "@calcom/embed-react";

const tags = ["Adriel Zimbril 🦄", "Shirospace 🚀", "Aurthle ✨"];

export default function Newsletter() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "hello-adrielzimbril" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <>
      <SectionBase
        sectionClassName="w-full"
        sectionContentClassName="w-full"
        cardClassName="w-full"
        cardContentClassName="w-full p-6 md:p-8"
        //cardContentClassName="squircle squircle-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60"
        className="squircle squircle-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
      >
        <div
          className={cn(
            "flex relative flex-col min-h-60 items-center justify-center text-center p-4 gap-4 max-w-4xl mx-auto"
            // isWide && "md:min-h-96"
          )}
        >
          <div
            className={
              "flex relative flex-col items-center justify-center text-center pb-2 gap-3 md:gap-4"
            }
          >
            <Badge className="relative text-base font-normal md:font-medium md:text-xl max-w-3xl leading-[120%] text-zinc-600">
              Pour les développeurs freelances qui galèrent à trouver des
              clients.
            </Badge>
            <h2 className="self-stretch">
              Trouve des clients en continu grâce à la méthode Tsunami 🌊
            </h2>
            <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-[120%] text-zinc-600">
              Je te montre comment utiliser l&#39;IA et l&#39;AUTOMATISATION
              pour trouver des missions en boucle.
            </p>
          </div>
          <Cal
            namespace="shiro-decouverte"
            calLink="shirospace-saas-agency/shiro-decouverte"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            className="squircle squircle-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden size-full"
            config={{ layout: "month_view" }}
          />

          <div className="flex flex-col items-start gap-4 w-full md:max-w-[80%]">
            <Input
              placeholder="😏 vous voulez recevoir des cadeaux ?"
              type="email"
            />
            <Button
              asFull
              whileTap
              asPointer
              data-cal-namespace="shiro-decouverte"
              data-cal-link="shirospace-saas-agency/shiro-decouverte"
              data-cal-config='{"layout":"month_view"}'
            >
              <span className="[font-family:'SF_Pro_Text-Bold',Helvetica] font-bold text-text-iconsdark-high-emphasis text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
                Recevoir !🦄
              </span>
            </Button>{" "}
            <Button asFull whileTap asPointer>
              <span className="font-bold text-base">Recevoir !🦄</span>
            </Button>
          </div>
        </div>
      </SectionBase>
    </>
  );
}
