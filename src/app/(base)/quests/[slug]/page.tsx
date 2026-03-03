import { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadata as baseMetadata } from "@/app/metadata";
import { getLocale } from "next-intl/server";
import { getQuestBySlug } from "@/module/content/utils/lib/quests";
import { HeaderSection } from "./sections/HeaderSection";
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

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const locale = await getLocale();
  const quest = await getQuestBySlug(slug, { locale });

  if (!quest) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: `${quest.title} | Quests`,
    description: quest.excerpt,
  };
}

export default async function QuestDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const quest = await getQuestBySlug(slug, { locale });

  if (!quest) {
    notFound();
  }

  const registrationClosed = isRegistrationClosed(quest);
  const submissionClosed = isSubmissionClosed(quest);

  return (
    <>
      <HeaderSection quest={quest} />
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
      <PageDetails content={quest.body || ""} />
      <QuestParticipantsSection questSlug={quest.slug} />
    </>
  );
}
