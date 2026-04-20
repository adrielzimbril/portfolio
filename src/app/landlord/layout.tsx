import React from "react";
import { BotProtector } from "@/landlord/components/_layouts/BotProtector";

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
