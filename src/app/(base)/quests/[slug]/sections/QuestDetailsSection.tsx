"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { pickRandomColor } from "@/utils/pick-random-color";
import { Card, CardContent } from "@/components/ui/card";
import { getHumanDate, getQuestAskUrl } from "@/utils";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { useTranslations } from "use-intl";
import { DEFAULT_COLOR_CODE_NAME_LIST, QuestAskType } from "@/types";
import { Link } from "@/components/ui/link";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib";

export function QuestDetailsSection({
  content,
  slug,
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
              <h3 className="h4">Récompenses 🎁</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full">
                {rewards.map((reward, index) => (
                  <Card
                    key={`${reward}-${index}`}
                    className="squircle squircle-b-base squircle-2xl squircle-smooth-md border-0 overflow-hidden"
                  >
                    <CardContent className="p-2 md:p-3">
                      <div className="flex relative flex-col gap-6 md:gap-8 items-start justify-between p-2 md:p-4 squircle squircle-smooth-sm squircle-xl squircle-sh-white overflow-hidden">
                        <div className="flex w-full flex-col gap-2">
                          <p className="text-b-white-foreground leading-[130%]">
                            🪽 {reward}
                          </p>
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
                  📅 Fin des inscriptions
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
                  📤 Date limite de soumission
                </span>

                <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                  <Badge
                    className={pickRandomColor(
                      DEFAULT_COLOR_CODE_NAME_LIST.BLUE,
                    )}
                    variant="colored"
                  >
                    {getHumanDate(dates.submission_end, true)}
                  </Badge>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <span className="font-normal text-b-white-foreground">
                  🏆 Annonce des résultats
                </span>

                <div className="flex flex-wrap items-start gap-2 self-stretch w-full">
                  <Badge
                    className={pickRandomColor(
                      DEFAULT_COLOR_CODE_NAME_LIST.PURPLE,
                    )}
                    variant="colored"
                  >
                    {getHumanDate(dates.results, true)}
                  </Badge>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <span className="font-normal text-b-white-foreground">
                  🧙🏼 Statut
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

              {(!isRegistrationClosed(dates.registration_end) ||
                !isSubmissionClosed(dates.submission_end, dates.results)) && (
                <div className="flex w-full flex-wrap gap-2">
                  {!isRegistrationClosed(dates.registration_end) && (
                    <Link
                      href={getQuestAskUrl(slug, QuestAskType.ENROLL)}
                      asFull
                      likeButton
                      whileTap
                    >
                      S&apos;inscrire au challenge 📝
                    </Link>
                  )}
                  {!isSubmissionClosed(dates.submission_end, dates.results) && (
                    <Link
                      href={getQuestAskUrl(slug, QuestAskType.SUBMIT)}
                      asFull
                      likeButton
                      whileTap
                      variant="secondary"
                    >
                      Soumettre son travail 🚀
                    </Link>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
