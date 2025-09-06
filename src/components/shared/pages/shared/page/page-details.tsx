import React from "react";
import { MarkdownContentRender } from "@/components/shared/pages/shared/markdown-content-render";
import { cn } from "@/utils";

// Interface for page details props
interface PageDetailsProps {
  content: string;
  className?: string;
}

// Component to render page details
export function PageDetails({ content, className }: PageDetailsProps) {
  return (
    <section className="relative w-full">
      <div className="relative w-full max-w-3xl mx-auto">
        <div
          className={cn(
            "flex flex-col w-full max-w-[90%] mx-auto items-start justify-center gap-4 md:gap-8 relative",
            className
          )}
        >
          <h2 className="relative self-stretch h3 font-normal-not">
            Présentation
          </h2>

          <MarkdownContentRender content={content} />
        </div>
      </div>
    </section>
  );
}
