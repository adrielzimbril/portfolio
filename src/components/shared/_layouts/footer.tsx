import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/link";
import {
  getBestResourcesLink,
  type ResourcePreview,
} from "@/integrations/content/lib";
import { getResourcesUrl, getThisMonth } from "@/utils";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { siteConfig } from "@/data/config";
import { routes } from "@/data/routes";
import { PageType } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { LinkOne } from "@aurthle/icons";
import { FooterLocaleSwitch } from "@/components/shared/_layouts/footer-locale-switch";

export async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const resources = await getBestResourcesLink({
    limit: 4,
    locale,
  });

  return (
    <footer className="w-full">
      <SectionBase
        sectionClassName="w-full pt-0! pb-8!"
        sectionContentClassName="w-full"
        cardClassName="w-full rounded-4xl bg-stone-100 dark:bg-zinc-900"
        cardContentClassName="w-full px-4 py-6 md:p-8"
        className="squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl rounded-3xl border-0 overflow-hidden max-w-none"
      >
        <div className="flex relative flex-col w-full items-center justify-center p-2 md:p-16 gap-4 md:gap-8 mx-auto">
          <div className="flex flex-col justify-center items-center lg:grid grid-cols-1 lg:grid-cols-2 lg:flex-row lg:justify-between lg:items-start gap-8">
            <div className="flex flex-col gap-4 md:gap-6 w-full rounded-2xl">
              <div className="flex flex-col gap-6 rounded-3xl bg-b-bases bg-b-base px-2 py-4 md:px-4">
                <div className="flex flex-col gap-2">
                  <StatusBadge
                    mode="inline"
                    status="available"
                    primaryText={t(
                      "common.shared.planning-badge.available.title",
                    )}
                    className="squircle-sh-white text-b-white-invert"
                    variant="colored"
                    size="md"
                  >
                    <Link href={routes.contact.link}>
                      <span className="flex items-center gap-2">
                        {t(
                          "common.shared.planning-badge.available.description-simple",
                          {
                            date: t("common.shared.months." + getThisMonth()),
                          },
                        )}
                        <LinkOne variant="bulk" size={20} />
                      </span>
                    </Link>
                  </StatusBadge>
                  <span className="relative text-base font-medium text-b-white-invert-sec px-2">
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
                      aria-label={name}
                    >
                      <span className="flex items-center size-full justify-center m-auto">
                        <span className="capsitalize">
                          {social.key !== "email"
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
                <p className="text-base text-b-white-invert-thr">
                  {t("common.page-sections.newsletter.footer.description")}
                </p>
                <div className="flex flex-col gap-2">
                  <Link href={routes.newsletter.link} likeButton asFull>
                    {t("common.page-sections.newsletter.footer.button")}
                  </Link>
                  <span className="relative text-base text-b-white-invert-sec bg-b-white p-2 rounded-xl">
                    {t("common.page-sections.newsletter.footer.subText")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <FooterResources resources={resources} />

          <div className="flex flex-col md:flex-row w-full justify-center md:justify-between align-center place-content-center items-center gap-4 rounded-2xl py-4 md:px-6 bg-b-base dark:bg-zinc-900">
            <div className="flex items-center md:items-start gap-2 text-b-white-foreground dark:text-zinc-200">
              <p className="relative font-medium text-base text-center md:text-left">
                <span className="relative">
                  {t("common.shared.text.copyright", {
                    year: new Date().getFullYear(),
                    author: siteConfig.details.name,
                  })}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FooterLocaleSwitch />
            </div>
          </div>
        </div>
      </SectionBase>
    </footer>
  );
}

async function FooterResources({
  resources,
}: {
  resources: ResourcePreview[];
}) {
  const t = await getTranslations();

  const footerLinks = [
    routes.community,
    routes.stats,
    routes.toolbox,
    routes.connections,
    routes.changelog,
  ];

  return (
    <div className="w-full place-self-center rounded-3xl bg-b-base dark:bg-zinc-900 py-4 md:py-6">
      {/* <div className="w-full flex flex-col gap-8 md:gap-10 py-6 md:py-10 border-t border-b-bases/10 border-t-bases/10 mt-4"> */}
      {/* Primary Navigation */}
      <nav
        className="w-full flex flex-wrap justify-center items-center gap-x-6 gap-y-3 px-4"
        aria-label="Footer navigation"
      >
        {footerLinks.map((item, index) => (
          <React.Fragment key={item.key}>
            <Link
              href={item.link}
              className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-b-white-invert-thr hover:text-b-primary transition-all duration-300 hover:tracking-[0.25em]"
            >
              {t(`common.menu.${item.key}.default`)}
            </Link>
            {index < footerLinks.length - 1 && (
              <div className="size-1 rounded-full bg-b-white-invert-thr/20 hidden md:block shrink-0" />
            )}
          </React.Fragment>
        ))}
      </nav>

      <div className="w-full flex flex-col flex-wrap md:flex-row justify-center place-content-center items-center gap-2">
        {resources.map((resource, index) => (
          <React.Fragment key={resource.slug ?? index}>
            <Link
              href={getResourcesUrl(PageType.HUB, resource.slug)}
              className="text-base text-center md:text-left bg-b-white rounded-xl py-2 px-4"
            >
              {resource.title}
            </Link>
            {index < resources.length - 1 && (
              <>
                <div className="hidden md:block w-px h-5 bg-zinc-300 rounded-xl" />
                <div className="block md:hidden w-12 h-px bg-zinc-300 rounded-xl" />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
