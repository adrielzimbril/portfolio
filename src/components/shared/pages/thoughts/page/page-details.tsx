import React from "react";
import { ResourcePageMarkdownContent } from "@/module/content/components/blog/Content";

// Interface for page details props
interface PageDetailsProps {
  content: string;
}

// Component to render page details
export function PageDetails({ content }: PageDetailsProps) {
  return (
    <section className="relative w-full">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="flex flex-col w-full max-w-[90%] mx-auto items-start justify-center gap-4 relative">
          <h2 className="relative self-stretch h3 font-normal">Présentation</h2>

          <div className="flex flex-col gap-8 md:gap-12 text-zinc-500 font-normal text-base w-full">
            <ResourcePageMarkdownContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
}
