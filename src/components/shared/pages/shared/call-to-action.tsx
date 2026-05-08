"use client";
import { Link } from "@/components/ui/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { routes } from "@/data/routes";
import { SubscriptionModal } from "@/components/shared/pages/newsletter/SubscriptionModal";
import { useEmailValidator } from "@/hooks/useValidation";
import { toast } from "@/lib/toast";

function EmailForm() {
  const id = useId();
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailValidator = useEmailValidator({
    value: email,
    label: "Email",
    required: true,
  });
  const isEmailValid = !Boolean(emailValidator(email));

  return (
    <>
      <div className="relative grid grid-cols-1 w-full gap-4 items-start justify-start">
        <Input
          variant="secondary"
          id={id}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          type="email"
        />

        <Button
          onClick={() => {
            if (isEmailValid) {
              setIsModalOpen(true);
            } else {
              toast.error("Email invalide");
            }
          }}
          size="lg"
          asPointer
        >
          S&apos;abonner{" "}
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
  return (
    <div className="flex flex-col gap-8 items-start justify-start relative">
      {isPage ? (
        <>
          <h2 className="relative">Discutons de votre projet</h2>

          <p className="text-b-white-invert-sec">
            Vous avez un projet en tête ? N&apos;hésitez pas à me contacter pour
            en discuter.
          </p>
          <Link href={routes.contact.link} likeButton whileTap size="lg">
            Me contacter
          </Link>
        </>
      ) : (
        <>
          <h2 className="relative">Restez informé</h2>

          <p className="text-b-white-invert-sec">
            Inscrivez-vous à ma newsletter pour recevoir les dernières mises à
            jour.
          </p>
          <EmailForm />
        </>
      )}
    </div>
  );
}

export function CallToAction({ isPage }: { isPage?: boolean }) {
  return (
    <SectionBase isCallToAction>
      <EmojiPlaceholder
        //src={getImageUrl(getEmojiHub("📥", "fluent", "anim"))}
        src={{ emoji: "📥" }}
        isMobileShowed
      />
      <ContentSection isPage={isPage} />
    </SectionBase>
  );
}
