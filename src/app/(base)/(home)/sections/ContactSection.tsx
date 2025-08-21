"use client";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { routes } from "@/data/route";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/useIsMobile";

function EmailInputComponent() {
  const [email, setEmail] = useState("");

  return (
    <div
      className="bg-[#ffffff] relative rounded-xl shrink-0"
      data-name="02 Controls / EmailInput"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="😏 vous voulez recevoir des cadeaux ?"
        className="box-border w-full bg-transparent flex gap-2.5 items-center justify-start overflow-clip px-4 py-[13px] relative text-[17px] tracking-[0.0731px] border-none outline-none "
      />
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#f9f9f9] border-solid inset-[-1px] pointer-events-none rounded-[13px]"
      />
    </div>
  );
}

function EmailForm() {
  const handleSubmit = () => {
    console.log(email);
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

function ContentSection() {
  const handleLinkClick = (linkType: "blog" | "linkedin") => {
    if (linkType === "blog") {
      alert("Redirection vers le Blog...");
    } else {
      alert("Redirection vers LinkedIn...");
    }
  };

  return (
    <div className="flex flex-col gap-8 items-start justify-start relative">
      <h2 className="relative">Discutons de votre prochain projet !</h2>
      <p className="relative">
        <span>
          Je partage régulièrement mes réflexions, retours d'expérience et
          conseils sur mon
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
    </div>
  );
}

function ImagePlaceholder() {
  const imgImage1001 = "/image-1001.png";
  return (
    <div className="relative hidden bg-white md:order-2 md:flex items-center justify-center overflow-clip size-full md:size-[80%] aspect-square rounded-full">
      <div className="relative shrink-0 size-[88px]" data-name="03 Emoji">
        <div
          className="absolute bg-center bg-cover bg-no-repeat inset-0"
          data-name="image 1001"
          style={{ backgroundImage: `url('${imgImage1001}')` }}
        />
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <SectionLayout isFlex>
      <Card className="squircle squircle-stone-100 squircle-7xl squircle-smooth-xl">
        <CardContent className="md:px-12 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-full">
            <ImagePlaceholder />
            <ContentSection />
          </div>
        </CardContent>
      </Card>
    </SectionLayout>
  );
}
