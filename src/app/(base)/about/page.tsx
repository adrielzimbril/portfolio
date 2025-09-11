import React from "react";
import { PhilosophySection } from "./sections/PhilosophySection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { CraftSection } from "./sections/CraftSection";
import { InteractiveFunFacts } from "./sections/InteractiveFunFactsSection";
import { Metadata } from "next";

export async function generateMetadata() {
  const metadata: Metadata = {
    title: "About",
  };
  return metadata;
}

export default function About () {
  return (
    <>
      <HeaderSection />
      <CraftSection />
      <InteractiveFunFacts />
      <PhilosophySection />
      <CallToAction />
    </>
  );
};
