import { Badge } from "@/components/ui/badge";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { cn } from "@/utils/utils";
import { routes } from "@/data/routes";
import { Link } from "@/components/ui/link";
import { Metadata } from "next";
import { metadata as baseMetadata } from "@/app/metadata";
import { Navbar } from "@/components/shared/_layouts/navbar";
import { ScrollToTop } from "@/components/shared/_layouts/scroll-to-top";

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    ...baseMetadata,
    title: "Page non trouvée",
    description: "La page que vous recherchez n'existe pas.",
    keywords: "404, page non trouvée, erreur",
  };

  return metadata;
}

export default async function NotFound() {
  return (
    <>
      <div className="container mx-auto relative min-h-dvh flex flex-col">
        <SectionBase
          sectionClassName="w-full"
          sectionContentClassName="w-full"
          cardClassName="w-full"
          cardContentClassName="w-full px-4 py-6 md:p-8"
          className="squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
        >
          <div
            className={cn(
              "flex relative flex-col min-h-60 items-center justify-center text-center p-4 gap-4 max-w-4xl mx-auto",
            )}
          >
            <div className="flex relative flex-col items-center justify-center text-center pb-2 gap-3 md:gap-6">
              <Badge className="relative text-base font-normal md:font-medium md:text-xl max-w-3xl leading-[120%] text-b-white-invert-sec">
                404
              </Badge>

              <div className="text-7xl md:text-9xl py-2 leading-none select-none">
                🪐
              </div>

              <h1 className="self-stretch font-medium">Page non trouvée</h1>

              <p className="relative text-base font-normal md:font-medium md:text-2xl max-w-3xl leading-snug text-b-white-invert-sec">
                La page que vous recherchez n&apos;existe pas ou a été déplacée.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <Link href={routes.home.link} likeButton whileTap>
                <span className="font-bold text-base">
                  Retour à l&apos;accueil
                </span>
              </Link>
            </div>
          </div>
        </SectionBase>
        <ScrollToTop />
      </div>
    </>
  );
}
