import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { getLocale } from "next-intl/server";
import logger from "@/utils/logger";
import { getAllQuests } from "@/module/content/utils/lib/quests";
import { HeaderSection } from "./sections/HeaderSection";
import { QuestsListSection } from "./sections/QuestsListSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Quests | Adriel Zimbril",
  description:
    "Liste des quests: objectifs, recompenses, participants et gagnants.",
};

export default function QuestsPage() {
  return <QuestsPageContent />;
}

async function QuestsPageContent() {
  const locale = await getLocale();
  const data = await getAllQuests({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <HeaderSection />
      <QuestsListSection data={data} />
      <CallToAction isPage />
    </>
  );
}
