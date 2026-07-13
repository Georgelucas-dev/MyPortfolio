import type { ProjectSection, Project } from "./types"; // ajuste conforme sua estrutura

// Template 1
import t1HeroDesktop from "../assets/projects/psychologist-tamplate1/psychologist-template-hero-desktop.webp";
import t1HeroMobile from "../assets/projects/psychologist-tamplate1/psychologist-template-hero-mobile.webp";
import t1ServicesDesktop from "../assets/projects/psychologist-tamplate1/psychologist-template-services-desktop.png";
import t1ServicesMobile from "../assets/projects/psychologist-tamplate1/psychologist-template-services-mobile.png";
import t1AboutDesktop from "../assets/projects/psychologist-tamplate1/psychologist-template-about-desktop.png";
import t1AboutMobile from "../assets/projects/psychologist-tamplate1/psychologist-template-about-mobile.png";
import t1Background from "../assets/projects/psychologist-tamplate1/background.jpg";
import t1BackgroundMobile from "../assets/projects/psychologist-tamplate1/background-mobile.jpg";

// Template 2
import t2HeroDesktop from "../assets/projects/psychologist-tamplate2/psychologist-template-hero-desktop.webp";
import t2HeroMobile from "../assets/projects/psychologist-tamplate2/psychologist-template-hero-mobile.webp";
import t2ServicesDesktop from "../assets/projects/psychologist-tamplate2/psychologist-template-services-desktop.webp";
import t2ServicesMobile from "../assets/projects/psychologist-tamplate2/psychologist-template-services-mobile.webp";
import t2HowItWorksDesktop from "../assets/projects/psychologist-tamplate2/psychologist-template-howitworks-desktop.webp";
import t2HowItWorksMobile from "../assets/projects/psychologist-tamplate2/psychologist-template-howitworks-mobile.webp";

export interface ProjectSection {
  desktopImage: string;
  mobileImage: string;
  backgroundImage?: string;
  backgroundImageMobile?: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  tags: string[];
  sections: ProjectSection[];
  href: string;
}

export const projectsData: Project[] = [
  {
    title: "Template para Psicólogos",
    subtitle: "Landing page profissional",
    description:
      "Projeto desenvolvido para transmitir confiança, facilitar o contato e aumentar conversões através de uma experiência moderna.",
    year: "2026",
    tags: ["React", "Tailwind", "Motion"],
    href: "#",
    sections: [
      {
        desktopImage: t1HeroDesktop,
        mobileImage: t1HeroMobile,
        backgroundImage: t1Background,
        backgroundImageMobile: t1BackgroundMobile,
      },
      {
        desktopImage: t1ServicesMobile,
        mobileImage: t1ServicesDesktop,
        backgroundImage: t1Background,
        backgroundImageMobile: t1BackgroundMobile,
      },
      {
        desktopImage: t1AboutMobile,
        mobileImage: t1AboutDesktop,
        backgroundImage: t1Background,
        backgroundImageMobile: t1BackgroundMobile,
      },
    ],
  },
  {
    title: "Template para Psicólogos 2",
    subtitle: "Landing page profissional",
    description:
      "Projeto desenvolvido para transmitir confiança, facilitar o contato e aumentar conversões através de uma experiência moderna.",
    year: "2026",
    tags: ["React", "Tailwind", "Motion"],
    href: "#",
    sections: [
      {
        desktopImage: t2HeroDesktop,
        mobileImage: t2HeroMobile,
        backgroundImage: t1Background,
        backgroundImageMobile: t1BackgroundMobile,
      },
      {
        desktopImage: t2ServicesMobile,
        mobileImage: t2ServicesDesktop,
        backgroundImage: t1Background,
        backgroundImageMobile: t1BackgroundMobile,
      },
      {
        desktopImage: t2HowItWorksDesktop,
        mobileImage: t2HowItWorksMobile,
        backgroundImage: t1Background,
        backgroundImageMobile: t1BackgroundMobile,
      },
    ],
  },
];
