import React from "react";
import { PhilosophySection } from "./sections/PhilosophySection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { CraftSection } from "./sections/CraftSection";
import { InteractiveFunFacts } from "./sections/InteractiveFunFactsSection";


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
