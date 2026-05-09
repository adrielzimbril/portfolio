"use client";

import "@/bones/registry";
import { snapshotBones } from "boneyard-js";
import { useEffect } from "react";

declare global {
  interface Window {
    __BONEYARD_BUILD?: boolean;
    __BONEYARD_SNAPSHOT?: typeof snapshotBones;
  }
}

function installBoneyardSnapshotHook() {
  if (typeof window !== "undefined") {
    window.__BONEYARD_SNAPSHOT = snapshotBones;
  }
}

installBoneyardSnapshotHook();

export function BoneyardRegistry(): null {
  useEffect(() => {
    installBoneyardSnapshotHook();

    const interval = window.setInterval(installBoneyardSnapshotHook, 100);

    return () => window.clearInterval(interval);
  }, []);

  return null;
}
