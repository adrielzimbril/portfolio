import React from "react";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { HubRequestsTableSection } from "@/landlord/pages/HubRequestsTableSection";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    title: "[ROOT] // HUB_REQUESTS",
    description: "Monitoring des flux entrants du Hub Shiro.",
    robots: { index: false, follow: false },
  };
}

export default function HubRequestsPage() {
  return <HubRequestsTableSection />;
}
