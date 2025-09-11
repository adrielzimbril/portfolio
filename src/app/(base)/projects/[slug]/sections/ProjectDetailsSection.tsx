import React from "react";
import { Badge } from "@/components/ui/badge";
import { pickRandomColor } from "@/utils/pick-random-color";
import { FormattedText } from "@/components/shared/formatted-text";
import { Card, CardContent } from "@/components/ui/card";
import { getDateDifference } from "@/utils";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";

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

export function ProjectDetailsSection({
  content,
  duration,
  tags,
}: {
  content: string;
  duration: Array<string>;
  tags: { name: string }[];
}) {
  return (
    <section className="relative w-full">
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl mx-auto place-content-center justify-center gap-6 md:gap-20">
        <div className="flex flex-col w-full md:max-w-[60%] items-start gap-4 md:gap-8">
          <h2 className="relative self-stretch h3">Présentation</h2>

          <MarkdownContentRender content={content} />
        </div>

        <Card className="squircle size-full md:max-w-[30%] squircle-stone-100 squircle-6xl squircle-smooth-md border-0 overflow-hidden mx-auto">
          <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
            <div className="flex relative flex-col gap-6 md:gap-8 items-start justify-between p-6 md:p-8 squircle squircle-smooth-sm squircle-2xl md:squircle-4xl squircle-white overflow-hidden">
              <div className="flex w-full flex-col gap-2">
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

              {Array.isArray(duration) &&
                duration.length >= 1 &&
                duration.every((d) => typeof d === "string") && (
                  <div className="flex w-full flex-col gap-2">
                    <span className="font-normal text-zinc-700">Durée</span>

                    <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                      <Badge
                        className={pickRandomColor("PINKISH_BLUE")}
                        variant="colored"
                      >
                        {getDateDifference(duration).toString()}
                      </Badge>
                    </div>
                  </div>
                )}

              <div className="flex w-full flex-col gap-2">
                <span className="font-normal text-zinc-700">Résultats</span>

                <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                  {tags.map((tag, index) => (
                    <Badge key={index}>{tag.name}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
