import React from "react";
import { Navbar } from "@/components/shared/_layouts/navbar";
import { ScrollToTop } from "@/components/shared/_layouts/scroll-to-top";
import { Footer } from "@/components/shared/_layouts/footer";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container mx-auto relative min-h-dvh flex flex-col">
        <Navbar />
        {/* <Dockbar asFade={false} /> */}
        {children}
        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
