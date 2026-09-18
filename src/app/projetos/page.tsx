import type { Metadata } from "next";
import { ProjectCatalog } from "@/components/ProjectCatalog";
import { PageHeading } from "@/components/PageHeading";
import { CTA } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Explore cases demonstrativos de sites, sistemas, automações e dashboards. Pesquise por tecnologia ou categoria.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeading
        eyebrow="Portfólio / Ideias em prática"
        lines={[
          "Projetos que conectam",
          <span className="gradient-text" key="g">
            problemas e possibilidades.
          </span>,
        ]}
        description="Explore o desafio, a abordagem e as escolhas por trás de cada solução."
      />
      <section
        className="container catalog-section"
        aria-label="Catálogo de projetos"
      >
        <ProjectCatalog />
      </section>
      <CTA />
    </>
  );
}
