import React from "react";
import { PhilosophySection } from "./sections/PhilosophySection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeroSection } from "./sections/HeroSection";
import { CraftSection } from "./sections/CraftSection";
import { InteractiveFunFacts } from "./sections/InteractiveFunFactsSection";


export default function About () {
  return (
    <>
      <HeroSection />
      <CraftSection />
      <InteractiveFunFacts />
      <PhilosophySection />
      <CallToAction />
    </>
  );
};
