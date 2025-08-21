import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MyThoughtsSection } from "./sections/MyThoughtsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";

export default function MyThoughts() {
  return (
    <>
      <HeaderSection />
      <MyThoughtsSection />
      <CallToAction isPage />
    </>
  );
}
