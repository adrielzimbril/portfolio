import React from "react";
import { HeaderSection } from "@/app/(base)/thoughts/sections/HeaderSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllPosts } from "@/integrations/content/lib";
import { MyThoughtsSection } from "@/app/(base)/thoughts/sections/MyThoughtsSection";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("thoughts.title"),
    description: t("thoughts.description"),
    keywords: t("thoughts.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("thoughts.title"),
      description: t("thoughts.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("thoughts.title"),
      description: t("thoughts.description"),
    },
  };

  return metadata;
}

export default async function MyThoughts() {
  const locale = await getLocale();
  const data = await getAllPosts({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <Skeleton name="thoughts-header" loading={false}>
        <HeaderSection />
      </Skeleton>
      {data.length > 0 && (
        <Skeleton name="thoughts-listing" loading={false}>
          <MyThoughtsSection data={data} />
        </Skeleton>
      )}
      {/* <ResourceWrapper initialData={data} type={PageType.THOUGHT} /> */}
      <Skeleton name="thoughts-cta" loading={false}>
        <CallToAction isPage />
      </Skeleton>
    </>
  );
}
