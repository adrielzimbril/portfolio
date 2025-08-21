import React, { JSX } from "react";
import { AboutMeSection } from "./sections/AboutMeSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ServicesSection } from "./sections/ServicesSection";


export default function About () {
  return (
    <div className="flex flex-col w-full max-w-[1440px] items-start relative bg-white mx-auto">
      <NavigationBarSection />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutMeSection />
      <ContactSection />
     
    </div>
  );
};
