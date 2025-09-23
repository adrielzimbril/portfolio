import { Badge } from "@/components/ui/badge";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { cn } from "@/utils/utils";
import { richTextComponent } from "@/module/content/utils/mdx-components";
import { routes } from "@/data/routes";
import { getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/link";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <>
      <SectionBase
        sectionClassName="w-full"
        sectionContentClassName="w-full"
        cardClassName="w-full"
        cardContentClassName="w-full p-6 md:p-8"
        className="squircle squircle-sh-white/100 squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
      >
        <div
          className={cn(
            "flex relative flex-col min-h-60 items-center justify-center text-center p-4 gap-4 max-w-4xl mx-auto"
          )}
        >
          <div className="flex relative flex-col items-center justify-center text-center pb-2 gap-3 md:gap-6">
            <Badge className="relative text-base font-normal md:font-medium md:text-xl max-w-3xl leading-[120%] text-b-white-invert-sec">
              {t("not-found.badge")}
            </Badge>

            <div className="text-7xl md:text-9xl py-2 leading-none select-none">
              🌒
            </div>

            <h1 className="self-stretch">
              {t.rich("not-found.title", { ...richTextComponent })}
            </h1>

            <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-snug text-b-white-invert-sec">
              {t("not-found.desc")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link href={routes.home.link} likeButton whileTap>
              <span className="font-bold text-base">
                {t("not-found.cta.home")}
              </span>
            </Link>

            <Link
              href={routes.newsletter.link}
              variant="secondary"
              likeButton
              whileTap
            >
              <span className="font-bold text-base">
                {t("not-found.cta.newsletter")}
              </span>
            </Link>
          </div>
        </div>
      </SectionBase>
    </>
  );
}
