"use client";
import React from "react";
import { Github, Google } from "@aurthle/icons";
import { Activity, LockKeyhole, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPathUrl } from "@/utils";
import {
  signInWithGithub,
  signInWithGoogle,
} from "@/integrations/auth/provider/supabase";
import { landlordRoutes } from "@/data/landlordRoutes";

function ProviderButton({
  provider,
  onClick,
  variant,
}: {
  provider: "github" | "google";
  onClick: () => void;
  variant: "default" | "secondary";
}) {
  const Icon = provider === "github" ? Github : Google;

  return (
    <Button
      onClick={onClick}
      variant={variant}
      asIcon
      whileTap
      asPointer
      className="h-12 w-full justify-center rounded-none text-sm"
    >
      <span className="flex items-center justify-center gap-2">
        <Icon size={18} variant="bulk" />
        {provider === "github" ? "Continuer avec GitHub" : "Continuer avec Google"}
      </span>
    </Button>
  );
}

function LoginButtons() {
  const handleSignIn = async (
    signInFn: (callbackURL?: string) => Promise<void>,
  ) => {
    const callbackURL = getPathUrl(
      landlordRoutes.landlord.link + window.location.search,
    );
    await signInFn(callbackURL);
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <ProviderButton
        provider="github"
        variant="default"
        onClick={() => handleSignIn(signInWithGithub)}
      />
      <ProviderButton
        provider="google"
        variant="secondary"
        onClick={() => handleSignIn(signInWithGoogle)}
      />
    </div>
  );
}

export function LoginSection({ reason }: { reason?: string }) {
  const isUnauthorized = reason === "unauthorized";

  return (
    <div className="flex min-h-dvh items-center justify-center overflow-auto bg-[#f5f3ea] p-4 md:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(17,25,31,0.14)] lg:grid-cols-[1.05fr_.95fr]">
        <aside className="relative hidden min-h-[680px] flex-col justify-between overflow-hidden bg-[#11191f] p-10 text-white lg:flex">
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#11191f]">
              <Terminal size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Adriel Zimbril</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">[NODE_AUTHORIZATION_REQ] // FRAG-99</p>
            </div>
          </div>

          <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-white/8 p-6">
            <div className="mb-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">
              <span>KERNEL_PULSE_MONITOR</span>
              <span>SIGNATURE_CAPTURED</span>
            </div>
            <div className="grid gap-3">
              <div className="rounded-2xl bg-white p-4 text-[#11191f]">
                <p className="text-[10px] font-bold uppercase tracking-wider text-black/35 shadow-sm">Metrics_Buffer_01</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: "Protocols", val: "12" },
                    { label: "Entities", val: "48" },
                    { label: "Signals", val: "09" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-[#f5f3ea] p-3 transition-transform hover:scale-[1.02]">
                      <p className="text-[9px] font-bold uppercase text-black/45">{item.label}</p>
                      <p className="mt-1 text-xl font-semibold tabular-nums tracking-tighter">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/15">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-white/40">
                  <Activity size={32} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.1em]">ADMIN_OVERRIDE_CONSOLE</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/45">
                    Mutation de paquets et orchestration des flux critiques avec une
                    latence proche de zéro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 max-w-sm text-[11px] leading-relaxed text-white/40">
            Liaison restreinte. Authentification requise pour la mutation des
            nœuds de données et des protocoles de communication.
          </p>
        </aside>

        <main className="flex min-h-[640px] items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            

            <div className="mb-8">
              <div className="mb-10 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#11191f] text-white">
                <LockKeyhole size={20} />
              </div>
              <div className="lg:hidden">
                <p className="font-semibold text-[13px] uppercase tracking-wider">Adriel Zimbril</p>
                <p className="text-xs text-black/50">Secure workspace</p>
              </div>
            </div>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] uppercase">
                Accès_Racine
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/55">
                Signature numérique détectée. Identifiez-vous pour ouvrir une liaison 
                sécurisée avec le Shiro Core. Toute mutation non autorisée 
                sera rejetée par le firewall.
              </p>
            </div>

            {isUnauthorized && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Ce compte est connecté, mais il n'est pas autorisé à accéder au
                dashboard.
              </div>
            )}

            <LoginButtons />

            <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-black/35">
              Accès strictement réservé aux entités whitelisted.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
