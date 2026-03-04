import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  getQuestBySlug,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";
import { IntentionForm } from "./sections/IntentionForm";
import { HeaderSection } from "./sections/HeaderSection";
import { getResourcesUrl } from "@/utils";
import { PageType } from "@/types";
import { ChallengeClosedState } from "@/components/shared/pages/quests/challenge-closed-state";

export default async function QuestWorkSubmitPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const t = await getTranslations();
  const quest = await getQuestBySlug(slug, { locale });

  if (!quest) {
    notFound();
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
