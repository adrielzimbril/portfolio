import React from "react";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { cn } from "@/utils/utils";
import { FormattedText } from "@/components/shared/formatted-text";
import { getImageUrl } from "@/utils/base-url";

function ContentSection({
  description,
  subDescription,
}: {
  description: string;
  subDescription?: string;
}) {
  return (
    <div className="flex flex-col gap-4 items-start justify-start relative md:max-w-[55%]">
      <h2 className="relative">Objectif ?</h2>
      <p className="relative text-lg md:text-2xl leading-[120%] md:mb-4">
        {description}
      </p>
      {subDescription && (
        <FormattedText className="relative text-base text-zinc-500">
          {subDescription}
        </FormattedText>
      )}
    </div>
  );
}

export function GoalResearchSection({
  description,
  subDescription,
}: {
  description: string;
  subDescription?: string;
}) {
  return (
    <>
      <SectionBase
        isCallToAction
        sectionClassName="md:max-w-[80%] mx-auto"
        cardContentClassName="p-4 md:p-6"
        className={cn(
          "size-full max-w md:gap-16 px-6 py-12 md:px-14 md:py-20 squircle squircle-smooth-xl squircle-6xl squircle-white overflow-hidden"
        )}
      >
        <EmojiPlaceholder
          src={getImageUrl("/image-1310-2.png")}
          //isMobileHidden
          variant="bordered"
        />
        <ContentSection
          description={description}
          subDescription={subDescription}
        />
      </SectionBase>
    </>
  );
}
