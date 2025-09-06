"use client";
import { Link, Linkedin } from "@aurthle/icons";
import { useState, useEffect } from "react";
import BoringAvatar from "boring-avatars";
import { cn, pickRandomColorCode } from "@/utils";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Martin",
    position: "CEO",
    company: "TechStart",
    testimonial:
      "Adriel a transformé notre vision en une solution concrète qui génère des résultats exceptionnels. Son expertise en IA et sa compréhension des enjeux business sont remarquables.",
    linkedinUrl: "https://linkedin.com/in/sophiemartin",
    avatar: "SM",
  },
  {
    id: 2,
    name: "Marc Dubois",
    position: "Directeur Marketing",
    company: "InnovateCorp",
    testimonial:
      "L'automatisation mise en place par Adriel nous a fait gagner 40% de temps sur nos processus d'acquisition client. Un travail de qualité professionnelle.",
    linkedinUrl: "https://linkedin.com/in/marcdubois",
    avatar: "MD",
  },
  {
    id: 3,
    name: "Claire Rousseau",
    position: "Fondatrice",
    company: "GrowthLab",
    testimonial:
      "Collaborer avec Adriel, c'est avoir accès à une expertise rare. Il comprend parfaitement les défis des entrepreneurs et propose des solutions innovantes.",
    websiteUrl: "https://growthlab.com",
    avatar: "CR",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Time interval to change testimonial cards is 8 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <SectionLayout
      title="Témoignages"
      description="Découvrez les témoignages de mes clients et partenaires qui ont fait confiance à mon expertise."
      badge="Construire ensemble 🫱🏾‍🫲🏻"
      isFlex
    >
      <div className="flex flex-col gap-4 md:gap-8 items-center justify-center px-6 max-w-2xl mx-auto">
        <Card className="squircle squircle-stone-100 squircle-6xl squircle-smooth-xl border-0 overflow-hidden h-full md:max-w-2xl">
          <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
            <div
              className={cn(
                "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-white overflow-hidden"
              )}
            >
              <div className="flex flex-col items-start gap-4 md:gap-6 w-full max-w-[90%] py-6 md:py-8 mx-auto">
                <Badge
                  className="squircle-blue-100"
                  contentClassName="flex items-center gap-1"
                  variant="colored"
                >
                  {(currentTestimonial.linkedinUrl ||
                    currentTestimonial.websiteUrl) && (
                    <>
                      {currentTestimonial.linkedinUrl ? (
                        <>
                          <Linkedin size={16} variant="bulk" />
                          <span>LinkedIn</span>
                        </>
                      ) : (
                        <>
                          <Link size={16} variant="bulk" />
                          <span>Website</span>
                        </>
                      )}
                    </>
                  )}
                </Badge>
                <blockquote className="text-xl md:text-2xl tracking-tighter font-medium text-zinc-700 leading-[150%] p-0">
                  "{currentTestimonial.testimonial}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 max-w-sm">
                    <div className="size-6 md:size-12 bg-muted rounded-full flex items-center justify-center">
                      <BoringAvatar
                        name={currentTestimonial.avatar ?? ""}
                        colors={[
                          pickRandomColorCode(),
                          pickRandomColorCode(),
                          pickRandomColorCode(),
                          pickRandomColorCode(),
                        ]}
                        variant="beam"
                      />
                    </div>
                    <div className="text-start">
                      <cite className="text-lg font-medium text-primary not-italic">
                        {currentTestimonial.name}
                      </cite>
                      <p className="text-sm text-primary">
                        {currentTestimonial.position} chez{" "}
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Testimonial Card */}
        <div className="relative bg-card border-4 border-zinc-100 rounded-3xl max-w-2xl mx-auto p-8 md:py-12 mb-8 hidden">
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {/* Testimonial */}
            <blockquote className="text-xl md:text-2xl tracking-tighter font-medium text-zinc-700 leading-[150%] p-0">
              "{currentTestimonial.testimonial}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 max-w-sm">
                <div className="size-6 md:size-12 bg-muted rounded-full flex items-center justify-center">
                  <BoringAvatar
                    name={currentTestimonial.avatar ?? ""}
                    colors={[
                      pickRandomColorCode(),
                      pickRandomColorCode(),
                      pickRandomColorCode(),
                      pickRandomColorCode(),
                    ]}
                    variant="beam"
                  />
                </div>
                <div className="text-start">
                  <cite className="text-lg font-medium text-primary not-italic">
                    {currentTestimonial.name}
                  </cite>
                  <p className="text-sm text-primary">
                    {currentTestimonial.position} chez{" "}
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center justify-center gap-4 pt-4 hidden">
                {currentTestimonial.linkedinUrl && (
                  <a
                    href={currentTestimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm"
                  >
                    <Linkedin size={16} variant="bulk" />
                    LinkedIn
                  </a>
                )}
                {currentTestimonial.websiteUrl && (
                  <a
                    href={currentTestimonial.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm"
                  >
                    <Link size={16} variant="bulk" />
                    Site web
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "rounded-full transition-all duration-800 ease",
                  index === currentIndex
                    ? "bg-primary w-6 h-2"
                    : "bg-muted w-2 h-2"
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
