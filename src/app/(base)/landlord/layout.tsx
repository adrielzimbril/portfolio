import React from "react";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 min-h-dvh overflow-hidden bg-[#f4f3ec] text-[#11191f]">
      {children}
    </div>
  );
}
