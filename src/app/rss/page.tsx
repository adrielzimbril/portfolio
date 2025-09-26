import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/data/config";

type RssFormat = 'rss' | 'atom' | 'json';

export async function generateMetadata(
  { params }: { params: any },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = `RSS Feed - ${siteConfig.name}`;
  const description = `Subscribe to the RSS feed to follow the latest news, projects and resources of ${siteConfig.name}`;
  
  return {
    title,
    description,
    alternates: {
      types: {
        'application/rss+xml': '/rss',
        'application/atom+xml': '/rss/atom',
        'application/feed+json': '/rss/json',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

type SearchParams = {
  searchParams: {
    format?: RssFormat;
  };
};

export default function RssPage({ searchParams }: SearchParams) {
  const format = searchParams?.format || 'rss';
  
  // Redirect to the appropriate feed format
  if (format === 'atom') {
    redirect('/rss/atom');
  } else if (format === 'json') {
    redirect('/rss/json');
  } else {
    redirect('/rss');
  }
}
