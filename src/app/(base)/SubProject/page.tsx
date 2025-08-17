import React from "react";
import { Button } from "../../components/ui/button";
import { AdditionalResourcesSection } from "./sections/AdditionalResourcesSection/AdditionalResourcesSection";
import { ContactFormSection } from "./sections/ContactFormSection/ContactFormSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { InsightsSection } from "./sections/InsightsSection/InsightsSection";
import { IntroductionSection } from "./sections/IntroductionSection/IntroductionSection";
import { NavigationBarSection } from "./sections/NavigationBarSection/NavigationBarSection";
import { ProblemStatementSection } from "./sections/ProblemStatementSection/ProblemStatementSection";
import { ProjectDetailsSection } from "./sections/ProjectDetailsSection/ProjectDetailsSection";
import { ProjectGallerySection } from "./sections/ProjectGallerySection/ProjectGallerySection";
import { ProjectOverviewSection } from "./sections/ProjectOverviewSection/ProjectOverviewSection";
import { UserResearchSection } from "./sections/UserResearchSection/UserResearchSection";

const socialMediaLinks = [
  {
    name: "Linkedin",
    icon: "/linkedin.svg",
    alt: "Linkedin",
  },
  {
    name: "Instagram",
    icon: "/instagram.svg",
    alt: "Instagram",
  },
  {
    name: "Github",
    icon: "/github.svg",
    alt: "Github",
  },
  {
    name: "Dribbble",
    icon: "/dribbble.svg",
    alt: "Dribbble",
  },
  {
    name: "Facebook",
    icon: "/facebook.svg",
    alt: "Facebook",
  },
  {
    name: "X Twitter",
    icon: "/x-twitter-.svg",
    alt: "X twitter",
  },
  {
    name: "Mail",
    icon: "/mail.svg",
    alt: "Mail",
  },
];

export const SubProject () {
  return (
    <main className="flex flex-col w-full max-w-[1440px] mx-auto items-start relative bg-white">
      <NavigationBarSection />
      <HeaderSection />
      <ProjectDetailsSection />
      <ProjectGallerySection />
      <UserResearchSection />
      <ProblemStatementSection />
      <IntroductionSection />
      <InsightsSection />
      <ProjectOverviewSection />
      <AdditionalResourcesSection />
      <ContactFormSection />

      <footer className="flex items-center justify-center gap-2.5 relative w-full bg-white">
        <div className="flex items-center justify-center gap-2.5 px-[152px] py-[45px] relative flex-1 bg-[#f9f9f9] rounded-[32px_32px_0px_0px] overflow-hidden">
          <div className="flex flex-col w-[718px] justify-center gap-[7px] items-center relative">
            <p className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Bold',Helvetica] font-bold text-[#000000de] text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
              Copyright Holder © 2025 - All Right Reserved - Designed with ❤ by
              Adriel ZIMBRIL.
            </p>

            <div className="inline-flex items-start gap-1 p-1 relative flex-[0_0_auto] bg-white rounded-lg overflow-hidden">
              {socialMediaLinks.map((social, index) => (
                <Button
                  key={`social-${index}`}
                  variant="ghost"
                  size="sm"
                  className="inline-flex flex-wrap items-center justify-center gap-[11.45px_11.45px] p-[5.72px] relative flex-[0_0_auto] bg-black rounded-[29.03px] overflow-hidden h-auto hover:bg-gray-800"
                >
                  <img
                    className="relative w-[17.17px] h-[17.17px]"
                    alt={social.alt}
                    src={social.icon}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};
