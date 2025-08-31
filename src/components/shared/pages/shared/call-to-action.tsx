"use client";
import { Link } from "@/components/ui/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { EmojiPlaceholder } from "@/components/shared/pages/shared/emoji-placeholder";
import { routes } from "@/data/route";
import logger from "@/utils/logger";

function EmailForm() {
  const handleSubmit = () => {
    logger.info(email);
    // Check if email syntax is correct
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    alert("Merci pour votre inscription ! 🎁");

    // TODO: Send email to server
  };
  const id = useId();
  const isMobile = useIsMobile();
  const [email, setEmail] = useState("");

  return (
    <div className="relative grid grid-cols-1 w-full gap-4 items-start justify-start">
      <Input
        variant="secondary"
        id={id}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="😏 Voulez-vous recevoir des cadeaux ?"
        type="email"
      />
      {/* <EmailInputComponent /> */}
      <Button onClick={handleSubmit} size="lg" asPointer>
        Recevoir <span className="relative">{isMobile ? "📥" : "!"}</span>
      </Button>
    </div>
  );
}

function ContentSection({ isPage }: { isPage?: boolean }) {
  const handleLinkClick = (linkType: "blog" | "linkedin") => {
    if (linkType === "blog") {
      alert("Redirection vers le Blog...");
    } else {
      alert("Redirection vers LinkedIn...");
    }
  };

  return (
    <div className="flex flex-col gap-8 items-start justify-start relative">
      {isPage ? (
        <>
          <h2 className="relative">Envie de parler de SaaS ?</h2>
          <p className="relative">
            <span>
              Je partage régulièrement mes réflexions, retours d&apos;expérience
              et conseils sur mon
            </span>
            <Link
              href="https://blog.adrielzimbril.com"
              variant="ghost"
              onClick={() => handleLinkClick("blog")}
              className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline px-1"
            >
              Blog
            </Link>
            <span>et sur</span>
            <Link
              href="https://linkedin.com/in/adriel-zimbril"
              variant="ghost"
              onClick={() => handleLinkClick("linkedin")}
              className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline ps-1"
            >
              Linkedin
            </Link>
            <span>
              .<br aria-hidden="true" />
              Que ce soit pour discuter design, produit ou innovation,
              n&apos;hésitez pas à me contacter.
            </span>
          </p>
          <Link href={routes.contact.link} likeButton whileTap size="lg">
            Parler de SaaS 🦄
          </Link>
        </>
      ) : (
        <>
          <h2 className="relative">Discutons de votre prochain projet !</h2>
          <p className="relative">
            <span>
              Je partage régulièrement mes réflexions, retours d&apos;expérience
              et conseils sur mon
            </span>
            <Link
              href="https://blog.adrielzimbril.com"
              variant="ghost"
              onClick={() => handleLinkClick("blog")}
              className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline px-1"
            >
              Blog
            </Link>
            <span>et sur</span>
            <Link
              href="https://linkedin.com/in/adriel-zimbril"
              variant="ghost"
              onClick={() => handleLinkClick("linkedin")}
              className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline ps-1"
            >
              Linkedin
            </Link>
            <span>
              .<br aria-hidden="true" />
              Que ce soit pour discuter design, produit ou innovation,
              n&apos;hésitez pas à me contacter.
            </span>
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
      <EmojiPlaceholder src="/image-1001.png" isMobileHidden />
      <ContentSection isPage={isPage} />
    </SectionBase>
  );
}
