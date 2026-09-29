import type { Metadata } from "next";
import { Services, Process } from "@/components/Sections";
import { SocialShowcase } from "@/components/SocialShowcase";
import { PageHeading } from "@/components/PageHeading";
import { CTA } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Desenvolvimento web, social media, automação, sistemas personalizados, dados, APIs e soluções com inteligência artificial.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeading
        eyebrow="Serviços / Tecnologia com propósito"
        lines={[
          "O que seu negócio precisa.",
          <span className="gradient-text" key="g">
            O que podemos construir.
          </span>,
        ]}
        description="Da presença digital às redes sociais e à organização de processos, desenhamos a solução a partir do seu contexto."
      />
      <Services expanded />
      <SocialShowcase />
      <Process />
      <CTA />
    </>
  );
}
