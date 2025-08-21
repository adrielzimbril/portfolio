import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const contentParagraphs = [
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data",
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.",
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.",
];

const additionalParagraphs = [
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data",
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.",
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.",
];

const finalParagraphs = [
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data",
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.",
  "You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.",
];

export const ProjectsSection () {
  return (
    <section className="w-full bg-greys-00">
      <div className="flex justify-center px-12 py-16">
        <div className="flex justify-center max-w-[961px] w-full">
          <div className="flex flex-col max-w-[606px] w-full gap-8">
            <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Content
            </h1>

            <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px]">
              {contentParagraphs.map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  {index < contentParagraphs.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Card className="bg-white rounded-[48px] border-[16px] border-solid border-[#f5f5f599] overflow-hidden">
              <CardContent className="flex flex-col gap-12 p-12">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-[#f9f9f9] text-[#00000099] text-2xl font-medium tracking-[0.02px] leading-[28.8px] px-4 py-4 rounded-2xl [font-family:'SF_Pro_Display-Medium',Helvetica]"
                  >
                    Pourquoi
                  </Badge>

                  <div className="inline-flex items-center p-4 bg-[#f5f5f599] rounded-[75px] overflow-hidden">
                    <div className="w-[32.0px] h-[32.0px] bg-[url(/emoji-true.png)] bg-cover bg-[50%_50%]" />
                  </div>
                </div>

                <h2 className="[font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[34px] tracking-[0.14px] leading-[40.8px]">
                  Pourquoi ce problème est-il important pour les utilisateurs,
                  les avantages de la résolution de ce problème ?
                </h2>

                <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px]">
                  Carte des propositions de valeur
                </p>
              </CardContent>
            </Card>

            <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px]">
              {additionalParagraphs.map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  {index < additionalParagraphs.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="[font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px]">
              {finalParagraphs.map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  {index < finalParagraphs.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
