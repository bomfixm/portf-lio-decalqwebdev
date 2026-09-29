import { Hero } from "@/components/Hero";
import { TextButton } from "@/components/Button";
import { Ticker } from "@/components/Ticker";
import { CTA } from "@/components/Footer";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { SocialShowcase } from "@/components/SocialShowcase";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import {
  SectionTitle,
  Services,
  Technologies,
  Process,
} from "@/components/Sections";
import { projects } from "@/data/projects";
import { content } from "@/data/content";
import { LineReveal, Reveal } from "@/components/Motion";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <Hero />
      <Ticker />
      <section className="intro container" data-tone="calm">
        <Reveal variant="fade">
          <div className="eyebrow">{content.intro.eyebrow}</div>
        </Reveal>
        <LineReveal
          as="h2"
          delay={0.1}
          lines={[
            content.intro.title,
            <span className="muted" key="s">
              {content.intro.subtitle}
            </span>,
          ]}
        />
        <Reveal variant="left" delay={0.3}>
          <p>{content.intro.description}</p>
        </Reveal>
        <div className="intro-line" aria-hidden="true" />
      </section>
      <section
        className="section no-line container"
        id="projetos"
        data-tone="projects"
      >
        <SectionTitle
          number="02"
          label="Ideias em prática"
          title={
            <>
              Projetos <span className="gradient-text">selecionados.</span>
            </>
          }
          description="Diferentes desafios. A mesma atenção aos detalhes."
        >
          <TextButton href="/projetos">Explorar todos os projetos</TextButton>
        </SectionTitle>
        <FeaturedProjects projects={featured.slice(0, 2)} />
      </section>
      {featured.length > 2 && (
        <HorizontalGallery
          projects={featured.slice(2)}
          eyebrow={`03 — ${String(featured.length).padStart(2, "0")}`}
          title={
            <>
              Outros cases <span className="gradient-text">em movimento.</span>
            </>
          }
          description="Sistemas, automações e interfaces que resolvem problemas concretos."
        />
      )}
      {featured.some((p) => p.demo) && (
        <div className="container">
          <Reveal variant="fade">
            <p className="example-note">
              Portfólio demonstrativo: os cases e as interfaces são exemplos
              para apresentar possibilidades de desenvolvimento.
            </p>
          </Reveal>
        </div>
      )}
      <Services />
      <SocialShowcase />
      <Technologies />
      <Process />
      <CTA />
    </>
  );
}
