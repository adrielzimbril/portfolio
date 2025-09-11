"use client";
import { DefaultSeo as NextDefaultSeo } from "next-seo";
import { siteConfig } from "@/data/config";
import { appConfig } from "@/data/app-config";

export function DefaultSeo() {
  const siteUrl = siteConfig.url;
  const localesKeys = Object.keys(appConfig.i18n.locales);
  return (
    <NextDefaultSeo
      title={siteConfig.details.nameShared}
      titleTemplate={`%s | ${siteConfig.details.nameShared}`}
      defaultTitle={siteConfig.details.nameShared}
      description={"Shissro - " + siteConfig.description}
      canonical={siteUrl}
      norobots={!siteConfig.seo.robots.index}
      dangerouslySetAllPagesToNoIndex={!siteConfig.seo.robots.index}
      dangerouslySetAllPagesToNoFollow={!siteConfig.seo.robots.follow}
      languageAlternates={localesKeys.map((locale) => ({
        hrefLang:
          appConfig.i18n.locales[locale as keyof typeof appConfig.i18n.locales]
            .code,
        href: siteUrl,
      }))}
      openGraph={{
        title: siteConfig.details.nameShared,
        description: siteConfig.description,
        type: "website",
        url: siteUrl,
        locale: appConfig.i18n.defaultLocale,
        site_name: siteConfig.name,
        images: [
          {
            url: siteConfig.seo?.ogImage?.original,
            width: 800,
            height: 600,
            alt: "Shirssso - " + siteConfig.details.nameShared,
          },
        ],
      }}
      twitter={{
        handle: siteConfig.details.username,
        site: siteConfig.details.username,
        cardType: "summary_large_image",
      }}
      robotsProps={{
        maxSnippet: -1,
        maxImagePreview: "large",
        maxVideoPreview: -1,
        noarchive: false,
        nosnippet: false,
        notranslate: false,
        noimageindex: true,
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1 maximum-scale=1",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ]}
      additionalLinkTags={[
        {
          rel: "apple-touch-icon",
          href: "icons/apple-icon-180x180.png",
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
      ]}
    />
  );
}
