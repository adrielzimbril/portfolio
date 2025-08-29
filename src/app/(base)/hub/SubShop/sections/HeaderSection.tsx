import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Link } from "@/components/ui/link";
import { routes } from "@/data/route";
import { cn } from "@/lib/utils";
import { HeaderSection } from "@/components/shared/pages/resources/page/header-section";

const tags = [
  {
    text: "SaaS 🦄",
    bgColor: "squircle-[#afffad]",
  },
  {
    text: "Go To Market 🎯",
    bgColor: "squircle-[#ffe9ad]",
  },
  {
    text: "Web Application 📝",
    bgColor: "squircle-[#ade9ff]",
  },
  {
    text: "Design 🎨",
    bgColor: "squircle-[#f9f9f9]",
  },
  {
    text: "Mobile App 📱",
    bgColor: "squircle-[#e2e4ff]",
  },
];

function sHeaderSection() {
  return (
    <SectionBase
      sectionClassName="p-0 mt-20 mb-10 md:mb-20"
      isWide
      cardClassName="w-full"
      cardContentClassName="md:px-12 py-6 md:py-12"
    >
      {/* Header Preview Cards Image or Video or Text or Default */}
      <Card
        className={cn(
          "w-full squircle squircle-white squircle-smooth-xl squircle-6xl overflow-hidden p-5"
        )}
      >
        <CardContent
          className={cn(
            "w-full squircle squircle-stone-100 squircle-smooth-xl squircle-5xl overflow-hidden md:px-12 py-16 md:py-20"
          )}
        >
          <h3 className="h2 w-full relative mb-4">
            😎
            <br />I made you looked.
          </h3>
          <p className="relative text-4xl text-zinc-400">
            You can have the rest of the empty space here.
          </p>
        </CardContent>
      </Card>
      {/* Header Title */}
      <h1 className="h2 w-full font-normal relative">
        Design System × Product Thinking
      </h1>
      {/* Header Tags */}
      <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full squircle squircle-smooth-xl squircle-7xl squircle-white overflow-hidden">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className={`${tag.bgColor}`}
            variant="colored"
            size="sm"
          >
            {tag.text}
          </Badge>
        ))}
      </div>
      {/* Header Button */}
      <div className="relative w-full">
        <Link
          href={routes.contact.link}
          className="w-full font-bold text-2xl py-5"
          variant="default"
          size="lg"
          likeButton
          asFull
        >
          <span>Obtenir 🚀</span>
        </Link>
      </div>
    </SectionBase>
  );
}

// Exemple 1: Utilisation basique avec texte (valeurs par défaut)
function ExampleBasic() {
  return <HeaderSection />;
}

// Exemple 2: Avec une image
function ExampleWithImage() {
  return (
    <HeaderSection
      previewContent={{
        type: "image",
        src: "/agent-template-og.png",
        alt: "Dashboard preview",
        caption: "Notre nouvelle interface utilisateur",
      }}
      mainTitle="Design System × Product Thinking"
      ctaButton={{
        text: "Découvrir 🎨",
        href: "/discover",
      }}
    />
  );
}

// Exemple 3: Avec une vidéo
function ExampleWithVideo() {
  return (
    <HeaderSection
      previewContent={{
        type: "video",
        src: "/videos/product-demo.mp4",
        poster: "/images/video-poster.jpg",
        caption: "Démonstration en 30 secondes",
        autoplay: true,
        loop: true,
        muted: true,
      }}
      mainTitle="Productivité × Innovation"
      ctaButton={{
        text: "Regarder la démo 🎬",
        href: "/demo",
      }}
    />
  );
}

// Exemple 4: Avec du contenu personnalisé
function ExampleWithCustomContent() {
  const customContent = (
    <div className="text-center space-y-6">
      <div className="text-6xl animate-bounce">🚀</div>
      <h3 className="text-3xl font-bold text-gray-800">Prêt au décollage ?</h3>
      <div className="flex justify-center space-x-4">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-100"></div>
        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse delay-200"></div>
      </div>
      <p className="text-xl text-gray-600">Une expérience interactive unique</p>
    </div>
  );

  return (
    <HeaderSection
      previewContent={{
        type: "custom",
        content: customContent,
      }}
      mainTitle="Innovation × Créativité"
      ctaButton={{
        text: "Lancer 🚀",
        href: "/launch",
      }}
    />
  );
}

// Exemple 5: Texte personnalisé
function ExampleCustomText() {
  return (
    <HeaderSection
      previewContent={{
        type: "text",
        emoji: "🎯",
        title: "Atteignez vos objectifs",
        subtitle: "Avec notre solution complète",
      }}
      mainTitle="Performance × Résultats"
      tags={[
        {
          text: "Analytics 📊",
          bgColor: "squircle-[#ff9f43]",
        },
        {
          text: "Automation 🤖",
          bgColor: "squircle-[#48dbfb]",
        },
      ]}
      ctaButton={{
        text: "Commencer gratuitement 🎁",
        href: "/free-trial",
      }}
    />
  );
}

// Exemple 6: Image avec tags personnalisés
function ExampleImageWithTags() {
  const designTags = [
    {
      text: "Figma 🎨",
      bgColor: "squircle-[#f24e1e]",
    },
    {
      text: "Adobe XD 🎭",
      bgColor: "squircle-[#ff61f6]",
    },
    {
      text: "Sketch ✏️",
      bgColor: "squircle-[#fdcb6e]",
    },
  ];

  return (
    <HeaderSection
      previewContent={{
        type: "image",
        src: "/agent-template-og.png",
        alt: "Design mockups",
        caption: "Nos dernières créations",
      }}
      mainTitle="Design × Expérience Utilisateur"
      tags={designTags}
      ctaButton={{
        text: "Voir le portfolio 👀",
        href: "/portfolio",
        variant: "outline",
      }}
    />
  );
}

export {
  ExampleBasic,
  ExampleWithImage,
  ExampleWithVideo,
  ExampleWithCustomContent,
  ExampleCustomText,
  ExampleImageWithTags,
};
