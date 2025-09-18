"use client";
import { Linkedin, LinkOne } from "@aurthle/icons";
import { useState, useEffect, useMemo } from "react";
import BoringAvatar from "boring-avatars";
import { cn, pickRandomColorCode } from "@/utils";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocale, useTranslations } from "use-intl";
import { Locale } from "@/types";

interface TestimonialCard {
  id: number;
  locale: Locale;
  name: string;
  position: string;
  testimonial: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  avatar?: string;
}

const testimonials: TestimonialCard[] = [
  {
    id: 1,
    locale: Locale.FR,
    name: "Christian Junior Braffo",
    position: "Développeur Web & Certifié Cloud Practitioner",
    testimonial:
      "Adriel Zimbril n’est pas un simple développeur, c’est un développeur qui repousse ses limites à chaque fois, il est capable d’implémenter n’importe quelle maquette que vous lui proposer , Il est très ouvert et est toujours prêt à aider, c’est probablement le meilleur Dev que je connaisse",
    linkedinUrl: "https://www.linkedin.com/in/christian-junior-braffo-",
    avatar: "CJB",
  },
  {
    id: 2,
    locale: Locale.FR,
    name: "Youssouf Aboubacar Yvan Gamby",
    position: "Chargé d’affaires chez Witti Finances Côte d'Ivoire",
    testimonial:
      "J’avais besoin d’un développeur pour m’aider à lancer mon SaaS pour étudiants, mais au final, Adriel a été bien plus que ça. Il m’a accompagné comme un vrai conseiller. Il m’a aidé à clarifier mon idée, à structurer mon produit, et à mieux comprendre ce que je voulais vraiment proposer.\n Grâce à lui, j’ai pu poser des bases solides, éviter pas mal d’erreurs et avancer beaucoup plus vite. Si vous avez un projet en tête mais que c’est encore flou, Adriel est clairement la bonne personne pour vous aider à le rendre concret.",
    linkedinUrl: "https://www.linkedin.com/in/youssoufgamby",
    avatar: "YAG",
  },
  {
    id: 3,
    locale: Locale.FR,
    name: "Angaman Brou Cedrick Delmas",
    position: "Developer Backend Java/Python",
    testimonial:
      "J’ai eu la chance de travailler avec Adriel Zimbril sur mon tout premier projet professionnel en intelligence artificielle. Il était Lead Project et en même temps mon mentor tout au long de l’aventure. Adriel m’a énormément appris, aussi bien sur la gestion de projet que sur les aspects techniques. Il m’a guidé avec patience, m’a challengé quand il fallait, et m’a surtout aidé à monter en compétence rapidement. \n J’ai pu prendre confiance, mieux structurer mon travail et comprendre les vrais enjeux d’un projet tech. Travailler avec lui a été une vraie opportunité, et je le recommande sincèrement à toute personne ou entreprise qui cherche un leader passionné, pédagogue et efficace.",
    websiteUrl: "https://growthlab.com",
    avatar: "CR",
  },
];

export function TestimonialsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const localeTestimonials = testimonials.filter(
    (testimonial) => testimonial.locale === locale
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % localeTestimonials.length);
    }, 10000); // Time interval to change testimonial cards is 10 seconds

    return () => clearInterval(interval);
  }, [locale, localeTestimonials]);

  const currentTestimonial: TestimonialCard =
    localeTestimonials[currentIndex] ?? localeTestimonials[0]!;

  const colorSets: string[][] = useMemo(() => {
    return Array.from({ length: localeTestimonials.length }).map(() =>
      Array.from({ length: 8 }).map(() => pickRandomColorCode() ?? "#ffffff")
    );
  }, [localeTestimonials]);

  return (
    <SectionLayout
      title={t("common.page-sections.testimonials.title")}
      description={t("common.page-sections.testimonials.description")}
      badge={t("common.page-sections.testimonials.badge")}
      isFlex
    >
      <div className="flex flex-col gap-4 md:gap-8 items-center justify-center px-6 max-w-5xl mx-auto">
        <Card className="squircle squircle-b-base squircle-3xl md:squircle-6xl squircle-smooth-xl border-0 overflow-hidden h-full">
          <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
            <div
              className={cn(
                "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-b-white overflow-hidden"
              )}
            >
              <div className="flex flex-col items-start gap-4 md:gap-6 w-full max-w-[90%] py-6 md:py-8 mx-auto">
                <Badge
                  className={cn(
                    currentTestimonial.linkedinUrl
                      ? "squircle-blue-100"
                      : "squircle-orange-200"
                  )}
                  contentClassName="flex items-center gap-1 font-bold"
                  variant="colored"
                >
                  {(currentTestimonial.linkedinUrl ||
                    currentTestimonial.websiteUrl) && (
                    <>
                      {currentTestimonial?.linkedinUrl ? (
                        <>
                          <Linkedin size={18} variant="bulk" />
                          <span className="hidden md:block leading-0">
                            {t("common.base.linkedin")}
                          </span>
                        </>
                      ) : (
                        <>
                          <LinkOne size={18} variant="bulk" />
                          <span className="hidden md:block leading-0">
                            {t("common.base.website")}
                          </span>
                        </>
                      )}
                    </>
                  )}
                </Badge>
                <blockquote className="text-xl md:text-2xl tracking-tighter font-medium whitespace-pre-line text-zinc-700 leading-[150%] p-0">
                  "{currentTestimonial.testimonial}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 max-w-lg md:max-w-2xl">
                    <div className="size-10 md:size-12 rounded-full flex items-center justify-center">
                      <BoringAvatar
                        name={currentTestimonial?.avatar ?? ""}
                        colors={colorSets[currentIndex] ?? []}
                        variant="beam"
                        className="size-10 md:size-12"
                      />
                    </div>
                    <div className="text-start">
                      <cite className="text-lg font-medium text-primary not-italic">
                        {currentTestimonial.name}
                      </cite>
                      <p className="text-sm text-primary">
                        {currentTestimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "rounded-full transition-all duration-800 ease",
                  index === currentIndex
                    ? "bg-primary w-6 h-2"
                    : "bg-b-base w-2 h-2"
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
