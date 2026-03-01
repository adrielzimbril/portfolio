import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { ChallengesHeaderSection } from "./sections/ChallengesHeaderSection";
import { ChallengesListSection } from "./sections/ChallengesListSection";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Challenges | Adriel Zimbril",
  description:
    "Liste des challenges: objectifs, récompenses, participants et gagnants.",
};

export default function ChallengesPage() {
  return (
    <>
      <ChallengesHeaderSection />
      <ChallengesListSection />
    </>
  );
}

