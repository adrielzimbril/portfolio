"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { DetailsCard } from "@/components/shared/pages/shared/details-card";
import { useLocale, useTranslations } from "use-intl";
import { Locale } from "@/types";
import {
  WandIcon,
  LongitudeIcon,
  BalanceIcon,
  BookIcon,
} from "@/components/shared/icons/break-icons";

interface PhilosophyCard {
  title: string;
  locale: Locale;
  icon: React.ReactNode;
  alt: string;
  description: string;
}

const data: PhilosophyCard[] = [
  {
    title: "L’utilisateur avant tout",
    locale: Locale.FR,
    icon: <WandIcon />,
    alt: "Symbol",
    description:
      "Chaque projet commence par une question simple : qu’est-ce qui compte vraiment pour l’utilisateur ?\nMon rôle : transformer cette réponse en expériences qui donnent envie d’être utilisées et qui dépassent les attentes.",
  },
  {
    title: "User First",
    locale: Locale.EN,
    icon: <WandIcon />,
    alt: "Symbol",
    description:
      "Every project starts with a simple question: what truly matters to the user?\nMy role: turn that answer into experiences people love to use — and that exceed their expectations.",
  },
  {
    title: "以用户为先",
    locale: Locale.ZH_CN,
    icon: <WandIcon />,
    alt: "Symbol",
    description:
      "每个项目都从一个简单的问题开始：用户真正关心的是什么？\n我的使命：把答案转化为用户喜爱的体验，并超越他们的期望。",
  },
  {
    title: "Toujours en apprentissage",
    locale: Locale.FR,
    icon: <BookIcon />,
    alt: "Book",
    description:
      "Design, IA, growth, systèmes… J’aime rester curieux et explorer ce qui vient ensuite.\nChaque nouveauté est une occasion d’améliorer ce que je crée — et d’inspirer ceux avec qui je travaille.",
  },
  {
    title: "Always Learning",
    locale: Locale.EN,
    icon: <BookIcon />,
    alt: "Book",
    description:
      "Design, AI, growth, systems… I love staying curious and exploring what's next.\nEvery new insight is a chance to improve what I create — and inspire those I work with.",
  },
  {
    title: "持续学习",
    locale: Locale.ZH_CN,
    icon: <BookIcon />,
    alt: "Book",
    description:
      "设计、人工智能、增长、系统…… 我喜欢保持好奇，探索未来的新事物。\n每一次学习都是提升作品、启发身边人的机会。",
  },
  {
    title: "Des équipes qui s’élèvent",
    locale: Locale.FR,
    icon: <LongitudeIcon />,
    alt: "Longitude",
    description:
      "Un produit réussi est un travail d’équipe. J’adore créer des espaces où les idées circulent, où chacun se sent impliqué et où l’on construit quelque chose dont tout le monde est fier.",
  },
  {
    title: "Teams that Rise Together",
    locale: Locale.EN,
    icon: <LongitudeIcon />,
    alt: "Longitude",
    description:
      "A great product is always a team effort. I love creating spaces where ideas flow, everyone feels involved, and we build something everyone is proud of.",
  },
  {
    title: "团队共同成长",
    locale: Locale.ZH_CN,
    icon: <LongitudeIcon />,
    alt: "Longitude",
    description:
      "成功的产品离不开团队合作。我喜欢营造一个思想自由流动的空间，让每个人都感到参与其中，共同打造值得骄傲的成果。",
  },
  {
    title: "Agir vite, agir bien",
    locale: Locale.FR,
    icon: <BalanceIcon />,
    alt: "Balance default",
    description:
      "Je crois aux itérations rapides et aux décisions intentionnelles.\nChaque test est une boussole, chaque ajustement rapproche le produit de sa meilleure version.",
  },
  {
    title: "Move Fast, Move Right",
    locale: Locale.EN,
    icon: <BalanceIcon />,
    alt: "Balance default",
    description:
      "I believe in fast iterations and intentional decisions.\nEvery test is a compass, every adjustment brings the product closer to its best version.",
  },
  {
    title: "快速且正确地行动",
    locale: Locale.ZH_CN,
    icon: <BalanceIcon />,
    alt: "Balance default",
    description:
      "我相信快速迭代和有意图的决策。\n每一次测试都是指南针，每一次调整都让产品更接近最佳版本。",
  },
];

export function PhilosophySection() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <SectionLayout
      badge={t("about.page.philosophy-section.badge")}
      title={t("about.page.philosophy-section.title")}
      //description={t("about.page.philosophy-section.description")}
      layoutStart
    >
      {data
        .filter((item) => item.locale === locale)
        .map((item, index) => (
          <DetailsCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
    </SectionLayout>
  );
}
