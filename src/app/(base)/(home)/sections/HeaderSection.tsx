import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/data/route";
import { Link } from "@/components/ui/link";

export function HeaderSection() {
  return (
    <section className="relative w-full flex items-center justify-center mt-20">
      <Card className="squircle squircle-stone-100 squircle-6xl squircle-smooth-xl">
        <CardContent className="px-12 py-16 md:py-24">
          <div className="flex flex-col items-start gap-6 max-w-full">
            <h1 className="w-full relative">
              Transformez vos idées en produits que vos utilisateurs adorent
            </h1>
            <p className="relative text-2xl">
              Product designer spécialisé dans la simplification des expériences
              SaaS + formateur pour les équipes qui veulent créer l&#39;évidence
              plutôt que la complexité
            </p>
            <div className="grid w-full md:flex md:w-auto items-start gap-3">
              <Link
                href={routes.contact.link}
                variant="default"
                asSquare
                asFull
                whileTap
              >
                <span>Discutons 👋</span>
              </Link>

              <Link
                href={routes.projects.link}
                variant="secondary"
                asSquare
                asFull
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
