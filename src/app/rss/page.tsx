import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/data/config";

export async function generateMetadata(
  { params }: { params: any },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `RSS Feed - ${siteConfig.name}`,
    description: `Subscribe to the RSS feed to follow the latest news, projects and resources of ${siteConfig.name}`,
    alternates: {
      types: {
        "application/rss+xml": "/api/rss",
      },
    },
  };
}

export default function RssPage() {
  // Redirect to the RSS feed
  redirect("/api/rss");
}
