import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getChallengeBySlug, isRegistrationClosed } from "@/module/content/utils/lib/challenges";
import { ChallengeRegisterForm } from "../sections/ChallengeRegisterForm";
import { Link } from "@/components/ui/link";

export default async function ChallengeRegisterPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const challenge = await getChallengeBySlug(slug, { locale });

  if (!challenge) {
    notFound();
  }

  const closed = isRegistrationClosed(challenge);

  return (
    <>
      <PageHero
        title={`Inscription · ${challenge.title}`}
        description="Inscris-toi d'abord. Une fois inscrit, tu recevras les infos du challenge."
        badge="Challenge registration"
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
              <Link href={`/challenges/${slug}`} likeButton whileTap>
                Retour au challenge
              </Link>
            </CardContent>
          </Card>
        </SectionLayout>
      ) : (
        <ChallengeRegisterForm challengeSlug={slug} />
      )}
    </>
  );
}

