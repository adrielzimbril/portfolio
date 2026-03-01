import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { getLocale } from "next-intl/server";
import logger from "@/utils/logger";
import { getAllMasterclasses } from "@/module/content/utils/lib/masterclasses";
import { MasterclassesHeaderSection } from "./sections/MasterclassesHeaderSection";
import { MasterclassesListSection } from "./sections/MasterclassesListSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Masterclasses | Adriel Zimbril",
  description:
    "Toutes mes masterclasses avec affiche, date, rôle et accès aux ressources.",
};

export default function MasterclassesPage() {
  return <MasterclassesPageContent />;
}

async function MasterclassesPageContent() {
  const locale = await getLocale();
  const data = await getAllMasterclasses({ locale }).catch((err) => {
    logger.error(err);
    return [];
  });

  return (
    <>
      <MasterclassesHeaderSection />
      <MasterclassesListSection data={data} />
      <CallToAction isPage />
    </>
  );
}
