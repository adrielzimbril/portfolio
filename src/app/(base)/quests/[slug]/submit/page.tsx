import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
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
          badge="Soumissions fermees 🔒"
          title="La periode de soumission est terminee"
          description="Les depots sont fermes pour ce challenge. Tu peux consulter les details et revenir pour les prochains challenges 🚀"
          href={getResourcesUrl(PageType.QUESTS, slug)}
          actionLabel="Voir le challenge ↩️"
        />
      ) : (
        <IntentionForm quest={quest} isClosed={closed} />
      )}
    </>
  );
}
