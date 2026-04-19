"use client";
import React from "react";
import { Github, Google } from "@aurthle/icons";
import Image from "next/image";
import { LockKeyhole, Sparkles } from "lucide-react";
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
    <div className="flex min-h-dvh items-center justify-center overflow-auto bg-[#f5f3ea] p-4 md:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(17,25,31,0.14)] lg:grid-cols-[1.05fr_.95fr]">
        <aside className="relative hidden min-h-[680px] flex-col justify-between overflow-hidden bg-[#11191f] p-10 text-white lg:flex">
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#11191f]">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold">Shirofolio</p>
              <p className="text-xs text-white/60">Landlord workspace</p>
            </div>
          </div>

          <div className="relative z-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/8 p-6">
            <div className="mb-6 flex items-center justify-between text-xs text-white/55">
              <span>Admin workspace</span>
              <span>Shirofolio</span>
            </div>
            <div className="grid gap-3">
              <div className="rounded-2xl bg-white p-4 text-[#11191f]">
                <p className="text-xs text-black/45">Aujourd'hui</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {["Quests", "Users", "Messages"].map((item) => (
                    <div key={item} className="rounded-xl bg-[#f5f3ea] p-3">
                      <p className="text-[11px] text-black/45">{item}</p>
                      <p className="mt-2 text-xl font-semibold">12</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                <Image
                  src="/img/me/memoji/me-code.png"
                  width={88}
                  height={88}
                  alt="Admin profile"
                  className="rounded-2xl object-cover"
                />
                <div>
                  <p className="text-sm font-medium">Gestion rapide</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Les entrées importantes du site restent lisibles et faciles à
                    contrôler.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative z-10 max-w-md text-sm leading-6 text-white/55">
            Un accès privé pour gérer les contenus, les inscriptions et les
            messages du site.
          </p>
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
                Connecte-toi avec ton compte autorisé pour ouvrir le panel.
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
              Accès réservé aux emails configurés côté serveur.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
