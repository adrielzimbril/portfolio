import React from "react";
import { Badge } from "@/components/ui/badge";
import { pickRandomColor } from "@/lib/pickRandomColor";
import { FormattedText } from "@/components/shared/formatted-text";

const projectDetails = {
  role: ["Product designer", "product designer"],
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
            <h2 className="relative self-stretch h3">Présentation</h2>

            <FormattedText useMarkdown className="font-normal">
              {`
              You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
              
              You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
              
              You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
              `}
            </FormattedText>
          </div>

          <div className="inline-flex flex-col items-start justify-center gap-8 flex-[0_0_auto]">
            <div className="flex w-[199px] gap-4 flex-col items-start flex-[0_0_auto]">
              <span className="font-normal text-zinc-700">Role</span>

              <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                {projectDetails.role.map((role, index) => (
                  <Badge
                    key={index}
                    className={
                      index % 2 === 0
                        ? pickRandomColor("INDIGO")
                        : pickRandomColor("YELLOW")
                    }
                    variant="colored"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex w-[199px] gap-4 flex-col items-start flex-[0_0_auto]">
              <span className="font-normal text-zinc-700">Durée</span>

              <p className="text-sm text-zinc-500">{projectDetails.duration}</p>
            </div>

            <div className="flex w-[199px] gap-4 flex-col items-start flex-[0_0_auto]">
              <span className="font-normal text-zinc-700">Résultats</span>

              <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                {projectDetails.results.map((result, index) => (
                  <Badge key={index}>{result}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
