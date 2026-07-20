// src/data/about-data.ts

// TODO: troque pelos arquivos reais — são só placeholders de caminho.
import imgDefault from "../assets/image/Me.jpeg";
import imgCode from "../assets/image/Design-moderno.webp";
import imgDesign from "../assets/image/ux-ui.webp";
import imgPerformance from "../assets/image/performace.webp";

export type AboutSegment =
  | { type: "text"; content: string }
  | { type: "highlight"; content: string; imageId: string };

export interface AboutHighlightImage {
  id: string;
  image: string;
}

export interface AboutData {
  eyebrow: string;
  defaultImage: string;
  images: AboutHighlightImage[];
  segments: AboutSegment[];
}

export const aboutData: AboutData = {
  eyebrow: "Sobre mim",
  defaultImage: imgDefault,
  images: [
    { id: "code", image: imgCode },
    { id: "design", image: imgDesign },
    { id: "performance", image: imgPerformance },
  ],
  segments: [
    {
      type: "text",
      content: "Sou desenvolvedor front-end e trabalho com foco total em ",
    },
    { type: "highlight", content: "código limpo", imageId: "code" },
    {
      type: "text",
      content:
        " — arquitetura pensada pra durar, não só pra funcionar hoje. Gosto de construir interfaces com ",
    },
    { type: "highlight", content: "design moderno", imageId: "design" },
    {
      type: "text",
      content:
        ", onde cada detalhe de tipografia e espaçamento é intencional. E nada disso importa se o site não carrega rápido: ",
    },
    { type: "highlight", content: "performance", imageId: "performance" },
    { type: "text", content: " faz parte do produto, não é um extra." },
  ],
};
