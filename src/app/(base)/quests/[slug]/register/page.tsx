import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  getQuestBySlug,
  isRegistrationClosed,
} from "@/module/content/utils/lib/quests";
import { QuestRegisterForm } from "../sections/QuestRegisterForm";
import { Link } from "@/components/ui/link";

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
      <PageHero
        title={`Rejoindre le challenge: ${quest.title}`}
        description="Inscris-toi pour recevoir le brief officiel, les consignes et toutes les etapes du challenge directement par email."
        badge="Inscription au challenge"
        imagePath={{ emoji: "📝" }}
        isMobileShowed
      />
      {closed ? (
        <SectionLayout>
          <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
            <CardContent className="p-5 md:p-6 space-y-3">
              <p className="text-b-white-invert-sec">
                Les inscriptions sont fermees pour ce challenge.
              </p>
              <Link href={`/quests/${slug}`} likeButton whileTap>
                Retour au challenge
              </Link>
            </CardContent>
          </Card>
        </SectionLayout>
      ) : (
        <QuestRegisterForm questSlug={slug} />
      )}
    </>
  );
}
