import { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/data/config";
import { Locale } from "@/types";
import { routes } from "@/data/routes";

enum RssFormat {
  RSS = "rss",
  ATOM = "atom",
  JSON = "json",
}

export async function generateMetadata(): Promise<Metadata> {
  const title = `Flux RSS - ${siteConfig.name}`;
  const description = `Abonne-toi au flux RSS pour suivre les dernières actualités, projets et ressources de ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      types: {
        "application/rss+xml": "/rss",
        "application/atom+xml": "/rss/atom",
        "application/feed+json": "/rss/json",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

interface PageParams {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function RssPage(props: { params: Promise<PageParams> }) {
  const { params, searchParams } = await props.params;
  const format =
    (searchParams?.format as RssFormat | undefined) || RssFormat.RSS;
  const locale = params?.locale || Locale.FR;

  if (format === RssFormat.ATOM) {
    redirect(`${routes.rssAtom.link}?locale=${locale}`);
  } else if (format === RssFormat.JSON) {
    redirect(`${routes.rssJson.link}?locale=${locale}`);
  } else {
    redirect(`${routes.rss.link}?locale=${locale}`);
  }
}
