import { getLocale, getTranslations } from "next-intl/server";
import {
  getQuestBySlug,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";
import { IntentionForm } from "./sections/IntentionForm";
import { HeaderSection } from "./sections/HeaderSection";
import { getImageUrl, getResourcesUrl } from "@/utils";
import { PageParams, PageType } from "@/types";
import { ChallengeClosedState } from "@/components/shared/pages/quests/challenge-closed-state";
import { metadata as baseMetadata } from "@/app/metadata";
import { Metadata } from "next";
import { localeRedirect } from "@/module/i18n/routing";
import { routes } from "@/data/routes";

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const t = await getTranslations();
  const locale = await getLocale();
  const quest = await getQuestBySlug(slug, { locale });

  const metadata: Metadata = {
    ...baseMetadata,
    title: t("quests.submit.title"),
    description: t("quests.submit.description"),
    keywords: t("quests.submit.keywords"),
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("quests.submit.title"),
      description: t("quests.submit.description"),
      images: [getImageUrl(quest.cover), getImageUrl("opengraph-image.png")],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("quests.submit.title"),
      description: t("quests.submit.description"),
      images: [getImageUrl(quest.cover), getImageUrl("opengraph-image.png")],
    },
  };

  return metadata;
}
export default async function QuestWorkSubmitPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const t = await getTranslations();
  const quest = await getQuestBySlug(slug, { locale });

  if (!quest) {
    return localeRedirect({ href: routes.quests.link, locale });
  }

  const closed = isSubmissionClosed(quest.submission_deadline, quest.quest_end);

  return (
    <>
      <HeaderSection title={quest.title} />
      {closed ? (
        <ChallengeClosedState
          badge={t("quests.submit.closed.badge")}
          title={t("quests.submit.closed.title")}
          description={t("quests.submit.closed.description")}
          href={getResourcesUrl(PageType.QUESTS, slug)}
          actionLabel={t("quests.submit.closed.actionLabel")}
        />
      ) : (
        <IntentionForm quest={quest} isClosed={closed} />
      )}
    </>
  );
}
