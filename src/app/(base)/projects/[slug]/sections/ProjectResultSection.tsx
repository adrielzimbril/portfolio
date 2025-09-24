"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionLayout } from "@/components/shared/sections/layout";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { getImageUrl } from "@/utils/base-url";
import { FormattedText } from "@/components/shared/formatted-text";
import { useTranslations } from "use-intl";
import { getEmojiHub } from "@aurthle/emoji-hub";

export function ProjectResultSection({
  description,
  results,
}: {
  description: string;
  results: { badge: string; icon: string; content: string }[];
}) {
  const t = useTranslations();

  return (
    <>
      <SectionLayout
        title={t("projects.inner-page.project-result-section.title")}
        description={
          description ||
          t("projects.inner-page.project-result-section.description")
        }
        className="p-0"
        contentClassName="md:grid-cols-3"
      >
        {results.map((result, index) => (
          <Card
            key={index}
            className="squircle size-full max-w-[90%] md:max-w-full squircle-b-base squircle-6xl squircle-smooth-md border-0 overflow-hidden"
          >
            <CardContent className="grid grid-cols-1 size-full p-4 gap-2">
              <div
                className={cn(
                  "flex relative flex-col gap-6 md:gap-4 min-h-60 items-start justify-between p-6 md:p-8 squircle squircle-smooth-xl squircle-5xl squircle-sh-white overflow-hidden"
                )}
              >
                <Badge>{result.badge}</Badge>
                <div className="inline-flex items-center justify-center gap-3 p-4 aspect-square bg-b-base rounded-full overflow-hidden">
                  {/* <Image
                    width={100}
                    height={100}
                    className="size-8 object-cover pointer-events-none"
                    alt={result.badge}
                    //src={getImageUrl(getEmojiHub(result.icon!, "apple"))}
                    src={getImageUrl(
                      getEmojiHub(result.icon!, "fluent", "anim")
                    )}
                    //src={{ emoji: result.icon }}
                  /> */}
                  <span className="size-full flex items-center justify-center text-3xl object-cover pointer-events-none">
                    {result.icon}
                  </span>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                  <FormattedText
                    className="relative"
                    key={index}
                    inParagraph={false}
                  >
                    {result.content}
                  </FormattedText>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </SectionLayout>
    </>
  );
}
