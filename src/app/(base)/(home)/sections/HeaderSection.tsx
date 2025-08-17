import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/data/route";
import { Link } from "@/components/ui/link";

export function HeaderSection() {
  return (
    <section className="relative w-full flex items-center justify-center mt-20">
      <Card className="squircle squircle-stone-100 squircle-6xl squircle-smooth-xl bsg-stone-100 rosunded-[64px] border-none shadow-none">
        <CardContent className="px-12 py-16">
          <div className="flex flex-col items-start gap-6 max-w-full">
            <h1 className="font-SF-pro-title-01-64 font-[number:var(--SF-pro-title-01-64-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--SF-pro-title-01-64-font-size)] tracking-[var(--SF-pro-title-01-64-letter-spacing)] leading-[var(--SF-pro-title-01-64-line-height)] [font-style:var(--SF-pro-title-01-64-font-style)]">
              Transformez vos idées en produits que vos utilisateurs adorent
            </h1>

            <p className="[font-family:'SF_Pro_Display-Medium',Helvetica] font-medium text-[#000000de] text-[28px] tracking-[0] leading-[33.6px]">
              Product designer spécialisé dans la simplification des expériences
              SaaS + formateur pour les équipes qui veulent créer l&#39;évidence
              plutôt que la complexité
            </p>

            <div className="flex items-start gap-3">
              <Link
                href={routes.contact.link}
                variant="default"
                asSquare
                whileTap
              >
                <span>Discutons 👋</span>
              </Link>

              <Link
                href={routes.projects.link}
                variant="secondary"
                asSquare
                whileTap
              >
                <span>Voir mes projets client 💡</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
