"use client";
import { Link } from "@/components/ui/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { routes } from "@/data/routes";
import { getImageUrl } from "@/utils/base-url";
import { siteConfig } from "@/data/config";
import { useTranslations } from "use-intl";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { useEmailValidator } from "@/hooks/useValidation";
import { toast } from "sonner";
import { richTextComponent } from "@/module/content/utils/mdx-components";

function EmailForm() {
  const t = useTranslations();

  const id = useId();
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailValidator = useEmailValidator({ label: "Email", required: true });
  const isEmailValid = !Boolean(emailValidator(email));

  return (
    <>
      <div className="relative grid grid-cols-1 w-full gap-4 items-start justify-start">
        <Input
          variant="secondary"
          id={id}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t(
            "common.page-sections.cta.variant-two.form.placeholder"
          )}
          type="email"
        />

        <Button
          onClick={() => {
            if (isEmailValid) {
              setIsModalOpen(true);
            } else {
              toast.error(t("zod.errors.customized.email.invalid"));
            }
          }}
          size="lg"
          asPointer
        >
          {t("common.page-sections.cta.variant-two.form.button")}{" "}
          <span className="relative">{isMobile ? "📥" : "!"}</span>
        </Button>
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        email={email}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function ContentSection({ isPage }: { isPage?: boolean }) {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-8 items-start justify-start relative">
      {isPage ? (
        <>
          <h2 className="relative">
            {t("common.page-sections.cta.variant-one.title")}
          </h2>

          {t.rich("common.page-sections.cta.variant-one.description", {
            ...richTextComponent,
          })}
          <Link href={routes.contact.link} likeButton whileTap size="lg">
            {t("common.page-sections.cta.variant-one.button")}
          </Link>
        </>
      ) : (
        <>
          <h2 className="relative">
            {t("common.page-sections.cta.variant-two.title")}
          </h2>

          {t.rich("common.page-sections.cta.variant-two.description", {
            ...richTextComponent,
          })}
          <EmailForm />
        </>
      )}
    </div>
  );
}

export function CallToAction({ isPage }: { isPage?: boolean }) {
  return (
    <SectionBase isCallToAction>
      <EmojiPlaceholder src={getImageUrl("/image-1001.png")} isMobileHidden />
      <ContentSection isPage={isPage} />
    </SectionBase>
  );
}
