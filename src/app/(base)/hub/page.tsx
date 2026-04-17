import React from "react";
import { HeaderSection } from "@/app/(base)/hub/sections/HeaderSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import logger from "@/utils/logger";
import { getAllResources } from "@/integrations/content/lib/resources";
import { MyHubSection } from "@/app/(base)/hub/sections/MyHubSection";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("hub.title"),
    description: t("hub.description"),
    keywords: t("hub.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("hub.title"),
      description: t("hub.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("hub.title"),
      description: t("hub.description"),
    },
  };

  return metadata;
}

export default async function MyHub() {
  const locale = await getLocale();
  const data = await getAllResources({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <Skeleton name="hub-header" loading={false}>
        <HeaderSection />
      </Skeleton>
      <Skeleton name="hub-listing" loading={false}>
        <MyHubSection data={data} />
      </Skeleton>
      <ReactionBar 
        pageType={PageType.HUB} 
        entityId="my-hub" 
        variant="inline" 
        className="max-w-4xl mx-auto my-12" 
      />
      {/* <ResourceWrapper initialData={data} type={PageType.HUB} /> */}
      <Skeleton name="hub-cta" loading={false}>
        <CallToAction isPage />
      </Skeleton>
    </>
  );
}
