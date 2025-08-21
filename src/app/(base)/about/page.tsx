import React from "react";
import { AboutMeSection } from "./sections/AboutMeSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeroSection } from "./sections/HeroSection";
import { ServicesSection } from "./sections/ServicesSection";
import { InteractiveFunFacts } from "./sections/InteractiveFunFactsSection";


export default function About () {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <InteractiveFunFacts />
      <AboutMeSection />
      <CallToAction />
    </>
  );
};
