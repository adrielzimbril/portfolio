import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { StatsSection } from "./sections/StatsSection";
import { FormSection } from "./sections/FormSection";
import { MessagesSection } from "./sections/MessagesSection";
import { supabase } from "@/integrations/supabase/client";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: t("community.title"),
    description: t("community.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("community.title"),
      description: t("community.description"),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("community.title"),
      description: t("community.description"),
    },
  };
}

export default async function CommunityPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("community.page.title")}
        description={t("community.page.description")}
        imagePath={{ emoji: "🎨" }}
        isMobileShowed
      />

      <StatsSection />

      <SectionLayout isFlex>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FormSection user={user} />
          <MessagesSection />
        </div>
      </SectionLayout>
    </>
  );
}
