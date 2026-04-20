"use client";

import React, { useState, useEffect } from "react";
import { Turnstile } from "@/integrations/anti-bot/turnstile-second";
import { ConfigValue } from "@/config";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn, logger } from "@/utils";
import { isLocal } from "@/config/utils";

interface BotProtectorProps {
  children: React.ReactNode;
}

export function BotProtector({ children }: BotProtectorProps) {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLocalMode = isLocal();

  // Check if we already have a session verification or if we are in local mode
  useEffect(() => {
    if (isLocalMode) {
      logger.info("[BotProtector] Skipping verification in local mode.");
      setIsVerified(true);
      setIsLoading(false);
      return;
    }

    const sessionVerified = sessionStorage.getItem("shiro_bot_verified") === "true";
    if (sessionVerified) {
      setIsVerified(true);
      setIsLoading(false);
    }
  }, [isLocalMode]);

  const handleVerify = (token: string) => {
    if (token) {
      setIsVerified(true);
      setIsLoading(false);
      sessionStorage.setItem("shiro_bot_verified", "true");
    }
  };

  const handleError = (err: any) => {
    logger.error("[BotProtector] Turnstile error:", err);
    setError("La vérification de sécurité a échoué. Veuillez réessayer.");
    setIsLoading(false);
  };

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#f5f3ea]/80 backdrop-blur-md">
      <div className="w-full max-w-sm rounded-[32px] border border-black/10 bg-white p-8 shadow-[0_24px_80px_rgba(17,25,31,0.14)] text-center">
        <div className="mb-6 flex justify-center">
          <div className={cn(
            "flex size-16 items-center justify-center rounded-2xl",
            error ? "bg-red-50 text-red-500" : "bg-[#11191f] text-white"
          )}>
            {error ? <ShieldAlert size={32} /> : isLoading ? <Loader2 size={32} className="animate-spin" /> : <ShieldCheck size={32} />}
          </div>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-[#11191f]">
          {error ? "Vérification échouée" : "Vérification de sécurité"}
        </h2>
        
        <p className="mt-3 text-sm leading-relaxed text-black/55">
          {error 
            ? "Nous n'avons pas pu confirmer que vous n'êtes pas un robot. Veuillez actualiser la page." 
            : "Veuillez patienter un instant pendant que nous sécurisons votre session."}
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
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
