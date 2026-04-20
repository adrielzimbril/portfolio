import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { metadata as baseMetadata } from "@/app/metadata";
import { UsersSection } from "./sections/UsersSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    ...baseMetadata,
    title: "[ROOT] // ENTITY_INDEX",
    description: "Index des identités et entités autorisées sur le réseau Shiro.",
    robots: { index: false, follow: false },
  };
}

export default function UsersPage() {
  return <UsersSection />;
}
