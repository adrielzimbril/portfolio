import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
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
  const t = await getTranslations();
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
          badge={t("quests.register.closed.badge")}
          title={t("quests.register.closed.title")}
          description={t("quests.register.closed.description")}
          href={getResourcesUrl(PageType.QUESTS, slug)}
          actionLabel={t("quests.register.closed.actionLabel")}
        />
      ) : (
        <IntentionForm questSlug={slug} />
      )}
    </>
  );
}
