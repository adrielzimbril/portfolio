"use client"

import { bind } from "@usespaceui/sounds"
import { useEffect } from "react"

export function SoundProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Bind all data-space-* interactions to sound effects
    bind()
  }, [])

  return <>{children}</>
}
