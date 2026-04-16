"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { pickRandomColor } from "@/utils/pick-random-color";
import { Card, CardContent } from "@/components/ui/card";
import { getDateDifference } from "@/utils";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { useTranslations } from "use-intl";
import { DEFAULT_COLOR_CODE_NAME_TYPE } from "@/types";

export function ProjectDetailsSection({
  content,
  duration,
  tags,
  role,
}: {
  content: string;
  duration: Array<string | null>;
  tags: { name: string }[];
  role?: string[];
}) {
  const t = useTranslations();

  return (
    <section className="relative w-full">
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl mx-auto place-content-center justify-center gap-6 md:gap-20">
        <div className="flex flex-col w-full md:max-w-[60%] items-start gap-4 md:gap-8">
          <h2 className="relative self-stretch h3">
            {t("common.shared.text.presentation")}
          </h2>

          <MarkdownContentRender content={content} />
        </div>

        <Card className="squircle size-full md:max-w-[30%] squircle-b-base squircle-4xl squircle-smooth-md border-0 overflow-hidden mx-auto">
          <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
            <div className="flex relative flex-col gap-6 md:gap-8 items-start justify-between p-6 md:p-8 squircle squircle-smooth-sm squircle-2xl squircle-sh-white overflow-hidden">
              {role && (
                <div className="flex w-full flex-col gap-2">
                  <span className="font-normal text-b-white-foreground">
                    {t("common.shared.text.role")}
                  </span>

                  <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                    {role.map((role, index) => (
                      <Badge
                        key={index}
                        className={
                          index % 2 === 0
                            ? pickRandomColor(DEFAULT_COLOR_CODE_NAME_TYPE.PINK)
                            : pickRandomColor(
                                DEFAULT_COLOR_CODE_NAME_TYPE.YELLOW,
                              )
                        }
                        variant="colored"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {Array.isArray(duration) &&
                duration.length >= 1 &&
                duration.every((d) => typeof d === "string") && (
                  <>
                    <div className="flex flex-col md:flex-row gap-2 w-full">
                      <div className="flex w-full flex-col gap-2">
                        <span className="font-normal text-b-white-foreground">
                          {t("common.shared.text.duration")}
                        </span>

                        <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                          <Badge
                            className={pickRandomColor(
                              DEFAULT_COLOR_CODE_NAME_TYPE.PURPLE,
                            )}
                            variant="colored"
                          >
                            {getDateDifference(duration).toString()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <span className="font-normal text-b-white-foreground">
                          {t("common.shared.text.year")}
                        </span>

                        <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                          <Badge
                            className={pickRandomColor(
                              DEFAULT_COLOR_CODE_NAME_TYPE.GREENISH_YELLOW,
                            )}
                            variant="colored"
                          >
                            {new Date(duration[0] || "").getFullYear()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              <div className="flex w-full flex-col gap-2">
                <span className="font-normal text-b-white-foreground">
                  {t("common.shared.text.stack")}
                </span>

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
