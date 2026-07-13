export interface ProjectSection {
  desktopImage: string;
  mobileImage: string;
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
        desktopImage: "src/assets/projects/psychologist-tamplate1/psychologist-template-hero-desktop.webp",
        mobileImage: "src/assets/projects/psychologist-tamplate1/psychologist-template-hero-mobile.webp",
      },
      {
        desktopImage: "src/assets/projects/psychologist-template.webp",
        mobileImage: "src/assets/projects/psychologist-template-mobile.webp",
      },
      {
        desktopImage: "src/assets/projects/psychologist-template.webp",
        mobileImage: "src/assets/projects/psychologist-template-mobile.webp",
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
        desktopImage: "src/assets/projects/psychologist-template2.webp",
        mobileImage: "src/assets/projects/psychologist-template2.webp",
      },
      {
        desktopImage: "src/assets/projects/psychologist-template2.webp",
        mobileImage: "src/assets/projects/psychologist-template2.webp",
      },
      {
        desktopImage: "src/assets/projects/psychologist-template2.webp",
        mobileImage: "src/assets/projects/psychologist-template2.webp",
      },
    ],
  },
];