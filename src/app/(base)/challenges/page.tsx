import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { getLocale } from "next-intl/server";
import logger from "@/utils/logger";
import { getAllChallenges } from "@/module/content/utils/lib/challenges";
import { ChallengesHeaderSection } from "./sections/ChallengesHeaderSection";
import { ChallengesListSection } from "./sections/ChallengesListSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Challenges | Adriel Zimbril",
  description:
    "Liste des challenges: objectifs, récompenses, participants et gagnants.",
};

export default function ChallengesPage() {
  return <ChallengesPageContent />;
}

async function ChallengesPageContent() {
  const locale = await getLocale();
  const data = await getAllChallenges({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <ChallengesHeaderSection />
      <ChallengesListSection data={data} />
      <CallToAction isPage />
    </>
  );
}
