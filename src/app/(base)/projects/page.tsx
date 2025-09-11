import React from "react";
import { MyProjectsSection } from "./sections/MyProjectsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { HeaderSection } from "./sections/HeaderSection";
import { Metadata } from "next";

export async function generateMetadata() {
  const metadata: Metadata = {
    title: "Projects",
  };
  return metadata;
}

export default function MyProject() {
  return (
    <>
      <HeaderSection />
      <MyProjectsSection />
      <CallToAction isPage />
    </>
  );
}
