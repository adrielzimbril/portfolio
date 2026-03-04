"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { pickRandomColor } from "@/utils/pick-random-color";
import { Card, CardContent } from "@/components/ui/card";
import { cn, getHumanDate } from "@/utils";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { useTranslations } from "use-intl";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types";

export function QuestDetailsSection({
  content,
  tags,
  dates,
  rewards,
}: {
  content: string;
  slug: string;
  tags: { name: string; meta?: Record<string, any> }[];
  dates: {
    registration_end: string;
    submission_end: string;
    results: string;
  };
  rewards: string[];
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

          {rewards.length > 0 && (
            <div className="flex w-full flex-col gap-3 md:gap-4">
              <h3 className="h3">{t("quests.inner-page.details.rewardsTitle")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full">
                {rewards.map((reward, index) => (
                  <Card
                    key={`${reward}-${index}`}
                    className={cn(
                      "squircle squircle-b-base squircle-2xl squircle-smooth-md border-0 overflow-hidden",
                      index === 0 ? "col-span-2" : "col-span-2",
                    )}
                  >
                    <CardContent className="p-2 md:p-3">
                      <div className="flex relative flex-col size-full gap-6 md:gap-8 items-start justify-between p-2 md:p-4 squircle squircle-smooth-sm squircle-xl squircle-sh-white overflow-hidden">
                        <div className="flex size-full flex-col gap-2">
                          <p className="text-b-white-foreground leading-[130%]">{reward}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <Card className="squircle size-full md:max-w-[30%] squircle-b-base squircle-4xl squircle-smooth-md border-0 overflow-hidden mx-auto">
          <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
            <div className="flex relative flex-col gap-6 md:gap-8 items-start justify-between p-6 md:p-8 squircle squircle-smooth-sm squircle-2xl squircle-sh-white overflow-hidden">
              <div className="flex w-full flex-col gap-2">
                <span className="font-normal text-b-white-foreground">
                  {t("quests.inner-page.details.dates.registrationEnd")}
                </span>

                <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                  <Badge
                    className={pickRandomColor(
                      DEFAULT_COLOR_CODE_NAME_LIST.GREENISH_YELLOW,
                    )}
                    variant="colored"
                  >
                    {getHumanDate(dates.registration_end, true)}
                  </Badge>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <span className="font-normal text-b-white-foreground">
                  {t("quests.inner-page.details.dates.submissionDeadline")}
                </span>

                <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                  <Badge
                    className={pickRandomColor(DEFAULT_COLOR_CODE_NAME_LIST.BLUE)}
                    variant="colored"
                  >
                    {getHumanDate(dates.submission_end, true)}
                  </Badge>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <span className="font-normal text-b-white-foreground">
                  {t("quests.inner-page.details.dates.resultsAnnouncement")}
                </span>

                <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                  <Badge
                    className={pickRandomColor(DEFAULT_COLOR_CODE_NAME_LIST.PURPLE)}
                    variant="colored"
                  >
                    {getHumanDate(dates.results, true)}
                  </Badge>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <span className="font-normal text-b-white-foreground">
                  {t("quests.inner-page.details.status")}
                </span>

                <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className={pickRandomColor(tag.meta?.color)}
                      variant="colored"
                    >
                      {tag.name}
                    </Badge>
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
