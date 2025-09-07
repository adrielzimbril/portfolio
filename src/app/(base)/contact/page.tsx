"use client";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
            "flex relative flex-col min-h-60 items-center justify-center text-center p-4 gap-4 md:gap-8 max-w-5xl mx-auto"
            // isWide && "md:min-h-96"
          )}
        >
          <div className="flex relative flex-col items-center justify-center text-center pb-2 gap-3 md:gap-4">
            <Badge className="relative text-base font-normal md:font-medium md:text-xl max-w-3xl leading-[115%] text-zinc-600">
              Problem Solver & Your SaaS Product designer ❣️
            </Badge>
            <h2 className="self-stretch">
              Transforme tes idées en produits que tes utilisateurs adorent 🦄
            </h2>
            <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-[120%] text-zinc-600"></p>
          </div>

          <Cal
            namespace="shiro-decouverte"
            calLink="shirospace-saas-agency/shiro-decouverte"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            className="squircle squircle-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden size-full"
            config={{ layout: "month_view" }}
          />

          <div
            className={cn(
              "flex flex-col items-start gap-4 w-full md:max-w-[80%]",
              "hidden"
            )}
          >
            <Button
              asFull
              whileTap
              asPointer
              data-cal-namespace="shiro-decouverte"
              data-cal-link="shirospace-saas-agency/shiro-decouverte"
              data-cal-config='{"layout":"month_view"}'
              className={cn("hidden")}
            >
              <span className="font-bold text-base">Recevoir !🦄</span>
            </Button>
          </div>
        </div>
      </SectionBase>
    </>
  );
}
