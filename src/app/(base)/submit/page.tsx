import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { HeaderSection } from "@/app/(base)/submit/sections/HeaderSection";
import { IntentionForm } from "@/app/(base)/submit/sections/IntentionForm";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("submit.title"),
    description: t("submit.description"),
    keywords: t("submit.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("submit.title"),
      description: t("submit.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("submit.title"),
      description: t("submit.description"),
    },
  };

  return metadata;
}

export default async function ThoughtsSubmitPage() {
  return (
    <>
      <Skeleton name="submit-header" loading={false}>
        <HeaderSection />
      </Skeleton>
      <Skeleton name="form-default" loading={false}>
        <IntentionForm />
      </Skeleton>
    </>
  );
}
