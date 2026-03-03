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
import { IntentionForm } from "./sections/IntentionForm";
import { HeaderSection } from "./sections/HeaderSection";

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
        <SectionLayout>
          <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
            <CardContent className="p-5 md:p-6 space-y-3">
              <p className="text-b-white-invert-sec">
                La periode de soumission est terminee 🔒
              </p>
              <Link href={`/quests/${slug}`} likeButton whileTap>
                Retour au challenge ↩️
              </Link>
            </CardContent>
          </Card>
        </SectionLayout>
      ) : (
        <IntentionForm quest={quest} isClosed={closed} />
      )}
    </>
  );
}
