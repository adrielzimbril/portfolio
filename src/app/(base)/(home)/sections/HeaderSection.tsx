import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/data/route";
import { Link } from "@/components/ui/link";
import { SectionBase } from "@/components/shared/pages/shared/section-base";

export function HeaderSection() {
  return (
    <SectionBase sectionClassName="p-0 mt-20" isWide>
      <h1 className="w-full relative">
        Transformez vos idées en produits que vos utilisateurs adorent
      </h1>
      <p className="relative text-2xl">
        Product designer spécialisé dans la simplification des expériences SaaS
        + formateur pour les équipes qui veulent créer l&#39;évidence plutôt que
        la complexité
      </p>
      <div className="grid w-full md:flex md:w-auto items-start gap-3">
        <Link
          href={routes.contact.link}
          variant="default"
          likeButton
          asFull
          whileTap
        >
          <span>Discutons 👋</span>
        </Link>

        <Link
          href={routes.projects.link}
          variant="secondary"
          likeButton
          asFull
          whileTap
        >
          <span>Voir mes projets client 💡</span>
        </Link>
      </div>
    </SectionBase>
  );
}
