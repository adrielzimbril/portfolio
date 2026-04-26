import React from "react";
import { PreviewValueCard } from "@/components/shared/pages/shared/page/preview-value-card";
import { FormattedText } from "@/components/shared/formatted-text";
import { useTranslations } from "next-intl";

// Interface for page details props
interface PageDetailsProps {
  descriptionTop?: string;
  descriptionBottom?: string;
  previewValueCard?: {
    icon: string;
    badge: string;
    title: string;
    description: string;
  };
  useMarkdown?: boolean;
}

// Component to render page details
export function PageDetails({
  descriptionTop,
  descriptionBottom,
  previewValueCard,
  useMarkdown,
}: PageDetailsProps) {
  const t = useTranslations("common.shared.text");

  return (
    <section className="relative w-full">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="flex flex-col w-full max-w-[90%] mx-auto items-start justify-center gap-4 relative">
          <h2 className="relative self-stretch h3 font-normal">
            {t("heading_presentation")}
          </h2>

          <div className="flex flex-col gap-8 md:gap-12 text-b-white-invert-thr font-normal text-base">
            {/* Top description */}
            {descriptionTop && (
              <FormattedText useMarkdown={useMarkdown}>
                {descriptionTop}
              </FormattedText>
            )}

            {/* Preview value card */}
            {previewValueCard && (
              <PreviewValueCard
                icon={previewValueCard.icon}
                badge={previewValueCard.badge}
                title={previewValueCard.title}
                description={previewValueCard.description}
              />
            )}

            {/* Bottom description */}
            {descriptionBottom && (
              <FormattedText useMarkdown={useMarkdown}>
                {descriptionBottom}
              </FormattedText>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
