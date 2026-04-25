"use client";
import React from "react";

export function SidebarOverlay({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  if (!visible) return null;

  return (
    <button
      className="fixed inset-0 z-30 cursor-pointer bg-black/20 md:hidden"
      aria-label="Fermer la navigation"
      onClick={onClose}
    />
  );
}
