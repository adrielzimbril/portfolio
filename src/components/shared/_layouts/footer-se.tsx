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
import { ButtonCopy } from "@/components/ui/button-copy";
import { Mail } from "@aurthle/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/data/route";

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
      <footer className="w-full">
        <SectionBase
          sectionClassName="w-full pt-0 pb-10"
          sectionContentClassName="w-full"
          cardClassName="w-full rounded-4xl bg-stone-100 dark:bg-zinc-900"
          cardContentClassName="w-full p-6 md:p-8"
          className="squircle squircle-b-white dark:squircle-zinc-800 squircle-xl md:squircle-3xl squircle-smooth-xl rounded-3xl border-0 overflow-hidden max-w-none"
        >
          <div className="flex relative flex-col w-full items-center justify-center p-4 md:p-16 gap-4 md:gap-8 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex-row justify-between items-start gap-8">
              <div className="flex flex-col gap-4 md:gap-6 w-full rounded-2xl">
                <div className="flex flex-col gap-6 rounded-3xl bg-b-bases bg-b-base py-4 px-4">
                  <div className="flex flex-col gap-2">
                    <Badge
                      variant="colored"
                      className="relative text-base squircle-b-white md:text-xl max-w-3xl leading-[115%]"
                    >
                      {t("common.shared.base.title")} 🦄
                    </Badge>
                    <span className="relative text-base text-zinc-600 px-2">
                      {t("common.shared.base.subtitle")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center flex-wrap content-center place-content-center md:place-content-start md:justify-start gap-3">
                  {Object.entries(siteConfig.links.contact.social)
                    .filter(([_, social]) => social.available)
                    .map(([name, social]) => (
                      <Link
                        key={name}
                        href={social.url}
                        likeButton
                        whileTap
                        size="xs"
                        //variant="outline"
                        aria-label={name}
                      >
                        <span className="flex items-center size-full justify-center m-auto">
                          <span className="capsitalize">
                            {social.key != "email"
                              ? t("common.base." + social.key)
                              : social.name}
                          </span>
                        </span>
                      </Link>
                    ))}
                </div>
              </div>

              <div className="flex flex-col justify-self-end gap-6 w-full md:max-w-md rounded-2xl bg-b-bases bg-b-base p-4">
                <div className="flex flex-col gap-4 max-w-sms">
                  <h4 className="text-3xl">
                    {t("common.page-sections.newsletter.footer.title")}
                  </h4>
                  <p className="text-base text-zinc-500">
                    {t("common.page-sections.newsletter.footer.description")}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link href={routes.newsletter.link} likeButton asFull>
                      {t("common.page-sections.newsletter.footer.button")}
                    </Link>
                    <span className="relative text-base text-zinc-600 bg-white p-2 rounded-xl">
                      {t("common.page-sections.newsletter.footer.subText")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full place-self-center rounded-3xl bg-b-base dark:bg-zinc-900 py-4 md:py-6">
              <div className="w-full flex flex-col md:flex-row justify-center place-content-center items-center gap-2">
                {resources.map((resource, index) => (
                  <>
                    <Link
                      key={index}
                      href={resource.slug}
                      className="text-base text-center md:text-left bg-white dark:bg-neutral-800 rounded-xl py-2 px-4"
                    >
                      {resource.title}
                    </Link>
                    {index < resources.length - 1 && (
                      <Separator
                        className={cn("bg-zinc-300", {
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

            <div className="flex flex-col md:flex-row w-full justify-center md:justify-between align-center place-content-center items-center gap-4 rounded-2xl py-4 md:px-6 bg-b-base dark:bg-zinc-900">
              <div className="flex items-center md:items-start gap-2 text-zinc-700 dark:text-zinc-200">
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
        </SectionBase>
      </footer>
    </>
  );
};
