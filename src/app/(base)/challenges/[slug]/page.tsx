import { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadata as baseMetadata } from "@/app/metadata";
import { getLocale } from "next-intl/server";
import { getChallengeBySlug } from "@/module/content/utils/lib/challenges";
import { ChallengeOverviewSection } from "./sections/ChallengeOverviewSection";
import { ChallengeParticipantsSection } from "./sections/ChallengeParticipantsSection";
import { PageDetails } from "@/components/shared/pages/shared/page/page-details";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";
import { getHumanDate } from "@/utils";
import {
  isRegistrationClosed,
  isSubmissionClosed,
} from "@/module/content/utils/lib/challenges";

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const locale = await getLocale();
  const challenge = await getChallengeBySlug(slug, { locale });

  if (!challenge) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: `${challenge.title} | Challenges`,
    description: challenge.excerpt,
  };
}

export default async function ChallengeDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const challenge = await getChallengeBySlug(slug, { locale });

  if (!challenge) {
    notFound();
  }

  const registrationClosed = isRegistrationClosed(challenge);
  const submissionClosed = isSubmissionClosed(challenge);

  return (
    <>
      <ChallengeOverviewSection challenge={challenge} />
      <SectionLayout>
        <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
          <CardContent className="p-5 md:p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>
                Fin inscription: {getHumanDate(challenge.registration_deadline)}
              </Badge>
              <Badge variant="secondary">
                Fin soumission: {getHumanDate(challenge.submission_deadline)}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={registrationClosed ? "secondary" : "default"}>
                {registrationClosed
                  ? "Inscriptions fermees"
                  : "Inscriptions ouvertes"}
              </Badge>
              <Badge variant={submissionClosed ? "secondary" : "default"}>
                {submissionClosed ? "Soumissions fermees" : "Soumissions ouvertes"}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Recompenses</p>
              <ul className="space-y-1 text-b-white-invert-sec">
                {challenge.rewards.map((reward: string) => (
                  <li key={reward}>• {reward}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/challenges/${challenge.slug}/register`} likeButton whileTap>
                S'inscrire au challenge
              </Link>
              <Link
                href={`/challenges/${challenge.slug}/travail/submit`}
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
      <PageDetails content={challenge.body || ""} />
      <ChallengeParticipantsSection challengeSlug={challenge.slug} />
    </>
  );
}
