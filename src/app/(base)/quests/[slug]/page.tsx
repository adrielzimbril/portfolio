import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { QuestDetailsSection } from "./sections/QuestDetailsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { getLocale } from "next-intl/server";
import { PageParams } from "@/types";
import {
  getResourceWithAdjacent,
  getResourceBySlug,
} from "@/module/content/utils/lib/resources";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/routes";
import { getImageUrl, getResourcesUrl } from "@/utils";
import { Metadata } from "next";
import { PageType, DEFAULT_COLOR_CODE_NAME_LIST } from "@/types";
import { metadata as baseMetadata } from "@/app/metadata";

import { getQuestBySlug } from "@/module/content/utils/lib/quests";
import { QuestParticipantsSection } from "./sections/QuestParticipantsSection";
import { PageDetails } from "@/components/shared/pages/shared/page/page-details";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { getHumanDate } from "@/utils";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";

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

  const registrationClosed = isRegistrationClosed(quest);
  const submissionClosed = isSubmissionClosed(quest);

  const {
    title,
    cover,
    body,
    excerpt,
    registration_deadline,
    submission_deadline,
    quest_end,
    rewards,
  } = quest;

  return (
    <>
      <HeaderSection
        title={title}
        slug={slug}
        cover={cover ?? ""}
        description={excerpt}
        // type={type}
        // tags={tags}
        // pageViewsData={{ slug, locale }}
      />
      <SectionLayout>
        <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
          <CardContent className="p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>
                Fin inscription: {getHumanDate(quest.registration_deadline)}
              </Badge>
              <Badge variant="secondary">
                Fin soumission: {getHumanDate(quest.submission_deadline)}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={registrationClosed ? "secondary" : "default"}>
                {registrationClosed
                  ? "Inscriptions fermees"
                  : "Inscriptions ouvertes"}
              </Badge>
              <Badge variant={submissionClosed ? "secondary" : "default"}>
                {submissionClosed
                  ? "Soumissions fermees"
                  : "Soumissions ouvertes"}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Recompenses</p>
              <ul className="space-y-1 text-b-white-invert-sec">
                {quest.rewards.map((reward: string) => (
                  <li key={reward}>- {reward}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/quests/${quest.slug}/register`} likeButton whileTap>
                S'inscrire au quest
              </Link>
              <Link
                href={`/quests/${quest.slug}/travail/submit`}
                likeButton
                whileTap
                variant="secondary"
              >
                Soumettre son travail
              </Link>
            </div>
          </CardContent>
        </Card>
      </SectionLayout>
      <QuestDetailsSection
        content={body || ""}
        slug={slug}
        dates={{
          registration_end: registration_deadline,
          submission_end: submission_deadline,
          results: quest_end,
        }}
        tags={[
          {
            name: `📝 ${
              isRegistrationClosed(quest)
                ? "Inscriptions cloturées"
                : "Inscriptions ouvertes"
            }`,
            meta: {
              color: isRegistrationClosed(quest)
                ? DEFAULT_COLOR_CODE_NAME_LIST.RED
                : DEFAULT_COLOR_CODE_NAME_LIST.WHITE_GOLD,
            },
          },
          {
            name: `📨 ${
              isSubmissionClosed(quest)
                ? "Soumissions cloturées"
                : "Soumissions ouvertes"
            }`,
            meta: {
              color: isSubmissionClosed(quest)
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
