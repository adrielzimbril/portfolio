import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import {
  getChallengeBySlug,
  isSubmissionClosed,
} from "@/module/content/utils/lib/challenges";
import { ChallengeSubmissionForm } from "../../sections/ChallengeSubmissionForm";

export default async function ChallengeWorkSubmitPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const challenge = await getChallengeBySlug(slug, { locale });

  if (!challenge) {
    notFound();
  }

  const closed = isSubmissionClosed(challenge);

  return (
    <>
      <PageHero
        title={`Soumission · ${challenge.title}`}
        description="Soumets ton travail ici jusqu'a la date limite de soumission."
        badge="Work submission"
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
              <Link href={`/challenges/${slug}`} likeButton whileTap>
                Retour au challenge
              </Link>
            </CardContent>
          </Card>
        </SectionLayout>
      ) : (
        <ChallengeSubmissionForm challenge={challenge} isClosed={closed} />
      )}
    </>
  );
}
