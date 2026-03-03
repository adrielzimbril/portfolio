import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import {
  getQuestBySlug,
  isSubmissionClosed,
} from "@/module/content/utils/lib/quests";
import { QuestSubmissionForm } from "../sections/QuestSubmissionForm";

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
      <PageHero
        title={`Soumettre ton rendu: ${quest.title}`}
        description="Depose ton travail final ici. On confirme la reception juste apres l'envoi."
        badge="Soumission du defi"
        imagePath={{ emoji: "🚀" }}
        isMobileShowed
      />
      {closed ? (
        <SectionLayout>
          <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
            <CardContent className="p-5 md:p-6 space-y-3">
              <p className="text-b-white-invert-sec">
                La periode de soumission est terminee.
              </p>
              <Link href={`/quests/${slug}`} likeButton whileTap>
                Retour au defi
              </Link>
            </CardContent>
          </Card>
        </SectionLayout>
      ) : (
        <QuestSubmissionForm quest={quest} isClosed={closed} />
      )}
    </>
  );
}
