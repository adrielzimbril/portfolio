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
import { Link } from "@/components/ui/link";
import { siteConfig } from "@/data/config";

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
    id: 0,
    locale: Locale.FR,
    name: "Koffi Éric Emmanuel YAO",
    position: "Fondateur de Li-Zo | Service de livraison",
    testimonial:
      "Travailler avec Adriel est un plaisir. Il est professionnel et disponible. J'ai apprécié son sens de la promptitude dans les feedback et son accompagnement même en fin de projet. Il a bossé sur la maquette d'une application qui sera dévoilée bientôt (🤫, je tais le nom pour l'instant). Ce sera un carton, je suis rassuré !",
    linkedinUrl:
      "https://www.linkedin.com/in/koffi-%C3%A9ric-emmanuel-y-292a3a137",
    avatar: "KEEY",
  },
  {
    id: 1,
    locale: Locale.FR,
    name: "Youssouf Aboubacar Yvan Gamby",
    position:
      "Fondateur de Etudiant CI | Plateforme de renforcement pour étudiants",
    testimonial:
      "J’avais besoin d’un développeur pour m’aider à lancer mon SaaS pour étudiants, mais au final, Adriel a été bien plus que ça. Il m’a accompagné comme un vrai conseiller. Il m’a aidé à clarifier mon idée, à structurer mon produit, et à mieux comprendre ce que je voulais vraiment proposer.\n Grâce à lui, j’ai pu poser des bases solides, éviter pas mal d’erreurs et avancer beaucoup plus vite. Si vous avez un projet en tête mais que c’est encore flou, Adriel est clairement la bonne personne pour vous aider à le rendre concret.",
    linkedinUrl: "https://www.linkedin.com/in/youssoufgamby",
    avatar: "YAG",
  },

  {
    id: 2,
    locale: Locale.FR,
    name: "Christian Junior Braffo",
    position: "Développeur Web & Certifié Cloud Practitioner",
    testimonial:
      "Adriel Zimbril n’est pas un simple développeur, c’est un développeur qui repousse ses limites à chaque fois, il est capable d’implémenter n’importe quelle maquette que vous lui proposer , Il est très ouvert et est toujours prêt à aider, c’est probablement le meilleur Dev que je connaisse",
    linkedinUrl: "https://www.linkedin.com/in/christian-junior-braffo-",
    avatar: "CJB",
  },
  {
    id: 3,
    locale: Locale.FR,
    name: "Oumar Dagnogo",
    position:
      "Étudiant en BIHAR (Big Data Intelligence for Human Augmented Reality)",
    testimonial:
      "Adriel Zimbril n’est pas un simple développeur, c’est un développeur qui repousse ses limites à chaque fois, il est capable d’implémenter n’importe quelle maquette que vous lui proposer , Il est très ouvert et est toujours prêt à aider, c’est probablement le meilleur Dev que je connaisse",
    linkedinUrl: "https://www.linkedin.com/in/oumar-dagnogo-66274530b",
    avatar: "OD",
  },
  {
    id: 4,
    locale: Locale.FR,
    name: "Angaman Brou Cedrick Delmas",
    position: "Developer Backend Java/Python",
    testimonial:
      "J’ai eu la chance d’être formé par Adriel en ui design et en développement, et cette expérience a vraiment changé ma manière de travailler et de m’organiser. Il explique de façon claire et directe, ce qui m’a permis de progresser vite. Grâce à lui, j’ai pu décrocher mon emploi et valider mon CDI.",
    linkedinUrl: "https://www.linkedin.com/in/oumar-dagnogo-66274530b",
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
      <div className="flex flex-col gap-4 md:gap-8 items-center justify-center md:px-6 md:max-w-5xl mx-auto">
        <Card className="squircle squircle-b-base squircle-3xl md:squircle-6xl squircle-smooth-xl border-0 overflow-hidden h-full">
          <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
            <div
              className={cn(
                "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white/100 overflow-hidden"
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
                <blockquote className="text-xl md:text-2xl tracking-tighter font-medium whitespace-pre-line text-b-white-foreground leading-[150%] p-0">
                  &ldquo;{currentTestimonial.testimonial}&rdquo;
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
                      <cite className="text-lg font-medium text-b-white-invert not-italic">
                        {currentTestimonial.name}
                      </cite>
                      <p className="text-sm text-b-white-invert">
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
                  "rounded-full cursor-pointer transition-all duration-800 ease",
                  index === currentIndex
                    ? "bg-b-white-invert-sec w-6 h-2"
                    : "bg-b-base w-2 h-2"
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Link
              href={siteConfig.links.contact.social.linkedin.url}
              //variant="outline"
              likeButton
              asIcon
              whileTap
              //size="xs"
            >
              <span className="flex items-center gap-1">
                {t("common.page-sections.testimonials.button")}{" "}
                <LinkOne size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
