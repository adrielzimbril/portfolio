import React from "react";
import { routes } from "@/data/route";
import { HeaderSection } from "@/components/shared/pages/resources/page/header-section";
import { ResourceHeaderTag } from "@/types/componentType";
import { PreviewContentType } from "@/types";

const tags: ResourceHeaderTag[] = [
  {
    text: "SaaS 🦄",
    bgColor: "squircle-[#afffad]",
  },
  {
    text: "Go To Market 🎯",
    bgColor: "squircle-[#ffe9ad]",
  },
  {
    text: "Web Application 📝",
    bgColor: "squircle-[#ade9ff]",
  },
  {
    text: "Design 🎨",
    bgColor: "squircle-[#f9f9f9]",
  },
  {
    text: "Mobile App 📱",
    bgColor: "squircle-[#e2e4ff]",
  },
];

function ExampleBasic() {
  return (
    <HeaderSection
      previewContent={{
        type: PreviewContentType.TEXT,
        emoji: "😎",
        title: "I made you looked.",
        subtitle: "You can have the rest of the empty space here.",
      }}
      mainTitle="Design System × Product Thinking"
      tags={tags.map((tag) => ({ name: tag.text, color: tag.bgColor }))}
      ctaButton={routes.contact.link}
    />
  );
}

export { ExampleBasic };
