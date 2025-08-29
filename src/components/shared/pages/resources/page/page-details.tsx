import React from "react";
import { PreviewValueCard } from "@/components/shared/pages/shared/page/preview-value-card";

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

// Utility function to convert basic markdown to HTML
function parseBasicMarkdown(text: string): string {
  return (
    text
      // Bold **text** or __text__
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>")
      // Italic *text* or _text_
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      // Link [texte](url)
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline">$1</a>'
      )
      // Line break double for paragraphs
      .replace(/\n\n/g, "<br/><br/>")
      // Line break simple
      .replace(/\n/g, "<br/>")
      // Code inline `code`
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>'
      )
  );
}

// Component to render formatted text
function FormattedText({
  children,
  useMarkdown = false,
}: {
  children?: string;
  useMarkdown?: boolean;
}) {
  if (!children) return null;

  if (useMarkdown) {
    const htmlContent = parseBasicMarkdown(children);
    return <p dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  return <p dangerouslySetInnerHTML={{ __html: children }} />;
}

// Component to render page details
export function PageDetails({
  descriptionTop,
  descriptionBottom,
  previewValueCard,
  useMarkdown,
}: PageDetailsProps) {
  return (
    <section className="relative w-full">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="flex flex-col w-full md:max-w-[90%] mx-auto items-start justify-center gap-8 relative">
          <h2 className="relative self-stretch h3 font-normal">Présentation</h2>

          <div className="flex flex-col gap-8 md:gap-12 text-zinc-500 font-normal text-base">
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
