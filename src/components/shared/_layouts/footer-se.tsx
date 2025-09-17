"use client";
import React, { useEffect, useState } from "react";
import {
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
  DribbbleIcon,
  FacebookIcon,
  TwitterIcon,
  MailIcon,
  HeartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "use-intl";
import { Separator } from "@/components/ui/separator";
import { LocaleSwitch } from "./footer";
import { Link } from "@/components/ui/link";
import logger from "@/utils/logger";
import {
  getAllResources,
  getBestResourcesLink,
  ResourcePreview,
} from "@/module/content/utils/lib";
import { Resource } from "content-collections";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/utils";
import { SectionBase } from "../pages/shared/section-base";
import { getEmojiByName, getEmojiFromString } from "@aurthle/emoji-hub";
import { siteConfig } from "@/data/config";

const socialIcons = [
  { icon: LinkedinIcon, alt: "LinkedIn", href: "#" },
  { icon: InstagramIcon, alt: "Instagram", href: "#" },
  { icon: GithubIcon, alt: "Github", href: "#" },
  { icon: DribbbleIcon, alt: "Dribbble", href: "#" },
  { icon: FacebookIcon, alt: "Facebook", href: "#" },
  { icon: TwitterIcon, alt: "Twitter", href: "#" },
  { icon: MailIcon, alt: "Email", href: "mailto:contact@adrielzimbril.com" },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Hub", href: "/hub" },
      { label: "Projets", href: "/projects" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Consultation", href: "#" },
      { label: "Support", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
];

export const FooterSec: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const [resources, setResources] = useState<ResourcePreview[]>([]);
  const config = {
    limit: 4,
  };

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await getBestResourcesLink({
          limit: config.limit,
          locale,
        });
        setResources(data);
      } catch (err) {
        logger.error(err);
      }
    }

    loadResources();
  }, []);

  return (
    <>
      <footer className="w-full bg-white">
        <SectionBase
          sectionClassName="w-full"
          sectionContentClassName="w-full"
          cardClassName="w-full rounded-3xl bg-stone-100"
          cardContentClassName="w-full p-6 md:p-8"
          className="ssquircle ssquircle-white ssquircle-xl md:ssquircle-3xl ssquircle-smooth-xl bg-whitde rounded-3xl border-0 overflow-hidden max-w-none min-h-60 py-4 md:py-12"
        >
          <div
            className={cn(
              "flex relative flex-col w-full min-h-60 items-center justify-center px-4 gap-4 md:gap-8 mx-auto"
            )}
          >
            <div className="w-full  md:px-8">
              {/* Header du footer avec logo et description */}
              <div className="flexs flex-cols grid grid-cols-1 md:grid-cols-2 lg:flex-row justify-between items-start mb-12 gap-8">
                <div className="flex flex-col gap-6 max-w-md  rounded-2xl bg-zinc-100s sbg-white spy-6 spx-4">
                  <div className="flex items-center gap-2.5">
                    <img className="w-14 h-14" alt="Icon" src="/icon.svg" />
                    <img
                      className="flex-shrink-0"
                      alt="Adriel zimbril"
                      src="/adriel-zimbril.svg"
                    />
                  </div>
                  <p className="font-normal hidsden">
                    Expert en automatisation IA et acquisition client. Je
                    partage mes stratégies pour aider les entrepreneurs à
                    développer leur business grâce à la méthode Tsunami 🌊
                  </p>

                  {/* Réseaux sociaux */}
                  <div className="hidden sflex flex-col eitems-center gap-3">
                    <div className="flex items-center flex-wrap content-center place-content-center md:place-content-start md:justify-start gap-3">
                      {socialIcons.map((social, index) => (
                        <Link
                          key={index}
                          href={social.href}
                          likeButton
                          variant="outline"
                          size="icon"
                          asIcon
                          aria-label={social.alt}
                        >
                          <span className="flex items-center size-full justify-center m-auto">
                            <social.icon className="size-5!" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center md:items-end gap-2">
                    <LocaleSwitch />
                  </div>
                </div>

                {/* Newsletter signup */}
                <div className="flex flex-col gap-6 max-w-md rounded-2xl bg-zinc-100s bg-white border-4 border-white py-4 px-4">
                  <div className="flex flex-col gap-4 max-w-sm">
                    <h3 className="font-title-03-28 font-[number:var(--title-03-28-font-weight)] text-[length:var(--title-03-28-font-size)] tracking-[var(--title-03-28-letter-spacing)] leading-[var(--title-03-28-line-height)]">
                      🎁 Recevoir les cadeaux
                    </h3>
                    <p className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-[15px] tracking-[0.07px] leading-[20px]">
                      Rejoignez plus de 90K entrepreneurs qui reçoivent nos
                      stratégies exclusives
                    </p>
                    <Button asPointer>S'inscrire maintenant</Button>
                  </div>
                  {/* Réseaux sociaux */}
                  <div className="flex flex-col eitems-center gap-3">
                    <div className="flex items-center flex-wrap content-center place-content-center md:place-content-start md:justify-start gap-3">
                      {socialIcons.map((social, index) => (
                        <Link
                          key={index}
                          href={social.href}
                          likeButton
                          variant="outline"
                          size="icon"
                          asIcon
                          aria-label={social.alt}
                        >
                          <span className="flex items-center size-full justify-center m-auto">
                            <social.icon className="size-5!" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Liens du footer */}
              <div className="hidden qgrid md:grid-cols-3 gap-8 mb-12">
                {footerLinks.map((section, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <h4 className="font-medium-17 font-[number:var(--medium-17-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--medium-17-font-size)] tracking-[var(--medium-17-letter-spacing)] leading-[var(--medium-17-line-height)]">
                      {section.title}
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-[15px] tracking-[0.07px] leading-[20px] hover:text-text-iconslight-high-emphasis transition-colors duration-200"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="flex flex-col gap-4">
                  <h4 className="font-medium-17 font-[number:var(--medium-17-font-weight)] text-text-iconslight-high-emphasis text-[length:var(--medium-17-font-size)] tracking-[var(--medium-17-letter-spacing)] leading-[var(--medium-17-line-height)]">
                    Ressources
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {resources.map((resource, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={resource.slug}
                          className="[font-family:'SF_Pro_Text-Regular',Helvetica] font-normal text-text-iconslight-medium-emphasis text-[15px] tracking-[0.07px] leading-[20px] hover:text-text-iconslight-high-emphasis transition-colors duration-200"
                        >
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-full place-self-center rounded-2xl bg-zinc-100s bg-white">
                <Separator className="my-4 md:mt-8 md:mb-6 bg-inherit" />

                <div className="w-full flex justify-center place-content-center items-center">
                  <div className="flex flex-col md:flex-row justify-center items-center place-content-center gap-2">
                    {resources.map((resource, index) => (
                      <>
                        <Link
                          key={index}
                          href={resource.slug}
                          className="text-base text-center md:text-left bg-whites bg-whites bg-zinc-100 rounded-xl py-2 px-4"
                        >
                          {resource.title}
                        </Link>
                        {index < resources.length - 1 && (
                          <Separator
                            className={cn("sbg-zinc-400", {
                              hidden: isMobile,
                              "h-5": !isMobile,
                            })}
                            orientation={isMobile ? "horizontal" : "vertical"}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </div>

                <Separator className="my-4 md:mt-6 md:mb-8 bg-inherit" />
              </div>

              <div className="flex flex-col md:flex-row w-full justify-center md:justify-between align-center place-content-center items-center gap-4 rounded-2xl py-4 md:px-6 bg-zinc-100s bg-white">
                <div className="flex items-center md:items-start gap-2 text-zinc-700">
                  <p className="relative font-medium text-base text-center md:text-left">
                    <span className="relative">
                      {t("common.shared.text.copyright", {
                        year: new Date().getFullYear(),
                        author: siteConfig.details.name,
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex items-center md:items-end gap-2">
                  <LocaleSwitch />
                </div>
              </div>
            </div>
          </div>
        </SectionBase>
      </footer>
    </>
  );
};
