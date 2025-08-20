import React from "react";
import { ContactSection } from "./sections/ContactSection/ContactSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { NavigationBarSection } from "./sections/NavigationBarSection/NavigationBarSection";
import { ProjectsSection } from "./sections/ProjectsSection/ProjectsSection";

export default function MyProject() {
  const socialMediaLinks = [
    {
      alt: "Linkedin",
      src: "/linkedin.svg",
    },
    {
      alt: "Instagram",
      src: "/instagram.svg",
    },
    {
      alt: "Github",
      src: "/github.svg",
    },
    {
      alt: "Dribbble",
      src: "/dribbble.svg",
    },
    {
      alt: "Facebook",
      src: "/facebook.svg",
    },
    {
      alt: "X twitter",
      src: "/x-twitter-.svg",
    },
    {
      alt: "Mail",
      src: "/mail.svg",
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto items-start relative bg-white">
      <NavigationBarSection />
      <HeaderSection />
      <ProjectsSection />
      <ContactSection />
      <footer className="flex items-center justify-center gap-2.5 relative self-stretch w-full bg-white">
        <div className="flex items-center justify-center gap-2.5 px-[152px] py-[45px] relative flex-1 self-stretch grow bg-[#f9f9f9] rounded-[32px_32px_0px_0px] overflow-hidden">
          <div className="flex-col w-[718px] justify-center gap-[7px] flex items-center relative">
            <div className="relative w-fit mt-[-1.00px] [font-family:'SF_Pro_Text-Bold',Helvetica] font-bold text-[#000000de] text-[17px] tracking-[0.07px] leading-[22px] whitespace-nowrap">
              Copyright Holder © 2025 - All Right Reserved - Designed with ❤ by
              Adriel ZIMBRIL.
            </div>

            <div className="inline-flex items-start gap-1 p-1 relative flex-[0_0_auto] bg-white rounded-lg overflow-hidden">
              {socialMediaLinks.map((link, index) => (
                <div
                  key={`social-${index}`}
                  className="inline-flex flex-wrap items-center justify-center gap-[11.45px_11.45px] p-[5.72px] relative flex-[0_0_auto] bg-black rounded-[29.03px] overflow-hidden"
                >
                  <img
                    className="relative w-[17.17px] h-[17.17px]"
                    alt={link.alt}
                    src={link.src}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
