"use client"

import React, { useState, useEffect } from "react"
import { Turnstile } from "@/integrations/anti-bot/turnstile-second"
import { ConfigValue } from "@/config"
import {
  IconLoader2,
  IconShieldCheck,
  IconShieldX,
} from "@tabler/icons-react"
import { cn } from "@/utils"
import { isLocal } from "@/config/utils"
import { logger } from "@/utils/logger"
import { useTranslations } from "next-intl"

interface BotProtectorProps {
  children: React.ReactNode
}

export function BotProtector({ children }: BotProtectorProps) {
  const t = useTranslations("admin.bot_protector")
  const isLocalMode = isLocal()

  const sessionVerified = !isLocalMode && sessionStorage.getItem("shiro_bot_verified") === "true"

  const [verified, setVerified] = useState<boolean>(isLocalMode || sessionVerified)
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleVerify = async (token: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (data.success) {
        sessionStorage.setItem("shiro_bot_verified", "true")
        setVerified(true)
      } else {
        setError(true)
      }
    } catch (err) {
      logger.error("[BotProtector] Verification error:", err)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleError = () => {
    setError(true)
  }

  if (verified) {
    return <>{children}</>
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f3ef] p-4">
      <div className="w-full max-w-md rounded-2xl border border-black/8 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-black/5">
          <div className="text-black/70">
            {error ? (
              <IconShieldX size={32} className="text-red-500" />
            ) : isLoading ? (
              <IconLoader2 size={32} className="animate-spin" />
            ) : (
              <IconShieldCheck size={32} />
            )}
          </div>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-[#11191f]">
          {error ? t("title_failed") : t("title")}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-black/55">
          {error ? t("description_failed") : t("description")}
        </p>

        <div className="mt-8 flex justify-center">
          <Turnstile
            siteKey={ConfigValue.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
            onVerify={handleVerify}
            onError={handleError}
            appearance="execute"
            theme="dark"
          />
        </div>

        {error && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full rounded-xl bg-[#11191f] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#11191f]/90"
          >
            {t("retry")}
          </button>
        )}
      </div>
    </div>
  )
}
