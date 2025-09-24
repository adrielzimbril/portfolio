"use client";
import React from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { DetailsCard } from "@/components/shared/pages/shared/details-card";
import { useLocale, useTranslations } from "use-intl";
import {
  HandshakeIcon,
  PlayingCardsIcon,
  ShapeIcon,
  ThreeDIcon,
} from "@/components/shared/icons/break-icons";

interface CraftSectionCard {
  icon: string | React.ReactNode;
  locale: string;
  title: string;
  description: string;
}

const data: CraftSectionCard[] = [
  {
    icon: <PlayingCardsIcon />,
    locale: "fr",
    title: "Pour les entreprises",
    description:
      "J’aime concevoir des interfaces qui respirent la simplicité, qui s’intègrent naturellement dans la vie de vos utilisateurs et qui respectent vos objectifs business sur le long terme.\n\n🎯 Impact : des clients satisfaits, des équipes techniques qui implémentent sans stress et un produit qui prouve sa valeur sur le long terme.",
  },
  {
    icon: <PlayingCardsIcon />,
    locale: "en",
    title: "For Businesses",
    description:
      "I love designing interfaces that breathe simplicity, fit naturally into your users' lives, and respect your long-term business goals.\n\n🎯 Impact: satisfied customers, engineering teams implementing without stress, and a product that proves its value over time.",
  },
  {
    icon: <PlayingCardsIcon />,
    locale: "zh-CN",
    title: "面向企业",
    description:
      "我喜欢设计简洁、自然融入用户生活的界面，并符合您长期的业务目标。\n\n🎯 影响：客户满意，技术团队无压力地实现，产品长期证明其价值。",
  },
  {
    icon: <ThreeDIcon />,
    locale: "fr",
    title: "Pour les startups",
    description:
      "Construire un produit, c’est avant tout comprendre ce qui compte vraiment. Ensemble, nous clarifions le problème, imaginons un MVP réaliste et choisissons les bons outils pour tester vos hypothèses rapidement.\n\n🎯 Impact : moins de paris hasardeux, plus d’apprentissages concrets et un premier produit qui attire vos vrais utilisateurs.",
  },
  {
    icon: <ThreeDIcon />,
    locale: "en",
    title: "For Startups",
    description:
      "Building a product starts with understanding what truly matters. Together, we clarify the problem, imagine a realistic MVP, and choose the right tools to quickly test your hypotheses.\n\n🎯 Impact: fewer risky bets, more concrete learnings, and a first product that attracts your real users.",
  },
  {
    icon: <ThreeDIcon />,
    locale: "zh-CN",
    title: "面向初创公司",
    description:
      "构建产品首先要理解真正重要的事情。我们一起明确问题，设计一个可行的 MVP，并选择合适的工具快速验证您的假设。\n\n🎯 影响：减少盲目下注，获得更多真实的学习成果，打造吸引真实用户的首款产品。",
  },
  {
    icon: <HandshakeIcon />,
    locale: "fr",
    title: "Pour les équipes produits",
    description:
      "Les meilleurs produits naissent d’équipes alignées et curieuses. À travers des ateliers et des sessions de co-création, j’aide vos équipes à voir leurs défis autrement et à trouver des solutions qui font grandir votre produit.\n\n🎯 Impact : un produit qui évolue dans la bonne direction, et des équipes motivées et fières de ce qu’elles construisent.",
  },
  {
    icon: <HandshakeIcon />,
    locale: "en",
    title: "For Product Teams",
    description:
      "The best products are born from aligned, curious teams. Through workshops and co-creation sessions, I help your teams see their challenges differently and find solutions that make your product grow.\n\n🎯 Impact: a product that evolves in the right direction and teams that are motivated and proud of what they build.",
  },
  {
    icon: <HandshakeIcon />,
    locale: "zh-CN",
    title: "面向产品团队",
    description:
      "最好的产品来自于团结且好奇的团队。通过工作坊和协作会议，我帮助您的团队以新的视角看待挑战，找到推动产品成长的解决方案。\n\n🎯 影响：产品沿着正确方向发展，团队充满动力并为自己的成果感到自豪。",
  },
  {
    icon: <ShapeIcon />,
    locale: "fr",
    title: "Pour les étudiants",
    description:
      "Apprendre le design, ce n’est pas seulement suivre un cours : c’est comprendre comment passer d’une idée brute à un projet qui tient la route. Mes formations et ressources sont là pour vous donner les bons réflexes dès le départ.\n\n🎯 Impact : plus de confiance, moins d’abandon, et la satisfaction de voir vos idées devenir réelles.",
  },
  {
    icon: <ShapeIcon />,
    locale: "en",
    title: "For Students",
    description:
      "Learning design is not just about taking a class: it's about understanding how to turn a raw idea into a viable project. My trainings and resources are here to give you the right reflexes from the start.\n\n🎯 Impact: more confidence, less dropouts, and the satisfaction of seeing your ideas become real.",
  },
  {
    icon: <ShapeIcon />,
    locale: "zh-CN",
    title: "面向学生",
    description:
      "学习设计不仅仅是上课，而是理解如何将一个原始想法变成可行的项目。我的培训和资源能让你从一开始就养成正确的思维习惯。\n\n🎯 影响：更多自信，更少放弃，看到自己的想法变为现实的满足感。",
  },
];



export function CraftSection() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <SectionLayout
      badge={t("about.page.craft-section.badge")}
      title={t("about.page.craft-section.title")}
      //description={t("about.page.craft-section.description")}
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
