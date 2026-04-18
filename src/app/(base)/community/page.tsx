import React from "react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { StatsSection } from "@/app/(base)/community/sections/StatsSection";
import { FormSection } from "@/app/(base)/community/sections/FormSection";
import { MessagesSection } from "@/app/(base)/community/sections/MessagesSection";
import { LeaveNoteButton } from "@/components/shared/pages/community/LeaveNoteButton";
import { createClient } from "@/integrations/supabase/server";
import { cookies } from "next/headers";

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
  let user = null;
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser();
    user = supabaseUser;
  } catch (error) {
    // User fetch failed, continue without user
  }
  const t = await getTranslations();

  return (
    <>
      <PageHero
        title={t("community.page.title")}
        description={t("community.page.description")}
        imagePath={{ emoji: "🎨" }}
        isMobileShowed
      />

      <SectionLayout className="p-0!" isFlex>
        <StatsSection user={user} />
      </SectionLayout>

      <SectionLayout isFlex>
        {/* <LeaveNoteButton user={user} /> */}
        <div className="flex justify-center size-full">
          {/* <FormSection user={user} /> */}
          <MessagesSection />
        </div>
      </SectionLayout>
    </>
  );
}
