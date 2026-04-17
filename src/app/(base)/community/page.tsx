import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { StatsSection } from "@/app/(base)/community/sections/StatsSection";
import { FormSection } from "@/app/(base)/community/sections/FormSection";
import { MessagesSection } from "@/app/(base)/community/sections/MessagesSection";
import { supabase } from "@/integrations/supabase/client";
import { LeaveNoteButton } from "@/components/shared/pages/community/LeaveNoteButton";

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
        <LeaveNoteButton user={user} />
        <div className="flex justify-center size-full">
          {/* <FormSection user={user} /> */}
          <MessagesSection />
        </div>
      </SectionLayout>
    </>
  );
}
