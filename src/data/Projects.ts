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
  sections: ProjectSection[]; // 3 seções: cada uma com print desktop + mobile
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
    // TODO: trocar pelos prints reais de cada seção (desktop + mobile)
    sections: [
      {
        desktopImage:
          "src/assets/projects/psychologist-tamplate1/psychologist-template-hero-desktop.webp",
        mobileImage:
          "src/assets/projects/psychologist-tamplate1/psychologist-template-hero-mobile.webp",
        backgroundImage:
          "src/assets/projects/psychologist-tamplate1/background.jpg",
        backgroundImageMobile:
          "src/assets/projects/psychologist-tamplate1/background-mobile.jpg",
      },
      {
        desktopImage:
          "src/assets/projects/psychologist-tamplate1/psychologist-template-services-mobile.png",
        mobileImage:
          "src/assets/projects/psychologist-tamplate1/psychologist-template-services-desktop.png",
        backgroundImage:
          "src/assets/projects/psychologist-tamplate1/background.jpg",
        backgroundImageMobile:
          "src/assets/projects/psychologist-tamplate1/background-mobile.jpg",
      },
      {
        desktopImage:
          "src/assets/projects/psychologist-tamplate1/psychologist-template-about-mobile.png",
        mobileImage:
          "src/assets/projects/psychologist-tamplate1/psychologist-template-about-desktop.png",
        backgroundImage:
          "src/assets/projects/psychologist-tamplate1/background.jpg",
        backgroundImageMobile:
          "src/assets/projects/psychologist-tamplate1/background-mobile.jpg",
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
        desktopImage:
          "src/assets/projects/psychologist-tamplate2/psychologist-template-hero-desktop.webp",
        mobileImage:
          "src/assets/projects/psychologist-tamplate2/psychologist-template-hero-mobile.webp",
        backgroundImage:
          "src/assets/projects/psychologist-tamplate1/background.jpg",
        backgroundImageMobile:
          "src/assets/projects/psychologist-tamplate1/background-mobile.jpg",
      },
      {
        desktopImage:
          "src/assets/projects/psychologist-tamplate2/psychologist-template-services-mobile.webp",
        mobileImage:
          "src/assets/projects/psychologist-tamplate2/psychologist-template-services-desktop.webp",
        backgroundImage:
          "src/assets/projects/psychologist-tamplate1/background.jpg",
        backgroundImageMobile:
          "src/assets/projects/psychologist-tamplate1/background-mobile.jpg",
      },
      {
        desktopImage: "src/assets/projects/psychologist-tamplate2/psychologist-template-howitworks-desktop.webp",
        mobileImage: "src/assets/projects/psychologist-tamplate2/psychologist-template-howitworks-mobile.webp",
        backgroundImage:
          "src/assets/projects/psychologist-tamplate1/background.jpg",
        backgroundImageMobile:
          "src/assets/projects/psychologist-tamplate1/background-mobile.jpg",
      },
    ],
  },
];
