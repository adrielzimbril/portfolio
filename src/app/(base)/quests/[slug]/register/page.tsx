import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import {
  getQuestBySlug,
  isRegistrationClosed,
} from "@/module/content/utils/lib/quests";
import { IntentionForm } from "./sections/IntentionForm";
import { HeaderSection } from "./sections/HeaderSection";
import { getResourcesUrl } from "@/utils";
import { PageType } from "@/types";
import { ChallengeClosedState } from "@/components/shared/pages/quests/challenge-closed-state";

export default async function QuestRegisterPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const quest = await getQuestBySlug(slug, { locale });

  if (!quest) {
    notFound();
  }

  const closed = isRegistrationClosed(quest.registration_deadline);

  return (
    <>
      <HeaderSection title={quest.title} />
      {closed ? (
        <ChallengeClosedState
          badge="Inscriptions fermées 🔒"
          title="Ce challenge n'est plus ouvert"
          description="Malheureusement, les inscriptions pour ce challenge sont desormais closes. Reviens bientot, de nouveaux challenges arrivent ! 🚀"
          href={getResourcesUrl(PageType.QUESTS, slug)}
          actionLabel="Voir le challenge ↩️"
        />
      ) : (
        <IntentionForm questSlug={slug} />
      )}
    </>
  );
}
