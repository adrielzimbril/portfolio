import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  getQuestBySlug,
  isRegistrationClosed,
} from "@/module/content/utils/lib/quests";
import { IntentionForm } from "./sections/IntentionForm";
import { Link } from "@/components/ui/link";
import { HeaderSection } from "./sections/HeaderSection";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Badge } from "@/components/ui/badge";
import { getResourcesUrl } from "@/utils";
import { PageType } from "@/types";

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
        <SectionBase
          sectionClassName="w-full"
          sectionContentClassName="w-full"
          cardClassName="w-full"
          cardContentClassName="w-full px-4 py-6 md:p-8"
          className="squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
        >
          <Card className="w-full squircle squircle-sh-white squircle-smooth-xl">
            <CardContent className="flex flex-col items-center justify-center p-6 md:p-8 space-y-6 gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center gap-2">
                <Badge size="lg">Inscriptions fermées 🔒</Badge>
                <h2 className="h3">Ce challenge n'est plus ouvert</h2>
                <p className="text-b-white-invert-sec max-w-2xl">
                  Malheureusement, les inscriptions pour ce challenge sont
                  désormais closes. Reviens bientôt, de nouveaux challenges
                  arrivent ! 🚀
                </p>
              </div>
              <Link
                href={getResourcesUrl(PageType.QUESTS, slug)}
                likeButton
                whileTap
              >
                Voir le challenge ↩️
              </Link>
            </CardContent>
          </Card>
        </SectionBase>
      ) : (
        <IntentionForm questSlug={slug} />
      )}
    </>
  );
}
