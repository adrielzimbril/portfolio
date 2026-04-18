"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { cn } from "@/utils/utils";
import { Tags } from "@/components/shared/pages/resources/tags";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { useTranslations, useLocale } from "use-intl";
import { useEmailValidator } from "@/hooks/useValidation/useEmailValidator";
import { toast } from "@/components/shiro/providers/toast-provider";
import { richTextComponent } from "@/integrations/content/utils/mdx-components";
import { routes } from "@/data/routes";
import { usePageViews } from "@/hooks/usePageViews";
import { getPathUrl, sleep } from "@/utils";
import { useTurnstile } from "@/integrations/anti-bot/turnstile";
import { getTurnstileConfig } from "@/config";

export function NewsletterForm() {
  const t = useTranslations();
  const locale = useLocale();
  usePageViews(
    routes.newsletter.key,
    undefined,
    { locale: locale, path: getPathUrl(routes.newsletter.link) },
    false,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailValidator = useEmailValidator({
    value: email,
    label: "Email",
    required: true,
  });
  const isEmailValid = !Boolean(emailValidator(email));
  const { siteKey } = getTurnstileConfig();

  const { ref, token, error, isLoading, execute } = useTurnstile(
    siteKey || "",
    {
      appearance: "execute",
      execution: "execute",
      "retry-interval": 1000,
      theme: "auto",
    },
  );
  sleep(1000).then(() => execute());

  return (
    <>
      <SectionBase
        sectionClassName="w-full"
        sectionContentClassName="w-full"
        cardClassName="w-full"
        cardContentClassName="w-full px-4 py-6 md:p-8"
        className="squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
      >
        <div
          className={cn(
            "flex relative flex-col min-h-60 items-center justify-center text-center p-4 gap-4 max-w-4xl mx-auto",
          )}
        >
          <div className="flex relative flex-col items-center justify-center text-center pb-2 gap-3 md:gap-4">
            <Badge className="relative text-base font-normal md:font-medium md:text-xl max-w-3xl leading-[120%] text-b-white-invert-sec">
              {t("newsletter.page.badge")}
            </Badge>
            <h2 className="self-stretch">
              {t.rich("newsletter.page.title", {
                ...richTextComponent,
              })}
            </h2>
            <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-snug text-b-white-invert-sec">
              {t.rich("newsletter.page.desc", {
                ...richTextComponent,
              })}
            </p>
          </div>
          <Tags
            tags={t("common.page-sections.newsletter.tags").split(",")}
            isCentered
          />

          <div className="flex flex-col items-start gap-4 w-full md:max-w-[80%]">
            <div ref={ref} className="hidden" />
            <Input
              placeholder={t(
                "common.page-sections.newsletter.form.fields.email-page.placeholder",
              )}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              onClick={() => {
                if (isEmailValid && token) {
                  setIsModalOpen(true);
                } else {
                  execute();
                  toast.error(t("zod.errors.customized.email.invalid"));
                }
              }}
              asFull
              whileTap
              asPointer
            >
              <span className="font-bold text-base">
                {t("contact.page.form.submit")}
              </span>
            </Button>
          </div>
        </div>
      </SectionBase>

      <SubscriptionModal
        isOpen={isModalOpen}
        email={email || undefined}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
