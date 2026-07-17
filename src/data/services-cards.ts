export interface ServiceCard {
  id: string;
  title: string;
  label: string;
  text1: string;
  text2: string;
  actionText: string;
  bgColor: string;
  textColor: string;
  numberColor: string;
  borderColor: string;
}

export const servicesCards: ServiceCard[] = [
  {
    id: "01",
    title: "Sites Institucionais &\nLanding Pages",
    label: "Para Profissionais",
    text1:
      "Crio sites modernos, rápidos e profissionais para psicólogos, advogados, nutricionistas, coaches e outros profissionais liberais.",
    text2:
      "Design atraente, otimizado para celular, formulário de contato e integração com WhatsApp. Tudo pensado para transmitir credibilidade e gerar mais clientes.",
    actionText: "Quero um site",
    bgColor: "bg-white",
    textColor: "text-black",
    numberColor: "text-black/30",
    borderColor: "border-black/15",
  },
  {
    id: "02",
    title: "Desenvolvimento Web\nCustomizado",
    label: "Full Stack",
    text1:
      "Desenvolvo sistemas e aplicações web completas usando React, TypeScript, Node.js e Tailwind.",
    text2:
      "Seja um dashboard, plataforma de agendamento, e-commerce simples ou automação, entrego código limpo, performático e fácil de manter.",
    actionText: "Falar sobre meu projeto",
    bgColor: "bg-[#1a1a1a]",
    textColor: "text-white",
    numberColor: "text-white/40",
    borderColor: "border-white/20",
  },
  {
    id: "03",
    title: "Sites para Pequenos\nNegócios",
    label: "Comércio & Serviços",
    text1:
      "Crio sites para clínicas, lojas, restaurantes, academias e prestadores de serviço que querem aparecer bem na internet.",
    text2:
      "Foco em conversão: agendamento online, WhatsApp, SEO básico e design que passa confiança para o cliente final.",
    actionText: "Quero meu site",
    bgColor: "bg-white",
    textColor: "text-black",
    numberColor: "text-black/30",
    borderColor: "border-black/15",
  },
  {
    id: "04",
    title: "Manutenção &\nEvolução de Sites",
    label: "Suporte Contínuo",
    text1:
      "Faço atualizações, correções, melhorias de performance e adição de novas funcionalidades em sites já existentes.",
    text2:
      "Também posso modernizar visualmente sites antigos, tornando-os mais rápidos e atrativos.",
    actionText: "Preciso de manutenção",
    bgColor: "bg-[#f5f5f5]",
    textColor: "text-black",
    numberColor: "text-black/30",
    borderColor: "border-black/15",
  },
];
