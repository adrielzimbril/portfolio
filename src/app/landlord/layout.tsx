import React from "react";
import { BotProtector } from "@/components/landlord/_layouts/BotProtector";

export default function LandlordRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BotProtector>
      {children}
    </BotProtector>
  );
}
