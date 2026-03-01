import { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadata as baseMetadata } from "@/app/metadata";
import {
  getChallengeBySlug,
  isSubmissionClosed,
} from "@/data/challenges-masterclasses";
import { ChallengeOverviewSection } from "./sections/ChallengeOverviewSection";
import { ChallengeParticipantsSection } from "./sections/ChallengeParticipantsSection";
import { ChallengeRegisterForm } from "./sections/ChallengeRegisterForm";
import { ChallengeSubmissionForm } from "./sections/ChallengeSubmissionForm";

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: `${challenge.title} | Challenges`,
    description: challenge.tagline,
  };
}

export default async function ChallengeDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  const closed = isSubmissionClosed(challenge);

  return (
    <>
      <ChallengeOverviewSection challenge={challenge} />
      <ChallengeParticipantsSection challenge={challenge} />
      <ChallengeRegisterForm challengeSlug={challenge.slug} />
      <ChallengeSubmissionForm challenge={challenge} isClosed={closed} />
    </>
  );
}
