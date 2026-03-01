import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { getLocale } from "next-intl/server";
import logger from "@/utils/logger";
import { getAllTalks } from "@/module/content/utils/lib/talks";
import { TalksHeaderSection } from "./sections/TalksHeaderSection";
import { TalksListSection } from "./sections/TalksListSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Talks | Adriel Zimbril",
  description:
    "Tous mes talks avec affiche, date, role et acces aux ressources.",
};

export default function TalksPage() {
  return <TalksPageContent />;
}

async function TalksPageContent() {
  const locale = await getLocale();
  const data = await getAllTalks({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <TalksHeaderSection />
      <TalksListSection data={data} />
      <CallToAction isPage />
    </>
  );
}
