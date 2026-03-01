import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { MasterclassesHeaderSection } from "./sections/MasterclassesHeaderSection";
import { MasterclassesListSection } from "./sections/MasterclassesListSection";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Masterclasses | Adriel Zimbril",
  description:
    "Toutes mes masterclasses avec affiche, date, rôle et accès aux ressources.",
};

export default function MasterclassesPage() {
  return (
    <>
      <MasterclassesHeaderSection />
      <MasterclassesListSection />
    </>
  );
}

