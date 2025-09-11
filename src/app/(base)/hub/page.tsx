import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MyHubSection } from "./sections/MyHubSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { Metadata } from "next";

export async function generateMetadata() {
  const metadata: Metadata = {
    title: "Hub",
  };
  return metadata;
}

export default function MyHub() {
  return (
    <>
      <HeaderSection />
      <MyHubSection />
      <CallToAction isPage />
    </>
  );
}
