import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectsSection() {
  return (
    <section className="w-full relative bg-greys-00">
      <div className="flex w-full max-w-[1136px] mx-auto items-start justify-center px-12 py-16 relative">
        <div className="flex w-full max-w-[961px] items-start justify-center relative">
          <div className="flex flex-col w-full max-w-[606px] items-start gap-8 relative">
            <h1 className="relative self-stretch mt-[-1.00px] font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Présentation
            </h1>

            <p className="relative self-stretch [font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px]">
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
            </p>

            <Card className="relative self-stretch w-full bg-white rounded-[48px] border-[16px] border-solid border-[#f5f5f599]">
              <CardContent className="flex flex-col items-start justify-center gap-12 p-12">
                <div className="flex items-center justify-between px-1 py-0 relative self-stretch w-full">
                  <Badge className="inline-flex items-center p-4 bg-[#f9f9f9] rounded-2xl text-[#00000099] text-2xl font-medium [font-family:'SF_Pro_Display-Medium',Helvetica] tracking-[0.02px] leading-[28.8px] hover:bg-[#f9f9f9]">
                    Pourquoi
                  </Badge>

                  <div className="inline-flex items-center p-4 bg-[#f5f5f599] rounded-[75px]">
                    <div className="relative w-[32.0px] h-[32.0px] bg-[url(/emoji-true.png)] bg-cover bg-[50%_50%]" />
                  </div>
                </div>

                <h2 className="relative self-stretch [font-family:'SF_Pro_Display-Semibold',Helvetica] font-normal text-[#000000de] text-[34px] tracking-[0.14px] leading-[40.8px]">
                  Pourquoi ce problème est-il important pour les utilisateurs,
                  les avantages de la résolution de ce problème ?
                </h2>

                <p className="relative w-fit [font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px] whitespace-nowrap">
                  Carte des propositions de valeur
                </p>
              </CardContent>
            </Card>

            <p className="relative self-stretch [font-family:'SF_Pro_Display-Regular',Helvetica] font-normal text-[#00000099] text-[17px] tracking-[0.01px] leading-[20.4px]">
              Tu vas enfin comprendre quoi dire à ChatGPT pour obtenir des
              réponses précises, puissantes et actionnables.
              <br />
              <br />
              Voici comment faire :<br />✅ Clique sur &quot;acheter
              maintenant&quot;
              <br />✅ Remplis le formulaire et choisis ton mode de paiement
              <br />✅ Valide le paiement
              <br />✅ Reviens sur la page pour télécharger immédiatement toutes
              tes ressources
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
