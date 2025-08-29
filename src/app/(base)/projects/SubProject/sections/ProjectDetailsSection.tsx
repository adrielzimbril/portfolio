import React from "react";
import { Badge } from "@/components/ui/badge";

const projectDetails = {
  role: "Product designer, product designer",
  duration: "12 Semaines",
  results: [
    "Website",
    "Website design",
    "Website design",
    "Website",
    "Website",
    "Website design",
  ],
};

export function ProjectDetailsSection() {
  return (
    <section className="w-full bg-greys-00">
      <div className="flex items-center justify-center gap-[92px] px-12 py-16 rounded-[64px]">
        <div className="flex w-full max-w-[1024px] items-center gap-[92px]">
          <div className="flex flex-col w-[606px] items-start gap-8">
            <h1 className="self-stretch font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Présentation
            </h1>

            <div className="w-[522px] [font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px]">
              You can add what outcomes has this project brought after your
              design! For example, can show some real data.You can add what
              outcomes has this project brought after your design! For example,
              can show some real data
              <br />
              <br />
              You can add what outcomes has this project brought after your
              design! For example, can show some real data.You can add what
              outcomes has this project brought after your design! For example,
              can show some real data.You can add what outcomes has this project
              brought after your design! For example, can show some real data.
              <br />
              <br />
              You can add what outcomes has this project brought after your
              design! For example, can show some real data.You can add what
              outcomes has this project brought after your design! For example,
              can show some real data.You can add what outcomes has this project
              brought after your design! For example, can show some real data.
            </div>
          </div>

          <div className="inline-flex flex-col items-start justify-center gap-8 flex-[0_0_auto]">
            <div className="flex w-[199px] gap-4 flex-col items-start flex-[0_0_auto]">
              <h3 className="self-stretch [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-text-iconslight-high-emphasis text-[17px] tracking-[0.04px] leading-[17px]">
                Role
              </h3>

              <p className="w-[199px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-[15px] tracking-[0.01px] leading-[18.0px]">
                {projectDetails.role}
              </p>
            </div>

            <div className="flex w-[199px] gap-4 flex-col items-start flex-[0_0_auto]">
              <h3 className="self-stretch [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-text-iconslight-high-emphasis text-[17px] tracking-[0.04px] leading-[17px]">
                Durée
              </h3>

              <p className="w-[199px] [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-[15px] tracking-[0.01px] leading-[18.0px]">
                {projectDetails.duration}
              </p>
            </div>

            <div className="flex w-[199px] gap-4 flex-col items-start flex-[0_0_auto]">
              <h3 className="self-stretch [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-text-iconslight-high-emphasis text-[17px] tracking-[0.04px] leading-[17px]">
                Résultats
              </h3>

              <div className="flex flex-wrap items-start gap-[8px_8px] self-stretch w-full flex-[0_0_auto]">
                {projectDetails.results.map((result, index) => (
                  <Badge
                    key={`result-${index}`}
                    variant="secondary"
                    className="bg-[#f5f5f5cc] rounded-lg inline-flex items-center justify-center gap-2.5 px-3 py-1.5 flex-[0_0_auto] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-[#000000de] text-xs tracking-[0] leading-4 whitespace-nowrap"
                  >
                    {result}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
