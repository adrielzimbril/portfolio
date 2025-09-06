"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  ExternalLink,
} from "lucide-react";

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

export function TestimonialsSectionSimple() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

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
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Ce qu'ils disent</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les témoignages de mes clients et partenaires qui ont fait
            confiance à mon expertise.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-card border-4 border-zinc-100 rounded-3xl max-w-2xl mx-auto p-8 md:p-12 mb-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Avatar */}
            <div className="mx-auto mb-6 w-16 h-16 bg-muted rounded-full flex items-center justify-center text-lg">
              {currentTestimonial.avatar}
            </div>

            {/* Testimonial */}
            <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
              "{currentTestimonial.testimonial}"
            </blockquote>

            {/* Author Info */}
            <div className="space-y-2">
              <h3>{currentTestimonial.name}</h3>
              <p className="text-muted-foreground">
                {currentTestimonial.position} chez {currentTestimonial.company}
              </p>

              {/* Links */}
              <div className="flex items-center justify-center gap-4 pt-4">
                {currentTestimonial.linkedinUrl && (
                  <a
                    href={currentTestimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-accent transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {currentTestimonial.websiteUrl && (
                  <a
                    href={currentTestimonial.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Site web
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-6 h-2"
                    : "bg-muted hover:bg-accent w-2 h-2"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Prêt à faire partie de ces success stories ?
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Discutons de votre projet
          </button>
        </div>
      </div>
    </section>
  );
}
