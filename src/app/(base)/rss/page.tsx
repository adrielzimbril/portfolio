import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Locale } from "@/types";
import { routes } from "@/data/routes";

enum RssFormat {
  RSS = "rss",
  ATOM = "atom",
  JSON = "json",
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("rss.title"),
    description: t("rss.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("rss.title"),
      description: t("rss.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("rss.title"),
      description: t("rss.description"),
    },
    alternates: {
      ...baseMetadata.alternates,
      types: {
        "application/rss+xml": routes.rss.link,
        "application/atom+xml": routes.rssAtom.link,
        "application/feed+json": routes.rssJson.link,
      },
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
