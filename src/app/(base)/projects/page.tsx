import React from "react";
import { MyProjectsSection } from "./sections/MyProjectsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";

export default function MyProject() {
  return (
    <>
      <HeaderSection />
      <MyProjectsSection />
      <CallToAction isPage />
    </>
  );
}
