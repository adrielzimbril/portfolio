import { HeaderSection as ThoughtHeaderSection } from "@/components/shared/pages/thoughts/page/header-section";

const metadataItems = { date: "18, Jul 2024", readTime: "08", views: "90k" };
const tags = [
  "SaaS 🦄",
  "Go To Market 🎯",
  "Web Application 📝",
  "Design 🎨",
  "Mobile App 📱",
];

export function HeaderSection() {
  return (
    <ThoughtHeaderSection
      previewContent={{
        type: "text",
        emoji: "😎",
        title: "I made you looked.",
        subtitle: "You can have the rest of the empty space here.",
      }}
      mainTitle="My Evolved Blogfolio in 2025"
      tags={tags}
      articleDetails={{
        date: metadataItems.date,
        minRead: metadataItems.readTime,
        views: metadataItems.views,
      }}
    />
  );
}
