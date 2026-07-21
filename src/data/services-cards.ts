export interface ServiceCard {
  id: string;
  title: string;
  label: string;
  text1: string;
  text2: string;
  actionText: string;
  bgClass: string;
  textClass: string;
}

export const servicesCards: ServiceCard[] = [
  {
    id: "01",
    title: "Brand Strategy &\nPosicionamento",
    label: "Estratégia",
    text1:
      "Construção de marca forte e posicionamento estratégico no mercado digital.",
    text2:
      "Identificamos o valor único do seu negócio para criar uma conexão real e duradoura com seu público.",
    actionText: "Saber mais",
    bgClass: "bg-[#D8C5FF]", // Lilás Pastel
    textClass: "text-[#121212]",
  },
  {
    id: "02",
    title: "Identidade Visual\n& Design System",
    label: "Visual Identity",
    text1: "Linguagem visual única que gera impacto imediato e autoridade.",
    text2:
      "Criação de logotipos, tipografia, paleta de cores e diretrizes visuais prontas para escala.",
    actionText: "Ver portfólio",
    bgClass: "bg-[#FFFFFF]", // Branco Puro
    textClass: "text-[#121212]",
  },
  {
    id: "03",
    title: "Desenvolvimento Web\n& Landing Pages",
    label: "Full Stack",
    text1: "Sites ultra-rápidos, otimizados para conversão e 100% sob medida.",
    text2:
      "Desenvolvidos com React, Next.js e Tailwind para garantir performance e máxima nota no Google.",
    actionText: "Iniciar projeto",
    bgClass: "bg-[#FBE870]", // Amarelo Vibrante
    textClass: "text-[#121212]",
  },
  {
    id: "04",
    title: "Sistemas Customizados\n& Automações",
    label: "Software",
    text1: "Dashboards, plataformas de agendamento e automação de processos.",
    text2:
      "Código limpo, seguro e preparado para crescer junto com a demanda da sua empresa.",
    actionText: "Solicitar orçamento",
    bgClass: "bg-[#1C4D46]", // Verde Teal Escuro
    textClass: "text-[#F5F5F5]",
  },
];
