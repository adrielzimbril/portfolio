"use client";
import React from "react";
import { Github, Google } from "@aurthle/icons";
import { LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getPathUrl } from "@/utils";
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

export function LoginButtons() {
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

export function LandlordLoginPanel({ reason }: { reason?: string }) {
  const isUnauthorized = reason === "unauthorized";

  return (
    <div className="flex min-h-dvh items-center justify-center overflow-auto bg-[#ece8d8] p-4 md:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-black/10 bg-[#f8f7f1] shadow-[0_24px_80px_rgba(17,25,31,0.18)] lg:grid-cols-[1.05fr_.95fr]">
        <aside className="relative hidden min-h-[680px] flex-col justify-between overflow-hidden bg-[#11191f] p-10 text-white lg:flex">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#ffed90]/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#11191f]">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold">Shirofolio</p>
              <p className="text-xs text-white/60">Landlord workspace</p>
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
              <ShieldCheck size={14} />
              Admin private access
            </p>
            <h1 className="text-5xl font-semibold leading-[105%] tracking-[-0.02em]">
              Pilote ton contenu sans casser le site public.
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-6 text-white/68">
              Un espace sobre pour gérer les participations aux quests, les
              messages de communauté et les actions sensibles avec confirmation.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3 text-xs text-white/70">
            {["Secure", "Focused", "Operational"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-3">
                {item}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex min-h-[640px] items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#11191f] text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="font-semibold">Shirofolio</p>
                <p className="text-xs text-black/50">Landlord workspace</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-[#11191f] text-white">
                <LockKeyhole size={20} />
              </div>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.02em]">
                Connexion admin
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/55">
                Connecte-toi avec un compte autorisé pour accéder au landlord
                panel.
              </p>
            </div>

            {isUnauthorized && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Ce compte est connecté, mais il n'est pas autorisé à accéder au
                dashboard admin.
              </div>
            )}

            <LoginButtons />

            <p className="mt-8 text-xs leading-5 text-black/45">
              L'accès est limité aux emails configurés côté serveur. Les logs et
              erreurs serveur restent en anglais pour faciliter le debug.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
