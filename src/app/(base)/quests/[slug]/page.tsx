import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { QuestDetailsSection } from "./sections/QuestDetailsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { getLocale } from "next-intl/server";
import { PageParams } from "@/types";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/routes";
import { getImageUrl } from "@/utils";
import { Metadata } from "next";
import { DEFAULT_COLOR_CODE_NAME_LIST } from "@/types";
import { metadata as baseMetadata } from "@/app/metadata";
import {
  getQuestBySlug,
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";
import { QuestParticipantsSection } from "./sections/QuestParticipantsSection";

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const locale = await getLocale();
  const quest = await getQuestBySlug(slug, { locale });

  const metadata: Metadata = {
    title: quest?.title,
    description: quest?.excerpt,
    openGraph: {
      ...baseMetadata.openGraph,
      title: quest?.title,
      description: quest?.excerpt,
      images: [
        getImageUrl(quest?.cover ?? ""),
        getImageUrl("opengraph-image.png"),
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: quest?.title,
      description: quest?.excerpt,
      images: [
        getImageUrl(quest?.cover ?? ""),
        getImageUrl("opengraph-image.png"),
      ],
    },
  };

  return metadata;
}

export default async function SubShop(props: { params: Promise<PageParams> }) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const quest = await getQuestBySlug(slug, { locale });

  if (!quest) {
    return localeRedirect({ href: routes.hub.link, locale });
  }

  const registrationClosed = isRegistrationClosed(quest.registration_deadline);
  const submissionClosed = isSubmissionClosed(
    quest.submission_deadline,
    quest.quest_end
  );

  return (
    <>
      <HeaderSection
        title={quest.title}
        slug={slug}
        cover={quest.cover ?? ""}
        description={quest.excerpt}
      />
      <QuestDetailsSection
        content={quest.body || ""}
        slug={slug}
        dates={{
          registration_end: quest.registration_deadline,
          submission_end: quest.submission_deadline,
          results: quest.quest_end,
        }}
        tags={[
          {
            name: `Inscriptions ${
              registrationClosed ? "cloturees" : "ouvertes"
            }`,
            meta: {
              color: registrationClosed
                ? DEFAULT_COLOR_CODE_NAME_LIST.RED
                : DEFAULT_COLOR_CODE_NAME_LIST.WHITE_GOLD,
            },
          },
          {
            name: `Soumissions ${submissionClosed ? "cloturees" : "ouvertes"}`,
            meta: {
              color: submissionClosed
                ? DEFAULT_COLOR_CODE_NAME_LIST.RED
                : DEFAULT_COLOR_CODE_NAME_LIST.WHITE_GOLD,
            },
          },
        ]}
      />
      <QuestParticipantsSection questSlug={quest.slug} />
      <CallToAction isPage />
    </>
  );
}
