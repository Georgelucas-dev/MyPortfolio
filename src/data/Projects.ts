import type { ProjectSection, Project } from "./types"; // ajuste conforme sua estrutura

// Template 1
import t1HeroDesktop from "../assets/projects/psychologist-tamplate1/psychologist-template-hero-desktop.webp";
import t1HeroMobile from "../assets/projects/psychologist-tamplate1/psychologist-template-hero-mobile.webp";
import t1ServicesDesktop from "../assets/projects/psychologist-tamplate1/psychologist-template-services-desktop.png";
import t1ServicesMobile from "../assets/projects/psychologist-tamplate1/psychologist-template-services-mobile.png";
import t1AboutDesktop from "../assets/projects/psychologist-tamplate1/psychologist-template-about-desktop.png";
import t1AboutMobile from "../assets/projects/psychologist-tamplate1/psychologist-template-about-mobile.png";
import t1BgImg from "../assets/projects/psychologist-tamplate1/bg-image.webp"

// Template 2
import t2HeroDesktop from "../assets/projects/psychologist-tamplate2/psychologist-template-hero-desktop.webp";
import t2HeroMobile from "../assets/projects/psychologist-tamplate2/psychologist-template-hero-mobile.webp";
import t2ServicesDesktop from "../assets/projects/psychologist-tamplate2/psychologist-template-services-desktop.webp";
import t2ServicesMobile from "../assets/projects/psychologist-tamplate2/psychologist-template-services-mobile.webp";
import t2HowItWorksDesktop from "../assets/projects/psychologist-tamplate2/psychologist-template-howitworks-desktop.webp";
import t2HowItWorksMobile from "../assets/projects/psychologist-tamplate2/psychologist-template-howitworks-mobile.webp";
import t2BgImg from "../assets/projects/psychologist-tamplate2/bg-image.webp"

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  tags: string[];
  href: string;
  backgroundImage: string; // imagem padrão do "stage"
  relatedImages: string[]; // imagens que aparecem no hover (máx. 3)
  sections: ProjectSection[]; // mantido, caso use em outra página de case study
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
    backgroundImage: t1BgImg,
    relatedImages: [t1ServicesDesktop, t1AboutDesktop, t1HeroMobile],
    sections: [
      { desktopImage: t1HeroDesktop, mobileImage: t1HeroMobile },
      { desktopImage: t1ServicesMobile, mobileImage: t1ServicesDesktop },
      { desktopImage: t1AboutMobile, mobileImage: t1AboutDesktop },
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
    backgroundImage: t2BgImg,
    relatedImages: [t2ServicesDesktop, t2HowItWorksDesktop, t2HeroMobile],
    sections: [
      { desktopImage: t2HeroDesktop, mobileImage: t2HeroMobile },
      { desktopImage: t2ServicesMobile, mobileImage: t2ServicesDesktop },
      { desktopImage: t2HowItWorksDesktop, mobileImage: t2HowItWorksMobile },
    ],
  },
];
