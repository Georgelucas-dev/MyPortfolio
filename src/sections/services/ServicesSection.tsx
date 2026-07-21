import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ServicesSectionDesktop } from "./ServicesSectionDesktop";
import { ServicesSectionMobile } from "./ServicesSectionMobile";

export function ServicesSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return isDesktop ? <ServicesSectionDesktop /> : <ServicesSectionMobile />;
}
