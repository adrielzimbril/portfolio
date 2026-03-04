"use client";
import { Linkedin, LinkOne } from "@aurthle/icons";
import { useState, useEffect, useMemo } from "react";
import BoringAvatar from "boring-avatars";
import { cn, pickRandomColorCode } from "@/utils";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocale, useTranslations } from "use-intl";
import { Link } from "@/components/ui/link";
import { siteConfig } from "@/data/config";
import {
  getTestimonialsByLocale,
  type TestimonialItem,
} from "@/types/personalData";

export function TestimonialsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const localeTestimonials = useMemo(
    () => getTestimonialsByLocale(locale),
    [locale]
  );

  useEffect(() => {
    if (localeTestimonials.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % localeTestimonials.length);
    }, 10000); // Time interval to change testimonial cards is 10 seconds

    return () => clearInterval(interval);
  }, [localeTestimonials]);

  const currentTestimonial: TestimonialItem | undefined =
    localeTestimonials[currentIndex] ?? localeTestimonials[0];

  if (!currentTestimonial) {
    return null;
  }

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
        <Card className="squircle squircle-b-base squircle-4xl md:squircle-6xl squircle-smooth-xl border-0 overflow-hidden h-full">
          <CardContent className="grid grid-cols-1 px-4 md:px-6 py-4 md:py-6 gap-4 h-full">
            <div
              className={cn(
                "flex relative flex-col min-h-60 items-center justify-center p-4 squircle squircle-smooth-xl squircle-2xl md:squircle-4xl squircle-sh-white overflow-hidden"
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
            {localeTestimonials.map((_, index) => (
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
